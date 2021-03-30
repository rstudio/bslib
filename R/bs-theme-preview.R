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
#' @return nothing, this function is called for its side-effects (launching an
#'   application).
#' @seealso [run_with_themer()]
#' @examples
#' theme <- bs_theme(bg = "#6c757d", fg = "white", primary = "orange")
#' if (interactive()) bs_theme_preview(theme)
#' @export
bs_theme_preview <- function(theme = bs_theme(), ..., with_themer = TRUE) {
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
    lib_file("bs-colorpicker"),
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

bs_themer_ui <- function(opts, vals) {

  make_control <- function(id, opts) {
    value <- vals[[id]]
    lbl <- HTML(opts$label)
    desc <- HTML(opts$desc)
    text_input <- function(input_class = NULL, type = "text", ...) {
      div(
        class = "form-row form-group",
        tags$label(lbl),
        tags$input(
          type = type, value = value, "data-id" = id,
          class = "form-control form-control-sm bs-theme-value",
          class = input_class, ...
        ),
        if (!is.null(desc)) div(class = "form-text small", desc)
      )
    }
    switch(
      opts$type,
      color = text_input(input_class = "bs-theme-value-color text-monospace"),
      str = text_input(input_class = "bs-theme-value-str"),
      length = text_input(input_class = "bs-theme-value-length"),
      number = text_input(input_class = "bs-theme-value-str", type = "number", step = opts$step),
      bool = tagList(
        div(
          class = "form-check",
          tags$input(
            type = "checkbox", checked = if (value) NA else NULL,
            class = "bs-theme-value bs-theme-value-bool form-check-input",
            id = paste0(".bsthemer-", id), "data-id" = id
          ),
          tags$label("for" = paste0(".bsthemer-", id), class = "form-check-label", lbl)
        ),
        if (!is.null(desc)) div(class = "form-text small", desc)
      ),
      select = div(
        class = "form-row form-group",
        tags$label(class = "control-label", lbl),
        tags$select(
          class = "form-control", "data-id" = id,
          class = "bs-theme-value bs-theme-value-select",
          lapply(opts$choices, function(x) {
            tags$option(
              value = x, selected = if (identical(x, value)) NA else NULL,
              tools::toTitleCase(x)
            )
          })
        ),
        if (!is.null(desc)) div(class = "form-text small", desc)
      ),
      stop("unknown type")
    )
  }

  accordion <- lapply(seq_along(opts), function(i) {
    opt_name <- names(opts)[[i]]
    elId <- paste0("bsthemerCollapse", i)
    btn <- tags$button(
      class = "btn btn-link px-3 py-2 w-100 text-left border-0",
      "data-toggle" = "collapse", "data-target" = paste0("#", elId),
      "aria-expanded" = "true", "aria-controls" = elId,
      opt_name
    )
    controls <- lapply(seq_along(opts[[i]]), function(j) {
      make_control(names(opts[[i]])[[j]], opts[[i]][[j]])
    })
    tagList(
      div(class = "card-header p-0 border-0", btn),
      div(
        id = elId, class = if (i == 1) "show" else "collapse",
        "data-parent" = "#bsthemerAccordion",
        div(class = "card-body", controls)
      )
    )
  })

  withTags(tagList(
    colorpicker_deps(),
    htmlDependency(
      "bs_themer", version = packageVersion("bslib"),
      src = "themer", script = c("themer.js"),
      package = "bslib", all_files = FALSE
    ),

    div(id = "bsthemerContainer",
      class = "card shadow",
      style = css(
        # The bootstrap-colorpicker plugin sets a z-index of 1060 on
        # it's inputs, so the container needs a smaller index, than that
        # https://github.com/rstudio/bslib/blob/e4da71f3/inst/lib/bs-colorpicker/css/bootstrap-colorpicker.css#L38
        #
        # It's also important that this z-index is higher than 1030 so it's
        # overlaid on-top of fixed/sticky navbars
        # https://github.com/rstudio/bslib/blob/e4da71f3/inst/lib/bs/scss/_variables.scss#L697-L701
        z_index = 1059, width = "18rem", max_height = "80vh",
        position = "fixed", top = "1rem", right = "1rem", height = "auto"
      ),

      div(id = "bsthemerHeader",
        class = "move-grabber", "data-target" = "#bsthemerContainer",
        class = "card-header font-weight-bold bg-dark text-light px-3 py-2",
        "Theme customizer",
        tags$div(id = "bsthemerToggle", class = "float-right",
          "data-toggle" = "collapse", "data-target" = "#bsthemerAccordion",
          style = css(cursor = "pointer"),
          tags$span(),
          bs_dependency_defer(themer_css_dependency)
        )
      ),

      div(
        id = "bsthemerAccordion", class = "collapse show",
        style = css(overflow_y = "auto"),
        accordion
      )
    )
  ))
}

themer_css_dependency <- function(theme) {
  version <- utils::packageVersion("bslib")
  bs_dependency(
    input = sass_file(system_file("themer/themer.scss", package = "bslib")),
    theme = theme,
    name = "bs-themer-css",
    version = version,
    cache_key_extra = version
  )
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
#'   * Doesn't work with Bootstrap 3.
#'   * Doesn't work with IE11.
#'   * Only works inside Shiny apps and `runtime: shiny` R Markdown documents.
#'     * Can't be used with static R Markdown documents.
#'     * Can be used to some extent with `runtime: shiny_prerendered`, but only UI
#'       rendered through a `context="server"` may update in real-time.
#'   * Doesn't work with '3rd party' custom widgets that don't make use of
#'     [bs_dependency_defer()] or [bs_current_theme()].
#'
#' @return nothing. These functions are called for their side-effects.
#'
#' @examples
#' library(shiny)
#'
#' # Initialize Bootstrap 4 with Bootstrap 3 compatibility shim
#' theme <- bs_theme(version = 4, bg = "black", fg = "white")
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
  shiny::runApp(
    as_themer_app(appDir, gfonts = gfonts, gfonts_update = gfonts_update),
    ...
  )
}

as_themer_app <- function(appDir, gfonts = TRUE, gfonts_update = FALSE) {
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
  obj
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
  if (!is_available("shiny", "1.6.0")) {
    stop(call. = FALSE, "`bslib::bs_themer()` requires shiny v1.6.0 or higher")
  }
  theme <- get_current_theme()
  if (!is_bs_theme(theme)) {
    stop(call. = FALSE, "`bslib::bs_themer()` requires `shiny::bootstrapLib()` to be present ",
         "in the app's UI. Consider providing `bslib::bs_theme()` to the theme argument of the ",
         "relevant page layout function (or, more generally, adding `bootstrapLib(bs_theme())` to the UI.")
  }
  bootswatch <- theme_bootswatch(theme)
  switch_version(
    theme, three = stop("Interactive theming for Bootstrap 3 isn't supported")
  )
  if (isTRUE(session$userData[["bs_themer_init"]])) {
    # bs_themer() was called multiple times for the same session
    return()
  } else {
    session$userData[["bs_themer_init"]] <- TRUE
  }

  gfont_info <- if (isTRUE(gfonts)) get_gfont_info(gfonts_update)

  # Insert the theming control panel with values informed by the theme settings
  themer_opts <- opts_metadata()
  themer_vars <- unlist(unname(lapply(themer_opts, names)))
  sass_vars <- setdiff(themer_vars, "bootswatch")
  themer_vals <- as.list(get_themer_vals(theme, sass_vars))
  themer_vals$bootswatch <- bootswatch
  shiny::insertUI("body", where = "beforeEnd", ui = bs_themer_ui(themer_opts, themer_vals))

  input <- session$input

  # We emit different 'code' for runtime:shiny in Rmd
  isRmd <- is_shiny_runtime()

  # When the bootswatch theme changes, update the themer's state to reflect
  # the new variable defaults. Note that we also update the "input theme",
  # and effectively throw out any other theming changes made (i.e., start from a new theme)
  # since it'd be messy to figure out whether changes are "real" or just a
  # consequence of a new bootswatch value
  shiny::observeEvent(input$bs_theme_bootswatch, {
    theme <<- set_current_theme(
      theme, list(bootswatch = input$bs_theme_bootswatch),
      session, rmd = isRmd
    )
    vals <- as.list(bs_get_variables(theme, sass_vars))
    session$sendCustomMessage("bs-themer-bootswatch", list(values = vals))
  })

  # Fires when anything other then the Bootswatch theme changes
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

    # Makes remaining logic simpler to reason about
    if (length(vals) == 0) {
      return()
    }

    # Remember, theme at this point has been updated to reflect the current Bootswatch theme,
    # so re-query Sass values from the (possibly updated) theme, then filter down to meaningful
    # differences
    theme_vals <- get_themer_vals(theme, names(vals[sass_vars]))
    changed_vals <- as.list(diff_css_values(vals[sass_vars], theme_vals))

    if (!identical(bootswatch, input$bs_theme_bootswatch)) {
      changed_vals$bootswatch <- input$bs_theme_bootswatch
    }

    # If _either_ fg/bg has changed, bs_theme() must to be called with *both* fg and bg populated.
    if (any(c("bg", "fg") %in% names(changed_vals))) {
      changed_vals[["bg"]] <- changed_vals[["bg"]] %||% vals[["bg"]]
      changed_vals[["fg"]] <- changed_vals[["fg"]] %||% vals[["fg"]]
    }

    # Change variables names to their 'high-level' equivalents
    changed_vals <- rename2(
      changed_vals,
      "font-family-base" = "base_font", "font-family-monospace" = "code_font",
      "headings-font-family" = "heading_font",
      "font-size-base" = "font_scale"
    )

    if (length(changed_vals$font_scale)) {
      changed_vals$font_scale <- as.numeric(changed_vals$font_scale)
    }

    if (isTRUE(gfonts)) {
      for (var in c("base_font", "code_font", "heading_font")) {
        changed_vals[[var]] <- insert_font_google_call(changed_vals[[var]], gfont_info)
      }
    }

    set_current_theme(theme, changed_vals, session, rmd = isRmd)
  })
}


get_themer_vals <- function(theme, vars) {
  vals <- bs_get_variables(theme, vars)
  if (!grepl("rem$", vals[["font-size-base"]])) {
    stop("font-size-base must have a CSS unit length type of rem", call. = FALSE)
  }
  vals[["font-size-base"]] <- sub("rem$", "", vals[["font-size-base"]])
  vals
}

set_current_theme <- function(theme, changed_vals, session, rmd = FALSE) {
  shiny::insertUI("body", ui = spinner_overlay(), immediate = TRUE, session = session)
  on.exit(shiny::removeUI("body > #spinner_overlay"), add = TRUE)

  # Construct the code/yaml to display to the user
  if (isTRUE(rmd)) {
    display_vals <- lapply(changed_vals, function(x) {
      if (is.numeric(x)) {
        return(x)
      }
      if (rlang::is_call(x)) {
        str <- paste0(deparse(x, width.cutoff = 500L), collapse = "")
        return(paste("!expr", str))
      }
      # To avoid yaml parse errors with values that contain # or ",
      # first escape ", then in quote the value
      paste0('"', gsub('"', '\\"', x, fixed = TRUE), '"')
    })
    message("\n####  Update your Rmd output format's theme:  ####")
    cat(paste0(
      "    theme:\n",
      paste0(
        collapse = "\n", "      ", names(display_vals), ": ", display_vals
      ),
      "\n"
    ))
  } else {
    message("\n####  Update your bs_theme() R code with:  #####")
    print(rlang::expr(bs_theme_update(theme, !!!changed_vals)))
  }

  # Color contrast warnings are more annoying then they are useful inside the theming widget
  opts <- options(bslib.color_contrast_warnings = FALSE)
  on.exit(options(opts), add = TRUE)

  # the actual code that we evaluate should not have quoted expressions
  changed_vals[] <- lapply(changed_vals, eval_val)
  code <- rlang::expr(bs_theme_update(theme, !!!changed_vals))
  theme <- rlang::eval_tidy(code)
  # Prevent Sass compilation errors from crashing the app and relay a message to user.
  # Errors can happen if the users enters values that lead to unexpected Sass
  # expressions (e.g., "$foo: * !default")
  shiny::removeNotification("sass-compilation-error", session = session)
  tryCatch(
    session$setCurrentTheme(theme),
    error = function(e) {
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
  invisible(theme)
}

spinner_overlay <- function() {
  tagList(
    tags$style(
      "@supports ((-webkit-backdrop-filter:blur(4px)) or (backdrop-filter:blur(4px))) {
        #spinner_overlay{ -webkit-backdrop-filter:blur(4px); backdrop-filter:blur(4px); background-color:rgba(255,255,255,.05);}
      }"
    ),
    div(
      id = "spinner_overlay",
      style = "position:absolute; top:0; left:0; min-height:100vh; width:100%; background-color:rgba(255,255,255,.8); z-index:100000",
      class = "d-flex flex-column justify-content-center align-items-center",
      div(
        class = "spinner-border",
        style = "width:5rem; height:5rem; color: rgba(0,0,0,0.8);",
        role = "status",
        span(class = "sr-only", "Refreshing stylesheets...")
      ),
      span(class = "lead mt-1", style = "color: rgba(0,0,0,0.8);", "Refreshing stylesheets...")
    )
  )
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
  fams <- vapply(
    fams, function(x) gsub("^\\s*['\"]?", "", gsub("['\"]?\\s*$", "", x)),
    character(1), USE.NAMES = FALSE
  )
  fams <- fams[nzchar(fams)]
  is_a_gfont <- tolower(fams) %in% tolower(gfont_info$family)
  if (length(fams) == 1) {
    return(if (is_a_gfont) call("font_google", fams) else fams)
  }
  fams <- as.list(fams)
  for (i in which(is_a_gfont)) {
    fams[[i]] <- call("font_google", fams[[i]])
  }
  rlang::expr(font_collection(!!!unname(fams)))
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

  # Our bg/fg are not actual Sass variables and can mean different things depending
  # on the bootswatch theme/version
  base_color_idx <- varnames %in% c("fg", "bg")
  if (any(base_color_idx)) {
    varnames[base_color_idx] <- rename2(
      varnames[base_color_idx], !!!get_base_color_map(theme)
    )
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
    bs_bundle(theme, sass_layer(declarations = sassvars)),
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


  if (any(base_color_idx)) {
    varnames[base_color_idx] <- rename2(
      varnames[base_color_idx], !!!get_base_color_map(theme, decode = FALSE)
    )
  }

  # Return as a named character vector
  stats::setNames(values, varnames)
}


diff_css_values <- function(a, b) {
  stopifnot(all(!is.na(a)))
  stopifnot(identical(names(a), names(b)))
  stopifnot(is.list(a))
  if(!is.character(b))browser()

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

#' @rdname bs_get_variables
#' @inheritParams bs_get_variables
#' @export
#' @examples
#'
#' bs_get_contrast(bs_theme(), c("primary", "dark", "light"))
#'
#' library(htmltools)
#' div(
#'   class = "bg-primary",
#'   style = css(
#'     color = bs_get_contrast(bs_theme(), "primary")
#'   )
#' )
#'
bs_get_contrast <- function(theme, varnames) {
  stopifnot(is.character(varnames))
  stopifnot(length(varnames) > 0)

  varnames <- sub("^\\$", "", varnames)
  prop_string <- paste0(
    paste0(varnames, ": color-contrast($", varnames, ");"),
    collapse = "\n"
  )
  css <- sass::sass_partial(
    paste0("bs_get_contrast {", prop_string, "}"),
    theme, cache_key_extra = packageVersion("bslib")
  )
  css <- gsub("\n", "", gsub("\\s*", "", css))
  css <- sub("bs_get_contrast{", "", css, fixed = TRUE)
  css <- sub("\\}$", "", css)
  props <- strsplit(strsplit(css, ";")[[1]], ":")
  setNames(
    vapply(props, function(x) htmltools::parseCssColors(sub(";$", "", x[2])), character(1)),
    vapply(props, `[[`, character(1), 1)
  )
}
