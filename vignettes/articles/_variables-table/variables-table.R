library(dplyr)
library(stringr)
library(purrr)
library(glue)
library(rprojroot)
library(htmltools)
library(bslib)

# HTML dependencies for the DT table styling
variables_html_deps <- function() {
  # Get just the portion of BS3 table CSS that we need (to avoid conflicts
  # with pkgdown and quillt)
  exclude <- c(
    '_normalize','_print', '_scaffolding', '_type', '_code',
    '_grid', '_forms', '_buttons', '_component-animations', '_dropdowns',
    '_button-groups', '_input-groups', '_navs', '_navbar', '_breadcrumbs',
    '_pagination', '_pager', '_labels', '_badges', '_jumbotron', '_thumbnails',
    '_alerts', '_progress-bars', '_media', '_list-group', '_panels',
    '_responsive-embed', '_wells', '_close', '_modals', '_tooltip', '_popovers',
    '_carousel', '_utilities', '_responsive-utilities'
  )
  bs_deps <- bs_theme_dependencies(bs_remove(bs_theme(version = 3), exclude))
  bs_dep <- Filter(bs_deps, f = function(x) { identical(x$name, "bootstrap") })[[1]]
  bs_dep$script <- NULL

  tagList(
    rmarkdown::html_dependency_font_awesome(),
    htmlDependency(
      name = "variables-table",
      version = packageVersion("bslib"),
      src = find_package_root_file("vignettes/articles/_variables-table"),
      stylesheet = "variables-table.css",
      script = "variables-table.js",
      head = format(tagList(
        tags$script(src="https://unpkg.com/@popperjs/core@2"),
        tags$script(src="https://unpkg.com/tippy.js@6")
      ))
    ),
    bs_dep
  )
}


variables_dt <- function(version) {
  DT::datatable(
    variables_df(version),
    escape = FALSE,
    style = "bootstrap4",
    class = "table-bordered",
    width = "80vw",
    rownames = FALSE,
    selection = "none",
    extensions = c("Select", "RowGroup", "Scroller"),
    callback = DT::JS("
      // Check for linked variable on first load
      go_to_current_hash(table);

      // If this is a pkgdown environment we need to use different styling for table expansion
      if(document.querySelector('.template-article')){
        document.querySelector('#table-wrapper').classList.add('pkgdown');
      }
      // Allows us to link within the page
      window.onhashchange = function() {
        go_to_current_hash(table);
      }"),
    options = list(
      deferRender = TRUE,
      scroller = TRUE,
      scrollY = 850,
      scrollX = TRUE,
      rowGroup = list(dataSrc = 0),
      drawCallback = DT::JS("
        function( settings ) {
          var table = this.DataTable();

          tippy('[data-tippy-content]', {placement: 'right'});

          // Hide section column from view
          table.column(0).visible(false);

          // This makes variable names themselves selectable for building urls etc
          this.find('tbody td:nth-child(1)').on('click', function(){
            find_and_select_variable(table, this.innerText, false);
          })

          // This makes the dependencies linked
          this.find('span.dep-link').on('click', function(){
            find_and_select_variable(table, this.innerText.replace('$', ''), true);
          });
        }")
    )
  )
}

variables_df <- function(version) {
  vars_file <- paste0("inst/lib/bs", version, "/scss/_variables.scss")
  sass_variables_loc <- find_package_root_file(vars_file)
  sass_variables_url <- file.path(
    "https://github.com/rstudio/bslib/blob",
    substr(system("git rev-parse HEAD", intern = TRUE), 1, 7),
    vars_file
  )
  # A section is denoted by a comment followed by either an empty line or an empty comment.
  # e.g.
  # // Section ID
  #
  # Or
  # // Section ID
  # //
  #
  # Sometimes the sections are just isolated floating comments
  #
  # // Section ID
  #
  #
  # TODO: BS3's comment templates are different so a whole new scraping pipeline is needed

  raw_text <- brio::readLines(sass_variables_loc)

  collapse_multiline_comments <- function(lines_df){

    repetitions <- rle(lines_df$is_comment & !lines_df$is_empty_comment)
    block_id <- rep(seq_along(repetitions$lengths), times = repetitions$lengths)
    is_comment_block <- rep(repetitions$values, times = repetitions$lengths)
    # A negative value means it's not a comment block. Using negatives so we
    # don't match ids of comment blocks
    lines_df$comment_block <- ifelse(is_comment_block, block_id, -seq_len(nrow(lines_df)))

    group_by(lines_df, comment_block) %>%
      summarise(
        across(c(-line), first),
        line = paste(line, collapse = " ")
      ) %>%
      arrange(line_number) %>%
      select(-comment_block)
  }

  link_to_pos_in_script <- function(line_num){
    paste0(sass_variables_url, "#L", line_num)
  }

  variables_df <- tibble(line = raw_text) %>%
    mutate(
      line_number = row_number(),
      is_comment = str_detect(line, "^\\/\\/"),
      is_empty_comment = str_detect(line, "^\\/\\/\\s*$")
    ) %>%
    collapse_multiline_comments() %>%
    mutate(
      below_is_empty_comment = lead(is_empty_comment),
      above_is_empty_line = lag(line) == "",
      below_is_empty_line = lead(line) == "",
      is_section = (is_comment & below_is_empty_comment) | (is_comment & above_is_empty_line & below_is_empty_line),
      variable = str_extract(line, "(?<=^\\$)(.+?)(?=:)"),
      section = ifelse(is_section, str_remove(line, "\\/\\/\\s*"), NA),
      section_link = ifelse(is_section, link_to_pos_in_script(line_number), NA),
      trailing_comment = str_extract(line, "(?<=;)(.+)$"),
      above_is_comment = lag(is_comment),
      comment = case_when(
        !is.na(trailing_comment) ~ trailing_comment,
        above_is_comment ~ lag(line),
        TRUE ~ ""
      ) %>% str_remove_all("\\/\\/") %>% str_trim(),
      comment = ifelse(str_detect(comment, "^\\s*stylelint-"), "", comment),
      comment = ifelse(str_detect(comment, "^\\s*scss-docs-"), "", comment),
      comment = ifelse(str_detect(comment, "^\\s*fusv-"), "", comment)
    ) %>%
    tidyr::fill(section, section_link) %>%
    filter(!is.na(variable)) %>%
    mutate(
      value = str_extract(line, "(?<=:)(.+)?(?=;)") %>% str_remove(fixed("!default")) %>% str_trim(),
      value_is_function = str_detect(value, fixed("()")) | str_detect(value, "\\($"),
      # map-get function is used to reference a map built earlier so make sure not
      # to link to it because there is no entry in the table to link to.
      value = str_replace_all(
        value,
        "(?<!map-get\\()(\\$[\\w|-]+)",
        "<span class='dep-link'>\\1</span>"
      ),
      section = glue("Section: {section} <a href=\"{section_link}\"><i class=\"fas fa-external-link-alt\"></i></a>"),
      declaration = glue("<a href=\"{link_to_pos_in_script(line_number)}\"><i class=\"fas fa-external-link-alt\"></i></a>"),
      css_value = bs_get_variables(bs_theme(), variable),
      value = ifelse(
        grepl("url\\(", css_value), htmltools::htmlEscape(css_value),
        glue("<span data-tippy-content='CSS-value: {css_value}'> {value} </span>")
      )
    ) %>%
    filter(!value_is_function) %>%
    select(
      section,
      variable,
      value,
      comment,
      declaration
    ) %>%
    rename(
      Variable = variable,
      Value = value,
      Comment = comment,
      `Find in source` = declaration
    )
}

