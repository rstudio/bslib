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
  m <- regmatches(
    match_pattern,
    regexec("\\\\b\\(\\?[a-z]*:([^)]+)\\)\\\\b", match_pattern)
  )[[1]]
  if (length(m) == 2) {
    return(strsplit(m[2], "\\|")[[1]])
  }

  # Try capture group: \b(word1|word2)\b
  m <- regmatches(
    match_pattern,
    regexec("\\\\b\\(([^)]+)\\)\\\\b", match_pattern)
  )[[1]]
  if (length(m) == 2) {
    return(strsplit(m[2], "\\|")[[1]])
  }

  NULL
}

# Extract word alternatives from a function pattern like
# "(?i)\\b(func1|func2)\\b\\s*\\("
extract_function_words <- function(match_pattern) {
  m <- regmatches(
    match_pattern,
    regexec("\\\\b\\(([^)]+)\\)\\\\b\\\\s\\*\\\\\\(", match_pattern)
  )[[1]]
  if (length(m) == 2) {
    return(strsplit(m[2], "\\|")[[1]])
  }
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
  if (length(m) < 2) {
    stop("Could not extract import path from ", sql_js_path)
  }
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
  # Collect from: begin captures of clause patterns + keyword.other matches
  clause_keywords <- character(0)

  # Clause names come from the `begin` regex of each *-clause pattern
  clause_names <- grep("-clause$", names(repo), value = TRUE)
  for (clause_name in clause_names) {
    clause <- repo[[clause_name]]
    if (!is.null(clause$begin)) {
      words <- extract_words(clause$begin)
      if (!is.null(words)) clause_keywords <- c(clause_keywords, words)
    }
  }

  # Also collect keyword.other.ggsql from all clause patterns and common-clause-patterns
  keyword_sources <- c("common-clause-patterns", clause_names)
  for (src in keyword_sources) {
    for (p in repo[[src]]$patterns) {
      if (identical(p$name, "keyword.other.ggsql")) {
        words <- extract_words(p$match)
        if (!is.null(words)) clause_keywords <- c(clause_keywords, words)
      }
    }
  }
  clause_keywords <- unique(clause_keywords)

  # -- Extract token groups from named patterns --
  # Searches all patterns in repo_key(s) for token_name, accumulating words
  # across multiple matching patterns.
  extract_token_group <- function(repo_keys, token_name) {
    words <- character(0)
    for (repo_key in repo_keys) {
      if (is.null(repo[[repo_key]])) {
        stop(
          "Repository key '",
          repo_key,
          "' not found in TextMate grammar. ",
          "The upstream grammar structure may have changed."
        )
      }
      for (p in repo[[repo_key]]$patterns) {
        if (identical(p$name, token_name)) {
          w <- extract_words(p$match)
          if (!is.null(w)) words <- c(words, w)
        }
      }
    }
    if (length(words) == 0) {
      stop(
        "No words extracted for '",
        token_name,
        "' from ",
        paste(repo_keys, collapse = ", "),
        ". ",
        "The upstream grammar structure may have changed."
      )
    }
    unique(words)
  }

  geoms <- extract_token_group(
    c("draw-clause", "place-clause"),
    "support.type.geom.ggsql"
  )
  scale_types <- extract_token_group(
    "scale-clause",
    "keyword.control.scale-modifier.ggsql"
  )
  scale_values <- extract_token_group(
    "scale-clause",
    "constant.language.scale-type.ggsql"
  )
  aesthetics <- extract_token_group(
    "aesthetics",
    "support.type.aesthetic.ggsql"
  )
  properties <- extract_token_group(
    c("scale-clause", "facet-clause", "project-clause", "label-clause"),
    "support.type.property.ggsql"
  )
  projects <- extract_token_group(
    "project-clause",
    "support.type.project.ggsql"
  )

  # -- Extract SQL function names --
  all_functions <- character(0)
  for (p in repo[["sql-functions"]]$patterns) {
    words <- extract_function_words(p$match)
    if (!is.null(words)) all_functions <- c(all_functions, words)
  }
  all_functions <- unique(all_functions)

  if (length(clause_keywords) == 0) {
    stop(
      "No clause keywords extracted. The upstream grammar structure may have changed."
    )
  }
  if (length(all_functions) == 0) {
    stop(
      "No SQL functions extracted. The upstream grammar structure may have changed."
    )
  }

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
    sprintf(
      r"(// ggsql clause keywords
ggsql["ggsql-keyword"] = {
  pattern: %s,
  alias: "keyword",
};)",
      format_word_regex(clause_keywords, flags = "i")
    ),
    "",
    sprintf(
      r"(// Geom types
ggsql["ggsql-geom"] = {
  pattern: %s,
  alias: "builtin",
};)",
      format_word_regex(geoms)
    ),
    "",
    sprintf(
      r"(// Scale type modifiers
ggsql["ggsql-scale-type"] = {
  pattern: %s,
  alias: "builtin",
};)",
      format_word_regex(scale_types, flags = "i")
    ),
    "",
    sprintf(
      r"(// Scale type values
ggsql["ggsql-scale-value"] = {
  pattern: %s,
  alias: "string",
};)",
      format_word_regex(scale_values)
    ),
    "",
    sprintf(
      r"(// Aesthetic names
ggsql["ggsql-aesthetic"] = {
  pattern: %s,
  alias: "attr-name",
};)",
      format_word_regex(aesthetics)
    ),
    "",
    sprintf(
      r"(// Property names
ggsql["ggsql-property"] = {
  pattern: %s,
  alias: "property",
};)",
      format_word_regex(properties)
    ),
    "",
    sprintf(
      r"(// Project types
ggsql["ggsql-project"] = {
  pattern: %s,
  alias: "class-name",
};)",
      format_word_regex(projects)
    ),
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
    '["ggsql-keyword", "ggsql-geom", "ggsql-scale-type", "ggsql-scale-value",',
    ' "ggsql-aesthetic", "ggsql-property", "ggsql-project", "ggsql-arrow"].forEach(function(k) {',
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
