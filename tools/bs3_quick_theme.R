# This script generates code for replacing hardcoded colors for Bootstrap 3.
# Unlike Bootstrap 4, the Bootstrap 3 _variables.scss has a lot of repeated
# color literals. We want to replace all of the ones that are monochrome with
# dynamically calculated replacements.

# Load bootstrap-sass (bs3) _variables.scss
lines <- readLines(system.file(package = "bootstraplib",
  "node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables.scss"))
# Retain lines that seem like they contain a hex color.
# (Note that colors specified by keyword would break this logic, but, AFAICT,
# there aren't any such colors in _variables.scss.)
lines <- lines[grepl("#[0-9a-f-A-F]", lines, perl = TRUE)]

# Parse each line into variable name and hex color
df <- data.frame(stringsAsFactors = FALSE,
  name = sub("^\\$(.+?):.*", "\\1", lines, perl = TRUE),
  color = sub(".*(#[0-9A-Za-z]+).*", "\\1", lines, perl = TRUE)
)
# Sort by color value
df <- df[order(df$color),]

# All of the color values that we want to replace, are assigned a variable name.
# Any variables in _variables.scss that point to one of these color values, will
# now point to the variable name by default. For example, since _variables.scss
# contains this:
#
#   $navbar-inverse-bg: #222 !default;
#
# Our goal is to generate the rule:
#
#   $navbar-inverse-bg: $gray-darker !default;
#
# So that all such variables (i.e. ones whose default value is #222) can be
# changed just by modifying $gray-darker.
named_colors <- c(
  # These variables already exist in _variables.scss
  "gray-base" = "#000",
  "gray-darker" = "#222",
  "gray-dark" = "#333",
  "gray" = "#555",
  "gray-light" = "#777",
  "gray-lighter" = "#eee",

  # These are variables we're introducing
  "gray-44" = "#444",
  "gray-88" = "#888",
  "gray-99" = "#999",
  "gray-cc" = "#ccc",
  "gray-dd" = "#ddd",
  "gray-e5" = "#e5e5e5",
  "gray-f5" = "#f5f5f5",
  "gray-f8" = "#f8f8f8",
  "gray-f9" = "#f9f9f9",
  "white" = "#fff"
)

# Color variables in _variables.scss that we don't have names for.
# Consider this a potential TODO list of colors we could dynamically set.
df[!df$color %in% named_colors,]

# Generate the code for color_mapping in bs3_quick_theme
library(dplyr)
df %>%
  mutate(varname = names(named_colors[match(color, named_colors)])) %>%
  filter(!is.na(varname)) %>%
  filter(name != varname) %>%
  mutate(varname = paste0("$", varname)) %>%
  select(name, varname) %>%
  { setNames(.$varname, .$name) } %>%
  as.list() %>%
  dput()

