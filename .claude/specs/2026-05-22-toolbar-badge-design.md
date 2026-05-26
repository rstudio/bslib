# Design: `toolbar_badge()` (issue #1316)

**Date:** 2026-05-22  
**Status:** Approved

## Overview

Add `toolbar_badge()` and `update_toolbar_badge()` to the bslib toolbar family. Badges are pure display elements for showing status text (and optionally an icon) inside a `toolbar()`. They are server-updatable but do not register as Shiny inputs.

## Function Signatures

```r
toolbar_badge(
  label,
  ...,
  id = NULL,
  icon = NULL,
  show_label = is.null(icon),
  tooltip = !show_label,
  color = "secondary",
  pill = FALSE
)

update_toolbar_badge(
  id,
  label = NULL,
  icon = NULL,
  show_label = NULL,
  color = NULL,
  pill = NULL,
  session = get_current_session()
)
```

### Parameter notes

- `label` — required; display text or tag object. Always present in the DOM for accessibility, hidden visually when `show_label = FALSE`.
- `id` — optional; required only if `update_toolbar_badge()` will be called.
- `icon` — optional decorative icon, wrapped in `aria-hidden` span.
- `show_label` — defaults to `is.null(icon)`: label shown for text-only badges, hidden for icon badges.
- `tooltip` — defaults to `!show_label`. Accepts `TRUE` (use label text), `FALSE` (none), a character string, or a tag object. When an `id` is provided, the tooltip gets `id = "{id}_tooltip"` for `update_tooltip()` compatibility. `update_toolbar_badge()` does not include a `tooltip` argument — tooltip content is updated separately via `update_tooltip()`, consistent with the rest of the toolbar family.
- `color` — Bootstrap contextual color string: `"primary"`, `"secondary"`, `"success"`, `"danger"`, `"warning"`, `"info"`, `"light"`, `"dark"`. Defaults to `"secondary"`.
- `pill` — `TRUE` adds `rounded-pill` for fully-rounded ends.
- `...` — additional HTML attributes passed to the outer `<span>`.

## HTML Structure

```html
<!-- icon-only badge (show_label = FALSE) -->
<span
  id="my_badge"
  class="bslib-toolbar-badge badge text-bg-secondary"
  aria-labelledby="badge-label-XXXX"
>
  <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">[icon]</span>
  <span id="badge-label-XXXX" class="bslib-toolbar-label" hidden>[label]</span>
</span>

<!-- label + icon (show_label = TRUE) -->
<span
  id="my_badge"
  class="bslib-toolbar-badge badge text-bg-secondary"
  aria-labelledby="badge-label-XXXX"
>
  <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">[icon]</span>
  <span id="badge-label-XXXX" class="bslib-toolbar-label">[label]</span>
</span>

<!-- pill variant -->
<span class="bslib-toolbar-badge badge text-bg-success rounded-pill" ...>...</span>
```

- Uses Bootstrap 5's `text-bg-{color}` utility (sets background and foreground for contrast).
- Label span always has a randomly generated ID (`badge-label-XXXX` via `p_randomInt()`); outer span uses `aria-labelledby` pointing to it — matching the `toolbar_input_button` pattern. This avoids screen readers picking up icon `aria-label` text from within an `aria-hidden` element.
- When `show_label = FALSE`, the label span has the `hidden` HTML attribute (not `visually-hidden`); `aria-labelledby` still resolves it for screen readers.
- When `tooltip` is non-`FALSE`, the `<span>` is wrapped in `bslib::tooltip(placement = "bottom")`.
- No `data-shiny-no-bind-input` needed — the element is never wired as a Shiny input.

## Update Mechanism

`update_toolbar_badge()` uses `sendCustomMessage()` (same as `toast`):

```r
session$sendCustomMessage("bslib.update-toolbar-badge", dropNulls(list(
  id        = id,
  label     = processDeps(label, session),
  icon      = processDeps(validateIcon(icon), session),
  showLabel = show_label,
  color     = color,
  pill      = pill
)))
```

The JS handler (`srcts/src/components/toolbarBadge.ts`) registers a custom message handler:

```ts
Shiny.addCustomMessageHandler("bslib.update-toolbar-badge", (message) => {
  const el = document.getElementById(message.id);
  if (!el) return;
  if (message.label)                   // update .bslib-toolbar-label innerHTML
  if (message.icon)                    // update .bslib-toolbar-icon innerHTML
  if (message.showLabel !== undefined) // toggle visually-hidden on label span
  if (message.color)                   // swap text-bg-* class
  if (message.pill !== undefined)      // toggle rounded-pill class
});
```

Only fields present in the message are updated; `NULL` values are dropped by `dropNulls()` before sending.

## SCSS

A minimal rule added to `inst/components/scss/toolbar.scss`:

```scss
.bslib-toolbar-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25em; // em so it scales with badge font size

  .bslib-toolbar-icon {
    display: inline-flex;
    align-items: center;
  }
}
```

Bootstrap's `.badge` and `text-bg-{color}` handle all other styling. Existing `.bslib-toolbar > *` rules (`align-self: center`, `margin-bottom: 0`, `font-size: 0.9rem`) apply automatically.

## Files to Create / Modify

| File | Change |
|------|--------|
| `R/toolbar.R` | Add `toolbar_badge()` and `update_toolbar_badge()` |
| `srcts/src/components/toolbarBadge.ts` | New file: custom message handler |
| `inst/components/scss/toolbar.scss` | Add `.bslib-toolbar-badge` rule |
| `tests/testthat/test-toolbar.R` | Add tests (see below) |
| `inst/examples-shiny/toolbar/app.R` | Add badge to example app |
| `NAMESPACE` | Export `toolbar_badge`, `update_toolbar_badge` |
| `NEWS.md` | Add entry under current dev version |

## Testing Plan

### Snapshot tests (HTML structure)

- Default: `toolbar_badge("Active")` — label shown, `text-bg-secondary`, no pill
- Icon-only: icon provided, `show_label = FALSE` — label visually hidden, tooltip present
- Icon + label: both shown
- Pill variant: `pill = TRUE` adds `rounded-pill`
- Spot-check color variants (e.g., `"success"`, `"danger"`)
- Badge nested inside `toolbar()`

### Unit tests (attribute/class assertions)

- `color` maps to `text-bg-{color}` class
- `pill = TRUE` adds `rounded-pill`
- `show_label = FALSE` adds `visually-hidden` to label span
- `tooltip = TRUE` wraps in tooltip with `id = "{id}_tooltip"` when `id` is provided
- `tooltip = FALSE` skips the wrapper
- Custom tooltip string/tag passes through correctly

### `update_toolbar_badge()` tests (mock session)

```r
session <- list(
  sendCustomMessage = function(type, message) {
    session$last_type    <<- type
    session$last_message <<- message
  }
)
```

- Message type is always `"bslib.update-toolbar-badge"`
- `label`, `color`, `pill`, `show_label`, `icon` appear in message when provided
- `NULL` fields are dropped (not sent) via `dropNulls()`
- Invalid `color` value errors
- Blank/whitespace `label` warns (same guard as `update_toolbar_input_button`)
- Updating one field (e.g., only `color`) does not include other fields in the message
