#!/usr/bin/env Rscript
#
# Build the ggsql Prism grammar file from the TextMate grammar source.
#
# Usage:
#   Rscript tools/build_ggsql_grammar.R
#
# This fetches the ggsql TextMate grammar from posit-dev/ggsql on GitHub,
# extracts token patterns, and generates a Prism-compatible grammar file
# that extends the built-in SQL grammar.
#
# The output is written to:
#   inst/lib/prism-code-editor/prism/languages/ggsql.js

TMGRAMMAR_URL <- "https://raw.githubusercontent.com/posit-dev/ggsql/main/ggsql-vscode/syntaxes/ggsql.tmLanguage.json"

# Paths relative to the bslib package root
LANGUAGES_DIR <- "inst/lib/prism-code-editor/prism/languages"
SQL_JS <- file.path(LANGUAGES_DIR, "sql.js")
OUTPUT_JS <- file.path(LANGUAGES_DIR, "ggsql.js")

# ---- Helpers ----

# Extract word alternatives from a TextMate match pattern like
# "\\b(word1|word2|word3)\\b" or "\\b(?i:word1|word2)\\b"
extract_words <- function(match_pattern) {
  # Try non-capture group with flags first: \b(?i:word1|word2)\b
  m <- regmatches(match_pattern, regexec("\\\\b\\(\\?[a-z]*:([^)]+)\\)\\\\b", match_pattern))[[1]]
  if (length(m) == 2) return(strsplit(m[2], "\\|")[[1]])

  # Try capture group: \b(word1|word2)\b
  m <- regmatches(match_pattern, regexec("\\\\b\\(([^)]+)\\)\\\\b", match_pattern))[[1]]
  if (length(m) == 2) return(strsplit(m[2], "\\|")[[1]])

  NULL
}

# Extract word alternatives from a function pattern like
# "(?i)\\b(func1|func2)\\b\\s*\\("
extract_function_words <- function(match_pattern) {
  m <- regmatches(match_pattern, regexec("\\\\b\\(([^)]+)\\)\\\\b\\\\s\\*\\\\\\(", match_pattern))[[1]]
  if (length(m) == 2) return(strsplit(m[2], "\\|")[[1]])
  NULL
}

# Format a word list as a JS regex alternation: /\b(?:word1|word2)\b/flags
format_word_regex <- function(words, flags = "") {
  alts <- paste(words, collapse = "|")
  sprintf("/\\b(?:%s)\\b/%s", alts, flags)
}

# Format function words with lookahead: /\b(?:func1|func2)(?=\s*\()/flags
format_function_regex <- function(words, flags = "i") {
  alts <- paste(words, collapse = "|")
  sprintf("/\\b(?:%s)(?=\\s*\\()/%s", alts, flags)
}

# Extract the content-hashed import path from sql.js
extract_import_path <- function(sql_js_path) {
  lines <- readLines(sql_js_path, n = 1)
  m <- regmatches(lines, regexec('"([^"]+index-[^"]+\\.js)"', lines))[[1]]
  if (length(m) < 2) stop("Could not extract import path from ", sql_js_path)
  m[2]
}

# ---- Main ----

main <- function() {
  if (!file.exists(SQL_JS)) {
    stop("sql.js not found at ", SQL_JS, ". Run from the bslib package root.")
  }

  message("Fetching TextMate grammar from: ", TMGRAMMAR_URL)
  grammar <- jsonlite::fromJSON(TMGRAMMAR_URL, simplifyDataFrame = FALSE)
  repo <- grammar$repository

  import_path <- extract_import_path(SQL_JS)
  message("Using import path: ", import_path)

  # -- Extract ggsql clause keywords --
  # These come from the begin captures of clause patterns + FILTER from common-clause-patterns
  clause_keywords <- c(
    "VISUALISE", "VISUALIZE",  # visualise-clause
    "DRAW",                     # draw-clause
    "SCALE",                    # scale-clause
    "FACET",                    # facet-clause
    "PROJECT",                  # project-clause
    "LABEL",                    # label-clause
    "THEME"                     # theme-clause
  )
  # From common-clause-patterns keyword.other matches
  common_kw_patterns <- repo[["common-clause-patterns"]]$patterns
  for (p in common_kw_patterns) {
    if (identical(p$name, "keyword.other.ggsql")) {
      words <- extract_words(p$match)
      if (!is.null(words)) clause_keywords <- c(clause_keywords, words)
    }
  }
  # Also from scale-clause keyword.other
  for (p in repo[["scale-clause"]]$patterns) {
    if (identical(p$name, "keyword.other.ggsql")) {
      words <- extract_words(p$match)
      if (!is.null(words)) clause_keywords <- c(clause_keywords, words)
    }
  }
  clause_keywords <- unique(clause_keywords)

  # -- Extract geom types --
  geoms <- NULL
  for (p in repo[["draw-clause"]]$patterns) {
    if (identical(p$name, "support.type.geom.ggsql")) {
      geoms <- extract_words(p$match)
    }
  }

  # -- Extract scale type modifiers --
  scale_types <- NULL
  for (p in repo[["scale-clause"]]$patterns) {
    if (identical(p$name, "keyword.control.scale-modifier.ggsql")) {
      scale_types <- extract_words(p$match)
    }
  }

  # -- Extract aesthetic names --
  aesthetics <- NULL
  for (p in repo[["aesthetics"]]$patterns) {
    if (identical(p$name, "support.type.aesthetic.ggsql")) {
      aesthetics <- extract_words(p$match)
    }
  }

  # -- Extract theme names --
  themes <- NULL
  for (p in repo[["theme-clause"]]$patterns) {
    if (identical(p$name, "support.type.theme.ggsql")) {
      themes <- extract_words(p$match)
    }
  }

  # -- Extract project types --
  projects <- NULL
  for (p in repo[["project-clause"]]$patterns) {
    if (identical(p$name, "support.type.project.ggsql")) {
      projects <- extract_words(p$match)
    }
  }

  # -- Extract SQL function names --
  all_functions <- character(0)
  for (p in repo[["sql-functions"]]$patterns) {
    words <- extract_function_words(p$match)
    if (!is.null(words)) all_functions <- c(all_functions, words)
  }
  all_functions <- unique(all_functions)

  # -- Generate the JS file --
  js <- c(
    "// ggsql.js — ggsql language for prism-code-editor",
    "//",
    "// AUTO-GENERATED by tools/build_ggsql_grammar.R from the TextMate grammar at:",
    "// https://github.com/posit-dev/ggsql/blob/main/ggsql-vscode/syntaxes/ggsql.tmLanguage.json",
    "// Do not edit by hand.",
    "//",
    "// NOTE: The import path below is a content-hashed internal module of",
    "// prism-code-editor. If bslib updates prism-code-editor, this hash may change.",
    "// Re-run this script to regenerate.",
    "",
    'import "./sql.js";',
    sprintf('import { l as languages } from "%s";', import_path),
    "",
    "var sql = languages.sql;",
    "var ggsql = {};",
    "",
    "// Copy SQL tokens",
    'Object.keys(sql).forEach(function(k) { ggsql[k] = sql[k]; });',
    "",
    "// ggsql clause keywords",
    sprintf('ggsql["ggsql-keyword"] = {'),
    sprintf("  pattern: %s,", format_word_regex(clause_keywords, "i")),
    '  alias: "keyword",',
    "};",
    "",
    "// Geom types",
    sprintf('ggsql["ggsql-geom"] = {'),
    sprintf("  pattern: %s,", format_word_regex(geoms)),
    '  alias: "builtin",',
    "};",
    "",
    "// Scale type modifiers",
    sprintf('ggsql["ggsql-scale-type"] = {'),
    sprintf("  pattern: %s,", format_word_regex(scale_types, "i")),
    '  alias: "builtin",',
    "};",
    "",
    "// Aesthetic names",
    sprintf('ggsql["ggsql-aesthetic"] = {'),
    sprintf("  pattern: %s,", format_word_regex(aesthetics)),
    '  alias: "attr-name",',
    "};",
    "",
    "// Theme names",
    sprintf('ggsql["ggsql-theme"] = {'),
    sprintf("  pattern: %s,", format_word_regex(themes)),
    '  alias: "class-name",',
    "};",
    "",
    "// Project types",
    sprintf('ggsql["ggsql-project"] = {'),
    sprintf("  pattern: %s,", format_word_regex(projects)),
    '  alias: "class-name",',
    "};",
    "",
    "// Fat arrow operator",
    'ggsql["ggsql-arrow"] = {',
    "  pattern: /=>/,",
    '  alias: "operator",',
    "};",
    "",
    "// SQL functions (aggregate, window, datetime, string, math, conversion, conditional, JSON, list)",
    sprintf('ggsql["function"] = %s;', format_function_regex(all_functions)),
    "",
    "// Reorder: ggsql tokens before generic SQL keyword/boolean",
    "var ordered = {};",
    '["comment", "variable", "string", "identifier"].forEach(function(k) {',
    "  if (k in ggsql) ordered[k] = ggsql[k];",
    "});",
    '["ggsql-keyword", "ggsql-geom", "ggsql-scale-type", "ggsql-aesthetic",',
    ' "ggsql-theme", "ggsql-project", "ggsql-arrow"].forEach(function(k) {',
    "  if (k in ggsql) ordered[k] = ggsql[k];",
    "});",
    "Object.keys(ggsql).forEach(function(k) {",
    "  if (!(k in ordered)) ordered[k] = ggsql[k];",
    "});",
    "",
    "languages.ggsql = ordered;",
    ""
  )

  writeLines(js, OUTPUT_JS)
  message("Generated: ", OUTPUT_JS)
}

main()
