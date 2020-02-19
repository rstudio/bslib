#' Preview the currently set theme
#'
#' Launches an example shiny app via `run_with_themer()` and `bootstrap()`.
#' Useful for getting a quick preview of the current theme setting as
#' well as an interactive GUI for tweaking some of the main theme settings.
#'
#' The app that this launches is subject to change.
#'
#' @export
#' @param ... passed along to [shiny::runApp()]
#' @param with_themer whether or not to run the app with [run_with_themer()].
#' @seealso [run_with_themer()]
#' @examples
#'
#' bs_theme_new()
#' bs_theme_add_variables(
#'   "body-bg" = "#6c757d",
#'   "body-color" = "white"
#' )
#' if (interactive()) {
#'   bs_theme_preview()
#' }
#'
bs_theme_preview <- function(..., with_themer = TRUE) {
  # TODO: add more this demo and also an option for launching different demos
  app <- system.file("themer-demo", package = "bootstraplib")
  if (with_themer) {
    run_with_themer(app, ...)
  } else {
    shiny::runApp(app, ...)
  }
}


colorpicker_deps <- function() {
  htmltools::htmlDependency(
    "bootstrap-colorpicker",
    "3.2.0",
    system.file("lib/bootstrap-colorpicker", package = "bootstraplib"),
    stylesheet = "css/bootstrap-colorpicker.min.css",
    script = "js/bootstrap-colorpicker.js"
  )
}

opts_metadata <- jsonlite::fromJSON(system.file("themer/options.json", package = "bootstraplib"),
  simplifyDataFrame = FALSE)

bs_themer_ui <- function() {

  computed_defaults <- get_default_css_values(unlist(unname(lapply(opts_metadata, names))))

  make_control <- function(id, lbl, default_value, type, desc = NULL) {
    default_value <- computed_defaults[[id]]
    if (type == "color") {
      div(class = "form-row form-group",
        htmltools::tags$label(lbl, title = paste0("$", id)),
        htmltools::tags$input(type = "text", class = "bs-theme-value bs-theme-value-color form-control form-control-sm text-monospace",
          "data-id" = id,
          value = default_value
        ),
        if (!is.null(desc)) {
          div(class = "form-text small", desc)
        }
      )
    } else if (type == "str") {
      div(class = "form-row form-group",
        htmltools::tags$label(lbl),
        htmltools::tags$input(type = "text", class = "bs-theme-value bs-theme-value-str form-control form-control-sm",
          "data-id" = id,
          value = default_value
        ),
        if (!is.null(desc)) {
          div(class = "form-text small", desc)
        }
      )
    } else if (type == "length") {
      div(class = "form-row form-group",
        htmltools::tags$label(lbl),
        htmltools::tags$input(type = "text", class = "bs-theme-value bs-theme-value-length form-control form-control-sm",
          "data-id" = id,
          value = default_value
        ),
        if (!is.null(desc)) {
          div(class = "form-text small", desc)
        }
      )
    } else if (type == "bool") {
      tagList(
        div(class = "form-check",
          htmltools::tags$input(type = "checkbox", class = "bs-theme-value bs-theme-value-bool form-check-input",
            id = paste0(".bsthemer-", id),
            "data-id" = id,
            checked = if (default_value) NA else NULL),
          htmltools::tags$label("for" = paste0(".bsthemer-", id), class = "form-check-label", lbl)
        ),
        if (!is.null(desc)) {
          div(class = "form-text small", desc)
        }
      )
    } else {
      stop("unknown type")
    }
  }

  opts <- lapply(opts_metadata, function(opt_infos) {
    mapply(names(opt_infos), opt_infos, FUN = function(name, opt_info) {
      make_control(name, opt_info$label, opt_info$default, opt_info$type, opt_info$desc)
    }, USE.NAMES = FALSE, SIMPLIFY = FALSE)
  })

  withTags(tagList(
    colorpicker_deps(),
    htmlDependency(
      "bs_themer", version = packageVersion("bootstraplib"), src = "themer", script = "themer.js", package = "bootstraplib", all_files = FALSE
    ),

    div(class = "card shadow", style = css(width = "18rem", max_height = "80vh", z_index = 1000),
      style = css(position = "fixed", top = "1rem", right = "1rem", height = "auto"),

      div(class = "card-header font-weight-bold bg-dark text-light px-3 py-2",
        "Theme customizer"
      ),

      div(id = "bsthemerAccordion", style = css(overflow_y = "auto"),
        lapply(seq_along(opts), function(i) {
          opt_name <- names(opts)[[i]]
          elId <- paste0("bsthemerCollapse", i)

          tagList(
            div(class = "card-header p-0 border-0",
              htmltools::tags$button(class="btn btn-link px-3 py-2 w-100 text-left border-0",
                "data-toggle"="collapse", "data-target"=paste0("#", elId),
                "aria-expanded"="true", "aria-controls"=elId,

                opt_name
              )
            ),
            div(id = elId, class = if (i == 1) "show" else "collapse",
              "data-parent"="#bsthemerAccordion",
              div(class = "card-body bg-white text-dark",
                opts[[i]]
              )
            )
          )
        })
      )
    )
  ))
}

#' Theme customization UI
#'
#' bootstraplib includes a handy realtime theme customization UI that you can use to
#' easily make common tweaks to Bootstrap variables and immediately see how they
#' would affect your app's appearance. There are two ways you can launch the
#' theming UI. For most Shiny apps, just use `run_with_themer()` in place
#' of [shiny::runApp()]; they should take the same arguments and work the same
#' way. Alternatively, you can call the `bs_themer()` function from inside your
#' server function (or in an R Markdown app that is using `runtime: shiny`, you
#' can call this from any code chunk).
#'
#' To help you permanently apply the changes you see in the preview, this
#' utility prints [bs_theme_add_variables()] code to the R console. Copy this
#' code and paste it into your Shiny app; see [bs_theme_add_variables()] for
#' more details on where that code should go.
#'
#' @param appDir The application to run. This can be a file or directory path,
#'   or a [shiny::shinyApp()] object. See [shiny::runApp()] for details.
#' @param ... Additional parameters to pass through to [shiny::runApp()].
#'
#' @section Limitations:
#'
#' Currently, this utility only works with Bootstrap 4. We hope to add
#' Bootstrap 3 compatibility in the future.
#'
#' It also only works with Shiny apps and R Markdown apps that use the Shiny
#' runtime. It's not possible to perform realtime preview for static R Markdown
#' documents.
#'
#' Note that currently, only the CSS generated from [bootstrap()]
#' will be instantly reflected in theme preview. CSS that is generated from
#' third parties or [bootstrap_sass()] may not be reflected in
#' realtime, even if setting the theme variables would have an effect if the app
#' is restarted. Since `bootstrap_sass()` is the mechanism by
#' which third-party HTML widgets are supposed to compile bootstraplib-aware CSS,
#' unfortunately it's not likely that the themer's realtime preview will work
#' with such components.
#'
#' @examples
#' library(shiny)
#'
#' # Initialize Bootstrap 4 with Bootstrap 3 compatibility shim
#' bs_theme_new("4+3")
#'
#' # Customize variables. These must always come between the
#' # call to bs_theme_new() and the UI definition!
#' bs_theme_add_variables(primary = "#008BA2")
#'
#' ui <- fluidPage(
#'   bootstrap(),
#'   h1("Heading 1"),
#'   h2("Heading 2"),
#'   p(
#'     "Paragraph text;",
#'     tags$a(href = "https://www.rstudio.com", "a link")
#'   ),
#'   p(
#'     actionButton("cancel", "Cancel"),
#'     actionButton("continue", "Continue", class = "btn-primary")
#'   ),
#'   tabsetPanel(
#'     tabPanel("First tab",
#'       "The contents of the first tab"
#'     ),
#'     tabPanel("Second tab",
#'       "The contents of the second tab"
#'     )
#'   )
#' )
#'
#' server <- function(input, output, session) {
#'
#' }
#'
#' if (interactive()) {
#'   run_with_themer(shinyApp(ui, server))
#' }
#'
#' @export
run_with_themer <- function(appDir = getwd(), ...) {
  obj <- shiny::as.shiny.appobj(appDir)
  origServerFuncSource <- obj[["serverFuncSource"]]
  obj[["serverFuncSource"]] <- function() {
    origServerFunc <- origServerFuncSource()
    function(input, output, session, ...) {
      bs_themer()
      if (!"session" %in% names(formals(origServerFunc))) {
        origServerFunc(input, output, ...)
      } else {
        origServerFunc(input, output, session, ...)
      }
    }
  }
  shiny::runApp(obj, ...)
}

#' @rdname run_with_themer
#' @export
bs_themer <- function() {
  session <- shiny::getDefaultReactiveDomain()

  if (is.null(session)) {
    stop(call. = FALSE, "bootstraplib::bs_themer() must be called from within a ",
      "Shiny server function")
  }
  if (!identical("ok", session$ns("ok"))) {
    stop(call. = FALSE, "bootstraplib::bs_themer() must be called from within a ",
      "top-level Shiny server function, not a Shiny module server function")
  }

  if (isTRUE(session$userData[["bs_themer_init"]])) {
    # bs_themer() was called multiple times for the same session
    return()
  } else {
    session$userData[["bs_themer_init"]] <- TRUE
  }

  input <- session$input

  orig_bs_theme <- bs_theme_get()

  shiny::insertUI("body", where = "beforeEnd", ui = bs_themer_ui())

  shiny::observeEvent(input$vars, {
    vals <- jsonlite::parse_json(input$vars)

    # Validate that `vals` is a simple list, containing atomic elements,
    # that are all named
    if (!identical(class(vals), "list") ||
        !all(vapply(vals, is.atomic, logical(1))) ||
        is.null(names(vals)) ||
        !isTRUE(all(nzchar(names(vals), keepNA = TRUE)))) {
      warning(call. = FALSE,
        "bs_themer() encountered malformed input; ignoring"
      )
      return()
    }

    if (length(vals) == 0) {
      # Makes remaining logic simpler to reason about
      return()
    }

    default_values <- get_default_css_values(names(vals))

    # Filter out vals that the user hasn't changed
    vals <- as.list(diff_css_values(vals, default_values))

    print(rlang::expr(bs_theme_add_variables(!!!vals)))

    old_theme <- bs_theme_get()
    on.exit(bs_theme_set(old_theme), add = TRUE, after = FALSE)

    if (is.null(old_theme)) {
      bs_theme_new()
    }
    bs_theme_add_variables(!!!vals)

    css <- sass(bs_theme_get(), write_attachments = FALSE)

    shiny::insertUI("head", where = "beforeEnd", ui = tags$style(id = "bs-realtime-preview-styles",
      htmltools::HTML(css)
    ))
    shiny::removeUI("#bs-realtime-preview-styles:not(:last-child)")
  })
}

# Retrieve the current values of sass variables, by rendering the CSS with
# some additional rules for the desired variables, in the form of
# `--VARNAME: #{$VARNAME};`
get_default_css_values <- function(varnames) {
  if (length(varnames) == 0) {
    return(stats::setNames(character(0), character(0)))
  }

  # It's possible that some varnames refer to variables that aren't defined.
  # This would normally cause a crash. We define last-ditch defaults here,
  # with a magic constant that we can swap out for NA before returning to
  # the user.
  na_sentinel <- "NA_SENTINEL_CONSTANT_4902F4E"
  sass_defaults <- sass::as_sass(paste0(collapse = "\n",
    "$", varnames, ": ", na_sentinel, " !default;"
  ))

  # Declare a block with a meaningless but identifiable selector (:root.get_default_vars)
  # and add properties for each variable that is desired.
  sass_definition <- sass::as_sass(paste0(
    ":root.get_default_vars {",
    paste0(collapse = "\n", "--", varnames, ": #{inspect($", varnames, ")};"),
    "}",
    collapse = "\n"
  ))

  # Render, with our newly created sass.
  old_theme <- bs_theme_get()
  on.exit(bs_theme_set(old_theme), add = TRUE, after = FALSE)

  if (is.null(bs_theme_get())) {
    bs_theme_new()
} else if ("3" %in% theme_version(bs_theme_get())) {
  stop("Interactive theming for Bootstrap 3 Sass isn't yet supported")
}
  bs_theme_add(declarations = sass_defaults, rules = sass_definition)

  css <- sass::sass(bs_theme_get(), write_attachments = FALSE)

  # Search the output for the block of properties we just generated, using the
  # ":root.get_default_vars" selector. The capture group will include all of the
  # properties we care about in a single string (the propstr variable below).
  matches <- regexec(":root\\.get_default_vars\\s*\\{\\s*\\n(.*?)\\n\\s*\\}", css)
  propstr <- regmatches(css, matches)[[1]][2]
  if (is.na(propstr)) {
    stop("get_default_css_values failed; expected selector was not found")
  }
  # Split the propstr by newline, so we can perform vectorized regex operations
  # on all of the variables at once.
  proplines <- strsplit(propstr, "\n")[[1]]

  # Parse each line for the name and value.
  matches2 <- regmatches(proplines, regexec("\\s*--([^:]+):\\s*(.*);$", proplines))
  names <- vapply(matches2, function(x) x[2], character(1))
  values <- vapply(matches2, function(x) x[3], character(1))

  if (any(is.na(names))) {
    stop("get_default_css_values failed; generated output was in an unexpected format")
  }
  if (!identical(varnames, names)) {
    stop("get_default_css_values failed; expected properties were not found")
  }

  # Any variables that had to fall back to our defaults, we'll replace with NA
  values[values == na_sentinel] <- NA_character_

  # Return as a named character vector
  stats::setNames(values, varnames)
}

diff_css_values <- function(a, b) {
  stopifnot(all(!is.na(a)))
  stopifnot(identical(names(a), names(b)))
  stopifnot(is.list(a))
  stopifnot(is.character(b))

  a_char <- vapply(a, function(x) {
    if (is.null(x)) {
      "null"
    } else if (is.logical(x)) {
      tolower(as.character(x))
    } else if (is.character(x)) {
      x
    } else {
      as.character(x)
    }
  }, character(1))

  idx <- ifelse(is.na(b), TRUE, a_char != b)
  a[idx]
}
