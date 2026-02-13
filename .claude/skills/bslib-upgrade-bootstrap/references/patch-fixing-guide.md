# Patch Fixing Guide

When `yarn_install.R` fails because patches don't apply against a new upstream
version, use this systematic approach to identify and fix all failing patches.

## Overview

The key insight: `yarn_install.R` stops at the **first** failure, but multiple
patches may be broken. Fix them all before re-running.

## Step 1: Prepare a clean upstream snapshot

Run the build pipeline up to (but not including) patch application, then save
the clean state. This gives you unpatched upstream files to work against.

```bash
# After yarn_install.R fails, save the current inst/lib state
# (which has vendor prefixes applied but no patches yet)
mkdir -p /tmp/bslib-clean-upstream
cp -R inst/lib/bs5 /tmp/bslib-clean-upstream/bs5
cp -R inst/lib/bsw5 /tmp/bslib-clean-upstream/bsw5
```

If `yarn_install.R` already partially applied patches before failing, you need
to re-download clean upstream first. Run just the yarn install + vendor prefix
steps manually, or delete `inst/lib/` and re-run `yarn_install.R` (it will
fail again at the same patch, but the files before that patch are clean).

## Step 2: Identify all failing patches

Test every patch sequentially against the clean upstream, applying each one
so later patches see the cumulative state:

```bash
# From the repo root, with clean upstream in inst/lib/
for patch in tools/patches/*.patch; do
  if git apply --check "$patch" 2>/dev/null; then
    git apply --whitespace=fix "$patch"
    echo "OK: $(basename $patch)"
  else
    echo "FAIL: $(basename $patch)"
  fi
done
```

Collect the full list of failures before fixing anything.

## Step 3: Fix each failing patch

For each failing patch, the process is:

1. **Read the old patch** to understand what changes it intends to make
2. **Read the clean upstream file** (from `/tmp/bslib-clean-upstream/`)
3. **Read the current working file** (which may have earlier patches applied)
4. **Apply the intended changes manually** to the working file
5. **Generate a new diff** between clean upstream (with prior patches) and
   the manually patched version
6. **Write the updated patch file**
7. **Verify** with `git apply --check`

### Understanding bslib's patch patterns

Many bslib Bootswatch patches follow these patterns:

- **`body-mix()` function**: Replaces hardcoded `$gray-NNN` references with
  `body-mix(weight%)` calls that derive grays from `$body-bg` and
  `$body-color`, enabling dynamic theming

- **`$contrast-bg` / `$contrast-fg`**: Variables derived from
  `color-contrast()` that replace hardcoded `$white` / `$black`, adapting
  to light/dark mode

- **Semantic color variables**: Moving `$body-bg`, `$body-color`, `$secondary`,
  `$light`, `$dark` definitions before other variables so they can be
  referenced throughout

When upstream changes a value (e.g., `$table-color: $white` becomes
`$table-color: initial`), the patch's old-context no longer matches. Update
the old-context to match the new upstream, and ensure the new-context still
applies the intended bslib transformation.

### File path considerations

Patches reference files by their post-downsizing paths. The `yarn_install.R`
script restructures vendor libraries before applying patches:

- `bs-colorpicker/dist/js/` becomes `bs-colorpicker/js/`
- `bs-colorpicker/dist/css/` becomes `bs-colorpicker/css/`

Patches must use the **post-downsizing** paths (e.g., `js/` not `dist/js/`).

### Multiple patches touching the same file

Several patches modify `_variables.scss` in sequence. When regenerating these
patches, each must be diffed against the state **after all preceding patches
have been applied**, not against the clean upstream.

Order matters. The alphabetical filename order determines application sequence:
`009-*` before `011-*` before `016-*` before `021-*` before `023-*` before
`025-*`.

## Step 4: Parallel patch fixing with subagents

When many patches fail, fix them in parallel using subagents. Group patches
that are independent (touch different files) into separate agents. Patches
that touch the same files must be handled sequentially or by the same agent.

Typical groupings:
- Each `006-bootswatch-{theme}-bs5.patch` is independent (different theme dirs)
- Core BS5 patches (`009`, `011`, `016`, `021`, `023`, `025`) share
  `_variables.scss` and must be handled together in sequence
- Cross-cutting patches (`028`, `031`, `032`, `033`, `034`) can often be
  handled independently

For each agent, provide:
1. The failing patch file path
2. The clean upstream file(s) from `/tmp/bslib-clean-upstream/`
3. The current working copy of the target file(s)
4. Instructions to read the old patch, apply intended changes to the new
   upstream, generate a corrected diff, and verify with `git apply --check`

## Step 5: Full verification

After all patches are fixed, run `yarn_install.R` from scratch:

```bash
Rscript tools/yarn_install.R
```

This re-downloads fresh upstream, re-applies vendor prefixes, and applies all
patches in sequence. Every patch must apply cleanly. If any still fail, repeat
Steps 3-4 for the remaining failures.

## Troubleshooting

### Patch applies with `--check` but fails in yarn_install.R

The script uses `git apply --reject --whitespace=fix`. Check that:
- The working tree is clean (no leftover modifications from previous attempts)
- Earlier patches in the sequence haven't changed

### Hunk offsets but still applies

Lines like `Hunk #1 succeeded at 126 (offset 4 lines)` are fine — git found
the context at a slightly different line number. The patch still applied
correctly. Only `.rej` files or non-zero exit codes indicate real failures.

### Vendor prefix validation fails

If `yarn_install.R` fails with "Unknown vendor prefixes introduced by
Bootstrap's autoprefixer", the new Bootstrap version uses CSS properties that
need prefixing. Either:
- Add `add_property_prefixes()` calls in `yarn_install.R` for the new
  properties
- Add the property names to the `whitelist` vector if prefixes aren't needed
  for modern browsers
