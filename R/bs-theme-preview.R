#' @include utils.R
NULL

#' Preview the currently set theme
#'
#' Launches an example shiny app via `run_with_themer()` and
#' `bs_theme_dependencies()`. Useful for getting a quick preview of the current
#' theme setting as well as an interactive GUI for tweaking some of the main
#' theme settings.
#'
#' The app that this launches is subject to change.
#'
#' @inheritParams bs_theme_update
#' @param ... passed along to [shiny::runApp()].
#' @param with_themer whether or not to run the app with [run_with_themer()].
#' @seealso [run_with_themer()]
#' @examples
#'
#' theme <- bs_theme(bg = "#6c757d", fg = "white", primary = "orange")
#' if (interactive()) bs_theme_preview(theme)
#' @export
bs_theme_preview <- function(theme, ..., with_themer = TRUE) {
  assert_bs_theme(theme)
  old_theme <- bs_global_get()
  on.exit(bs_global_set(old_theme), add = TRUE)
  bs_global_set(theme)
  # TODO: add more this demo and also an option for launching different demos
  app <- system_file("themer-demo", package = "bslib")
  if (with_themer) {
    run_with_themer(app, ...)
  } else {
    shiny::runApp(app, ...)
  }
}

colorpicker_deps <- function() {
  htmltools::htmlDependency(
    "bootstrap-colorpicker",
    "3.1.2",
    lib_file("bootstrap-colorpicker"),
    stylesheet = "css/bootstrap-colorpicker.min.css",
    script = "js/bootstrap-colorpicker.js"
  )
}

opts_metadata <- function() {
  jsonlite::fromJSON(
    system_file("themer/options.json", package = "bslib"),
    simplifyDataFrame = FALSE
  )
}

bs_themer_ui <- function(theme = bs_theme()) {

  computed_defaults <- bs_get_variables(theme, unlist(unname(lapply(opts_metadata(), names))))

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

  opts <- lapply(opts_metadata(), function(opt_infos) {
    mapply(names(opt_infos), opt_infos, FUN = function(name, opt_info) {
      make_control(name, opt_info$label, opt_info$default, opt_info$type, HTML(opt_info$desc))
    }, USE.NAMES = FALSE, SIMPLIFY = FALSE)
  })

  withTags(tagList(
    colorpicker_deps(),
    htmlDependency(
      "bs_themer", version = packageVersion("bslib"),
      src = "themer", script = c("themer.js"),
      package = "bslib", all_files = FALSE
    ),

    div(id = "bsthemerContainer",
      class = "card shadow", style = css(width = "18rem", max_height = "80vh", z_index = 1000),
      style = css(position = "fixed", top = "1rem", right = "1rem", height = "auto"),

      div(id = "bsthemerHeader",
        class = "move-grabber", "data-target" = "#bsthemerContainer",
        class = "card-header font-weight-bold bg-dark text-light px-3 py-2",
        "Theme customizer",
        tags$div(id = "bsthemerToggle", class = "float-right",
          "data-toggle" = "collapse", "data-target" = "#bsthemerAccordion",
          style = css(cursor = "pointer"),
          tags$span(),
          tags$style(HTML(
            sass_partial(
              sass_file(system_file("themer/themer.scss", package = "bslib")),
              theme
            )
          ))
        )
      ),

      div(id = "bsthemerAccordion", class = "collapse show", style = css(overflow_y = "auto"),
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
#' A 'real-time' theme customization UI that you can use to easily make common
#' tweaks to Bootstrap variables and immediately see how they would affect your
#' app's appearance. There are two ways you can launch the theming UI. For most
#' Shiny apps, just use `run_with_themer()` in place of [shiny::runApp()]; they
#' should take the same arguments and work the same way. Alternatively, you can
#' call the `bs_themer()` function from inside your server function (or in an R
#' Markdown app that is using `runtime: shiny`, you can call this from any code
#' chunk). Note that this function is only intended to be used for development!
#'
#' To help you utilize the changes you see in the preview, this utility prints
#' [bs_theme()] code to the R console.
#'
#' @param appDir The application to run. This can be a file or directory path,
#'   or a [shiny::shinyApp()] object. See [shiny::runApp()] for details.
#' @param ... Additional parameters to pass through to [shiny::runApp()].
#' @param gfonts whether or not to detect Google Fonts and wrap them in
#'   [font_google()] (so that their font files are automatically imported).
#' @param gfonts_update whether or not to update the internal database of
#'   Google Fonts.
#'
#' @section Limitations:
#'
#'   Currently, this utility only works with Bootstrap 4. We hope to add
#'   Bootstrap 3 compatibility in the future. Also, the color picker currently
#'   doesn't render correctly on IE11.
#'
#'   It also only works with Shiny apps and R Markdown apps that use the Shiny
#'   runtime. It's not possible to perform real-time preview for static R
#'   Markdown documents.
#'
#'   Note that only CSS generated with [bs_dependency_defer()] will be
#'   instantly reflected in theme preview.
#'
#' @examples
#' library(shiny)
#'
#' # Initialize Bootstrap 4 with Bootstrap 3 compatibility shim
#' theme <- bs_theme("4+3", bg = "black", fg = "white")
#'
#' ui <- fluidPage(
#'   theme = theme,
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
#' if (interactive()) {
#'   run_with_themer(shinyApp(ui, function(input, output) {}))
#' }
#'
#' @export
run_with_themer <- function(appDir = getwd(), ..., gfonts = TRUE, gfonts_update = FALSE) {
  obj <- shiny::as.shiny.appobj(appDir)
  origServerFuncSource <- obj[["serverFuncSource"]]
  obj[["serverFuncSource"]] <- function() {
    origServerFunc <- origServerFuncSource()
    function(input, output, session, ...) {
      bs_themer(gfonts, gfonts_update)
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
bs_themer <- function(gfonts = TRUE, gfonts_update = FALSE) {
  session <- shiny::getDefaultReactiveDomain()
  if (is.null(session)) {
    stop(call. = FALSE, "`bslib::bs_themer()` must be called from within a ",
         "Shiny server function")
  }
  if (!identical("ok", session$ns("ok"))) {
    stop(call. = FALSE, "`bslib::bs_themer()` must be called from within a ",
         "top-level Shiny server function, not a Shiny module server function")
  }
  if (!is_available("shiny", "1.5.0.9003")) {
    stop(call. = FALSE, "`bslib::bs_themer()` requires shiny v1.5.0.9003 or higher")
  }
  theme <- shiny::getCurrentTheme()
  if (!is_bs_theme(theme)) {
    stop(call. = FALSE, "`bslib::bs_themer()` requires `shiny::bootstrapLib()` to be present ",
         "in the app's UI. Consider providing `bslib::bs_theme()` to the theme argument of the ",
         "relevant page layout function (or, more generally, adding `bootstrapLib(bs_theme())` to the UI.")
  }
  if (!is.null(theme) && "3" %in% theme_version(theme)) {
    stop("Interactive theming for Bootstrap 3 Sass isn't yet supported")
  }

  if (isTRUE(session$userData[["bs_themer_init"]])) {
    # bs_themer() was called multiple times for the same session
    return()
  } else {
    session$userData[["bs_themer_init"]] <- TRUE
  }

  gfont_info <- if (isTRUE(gfonts)) get_gfont_info(gfonts_update)

  input <- session$input

  shiny::insertUI("body", where = "beforeEnd", ui = bs_themer_ui(theme))

  shiny::observeEvent(input$bs_theme_vars, {
    vals <- jsonlite::parse_json(input$bs_theme_vars)

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

    default_values <- bs_get_variables(theme, names(vals))

    # Filter out vals that the user hasn't changed
    changed_vals <- as.list(diff_css_values(vals, default_values))

    message("--------------------")

    # Change variables names to their 'high-level' equivalents
    # Note that if _either_ fg/bg has changed, bs_base_colors()
    # needs to be called with *both* fg and bg populated.
    changed_vals <- rename2(
      changed_vals, white = "bg", black = "fg",
      "font-family-base" = "base_font", "font-family-monospace" = "code_font",
      "headings-font-family" = "heading_font"
    )
    if (any(c("fg", "bg") %in% names(changed_vals))) {
      changed_vals[["fg"]] <- changed_vals[["fg"]] %||% vals[["black"]]
      changed_vals[["bg"]] <- changed_vals[["bg"]] %||% vals[["white"]]
    }

    if (isTRUE(gfonts)) {
      for (var in c("base_font", "code_font", "heading_font")) {
        changed_vals[[var]] <- insert_font_google_call(changed_vals[[var]], gfont_info)
      }
    }

    # print code for user, possibly with quoted expressions
    code <- rlang::expr(bs_theme_update(theme, !!!changed_vals))
    print(code)

    # the actual code that we evaluate should not have quoted expressions
    changed_vals[] <- lapply(changed_vals, eval_val)
    code <- rlang::expr(bs_theme_update(theme, !!!changed_vals))

    # Prevent Sass compilation errors from crashing the app and relay a message to user.
    # Errors can happen if the users enters values that lead to unexpected Sass
    # expressions (e.g., "$foo: * !default")
    shiny::removeNotification("sass-compilation-error", session = session)
    tryCatch(
      session$setCurrentTheme(rlang::eval_tidy(code)),
      error = function(e) {
        warning(e)
        shiny::showNotification(
          "Sass -> CSS compilation failed, likely due to invalid user input.
         Other theming changes won't take effect until the invalid input is fixed.",
          duration = NULL,
          id = "sass-compilation-error",
          type = "error",
          session = session
        )
      }
    )
  })
}

eval_val <- function(x) {
  if (is.call(x)) return(eval(x))
  if (!is.list(x)) return(x)
  lapply(x, eval_val)
}

insert_font_google_call <- function(val, gfont_info) {
  # val should be a non-empty character string
  if (!is_string(val)) return(NULL)
  if (!nzchar(val)) return(NULL)
  fams <- strsplit(as.character(val), ",")[[1]]
  fams <- vapply(fams, unquote_font_family, character(1))
  fams <- fams[nzchar(fams)]
  is_a_gfont <- tolower(fams) %in% tolower(gfont_info$family)
  if (length(fams) == 1) {
    return(if (is_a_gfont) call("font_google", fams) else fams)
  }
  fams <- as.list(fams)
  for (i in which(is_a_gfont)) {
    fams[[i]] <- call("font_google", fams[[i]])
  }
  unname(fams)
}


get_gfont_info <- function(update = FALSE) {
  if (isTRUE(update)) {
    jsonlite::fromJSON(gfont_api_url())$items
  } else {
    # See tools/update_gfont_info.R
    gfont_info
  }
}

# same as thematic:::gfont_api_url
gfont_api_url <- function() {
  paste0("https://www.googleapis.com/webfonts/v1/webfonts?key=", gfont_key())
}
# same as thematic:::gfont_key
# As mentioned in the developer API, this key is safe to be public facing
# https://developers.google.com/fonts/docs/developer_api
gfont_key <- function() {
  Sys.getenv("GFONT_KEY", paste0("AIzaSyDP", "KvElVqQ-", "26f7tjxyg", "IGpIajf", "tS_zmas"))
}

#' Retrieve Sass variable values from the current theme
#'
#' Useful for retriving a variable from the current theme and using
#' the value to inform another R function.
#'
#' @inheritParams bs_theme_update
#' @param varnames a character string referencing a Sass variable
#' in the current theme.
#' @return a character string containing a CSS/Sass value.
#' If the variable(s) are not defined, their value is `NA`.
#'
#' @export
#' @examples
#' vars <- c("body-bg", "body-color", "primary", "border-radius")
#' bs_get_variables(bs_theme(), varnames = vars)
#' bs_get_variables(bs_theme(bootswatch = "darkly"), varnames = vars)
#'
bs_get_variables <- function(theme, varnames) {
  if (length(varnames) == 0) {
    return(stats::setNames(character(0), character(0)))
  }

  assert_bs_theme(theme)

  # Support both `bs_get_variables("$foo")` and `bs_get_variables("foo")`
  # (note that `sass::sass("$$foo:1;")` is illegal; so this seems safe)
  varnames <- sub("^\\$", "", varnames)

  # It's possible that some varnames refer to variables that aren't defined.
  # This would normally cause a crash. We define last-ditch defaults here,
  # with a magic constant that we can swap out for NA before returning to
  # the user.
  na_sentinel <- "NA_SENTINEL_CONSTANT_4902F4E"
  sassvars <- paste0(
    "$", varnames, ": ", na_sentinel, " !default;",
    collapse = "\n"
  )

  # Declare a block with a meaningless but identifiable selector (.__rstudio_bslib_get_variables)
  # and add properties for each variable that is desired.
  cssvars <- paste0(
    "--", varnames, ": #{inspect($", varnames, ")};",
    collapse = "\n"
  )
  cssvars <- sprintf(":root.__rstudio_bslib_get_variables {\n %s \n}", cssvars)

  css <- sass_partial(
    cssvars,
    # Add declarations to the current theme
    bs_bundle(theme, sass::sass_layer(declarations = sassvars)),
  )

  # Search the output for the block of properties we just generated, using the
  # ".__rstudio_bslib_get_variables" selector. The capture group will include all of the
  # properties we care about in a single string (the propstr variable below).
  matches <- regexec("(:root)?\\.__rstudio_bslib_get_variables(:root)?\\s*\\{\\s*\\n(.*?)\\n\\s*\\}", css)
  propstr <- regmatches(css, matches)[[1]][4]
  if (is.na(propstr)) {
    stop("bs_global_get_variables failed; expected selector was not found")
  }
  # Split the propstr by newline, so we can perform vectorized regex operations
  # on all of the variables at once.
  proplines <- strsplit(propstr, "\n")[[1]]

  # Parse each line for the name and value.
  matches2 <- regmatches(proplines, regexec("\\s*--([^:]+):\\s*(.*);$", proplines))
  names <- vapply(matches2, function(x) x[2], character(1))
  values <- vapply(matches2, function(x) x[3], character(1))

  if (any(is.na(names))) {
    stop("bs_global_get_variables failed; generated output was in an unexpected format")
  }
  if (!identical(varnames, names)) {
    stop("bs_global_get_variables failed; expected properties were not found")
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
    if (is.null(x) || isTRUE(is.na(x))) {
      "null"
    } else if (is.logical(x)) {
      tolower(as.character(x))
    } else if (is.character(x)) {
      x
    } else {
      as.character(x)
    }
  }, character(1))

  b <- ifelse(is.na(b), "null", b)

  # Normalize colors; ignore things that don't seem to be colors. This is
  # necessary so we don't consider "black", "#000", "#000000", "rgb(0,0,0,1)",
  # etc. to be distinct values.
  #
  # Note: This won't work with values that are colors AND other things, like
  # "solid #000 3px"; it needs the value to be solely a color to be normalized.

  a_char_colors <- htmltools::parseCssColors(a_char, mustWork = FALSE)
  a_char <- ifelse(!is.na(a_char_colors), a_char_colors, a_char)

  b_colors <- htmltools::parseCssColors(b, mustWork = FALSE)
  b <- ifelse(!is.na(b_colors), b_colors, b)

  idx <- ifelse(is.na(b), TRUE, a_char != b)
  a[idx]
}
