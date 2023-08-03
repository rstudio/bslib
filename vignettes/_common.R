library(knitr)
library(htmltools)
library(shiny)
library(bslib)

# pkgdown really wants BS5+ markup for tabs, and this is currently the best way to achieving that :(
# (note this isn't a problem for any format based on html_document_base)
shiny:::setCurrentTheme(bs_theme())

knitr::opts_chunk$set(
  collapse = TRUE,
  comment = "#>",
  echo = TRUE,
  warning = FALSE,
  message = FALSE,
  fig.align = 'center'
)

knitr::opts_hooks$set(
  as_iframe = function(opts) {
    opts$render <- render_as_iframe
    opts$out.width <- "100%"
    opts$out.extra <- paste0(
      'seamless="seamless" frameBorder="0" loading="lazy"',
      if (isFALSE(opts$scrolling)) ' scrolling="no"',
      if (isTRUE(opts$resizable)) ' class="resizable"'
    )
    opts
  },
  as_image = function(opts) {
    opts$render <- render_as_image
    opts
  }
)

examples_path <- function() {
  doc_name <- sub("[.]Rmd", "", knitr::current_input())
  if (doc_name == "index") return("examples")
  file.path("examples", doc_name)
}

get_chunk_label <- function(reason) {
  label <- opts_current$get("label")
  if (!(is.null(label) || grepl("^unnamed", label))) return(label)
  stop("`", reason, "` requires a named chunk label", call. = FALSE)
}

render_as_iframe <- function(x, options, ...) {
  lbl <- get_chunk_label("as_iframe = TRUE")
  lbl_dir <- file.path(examples_path(), lbl)
  if (!dir.exists(lbl_dir)) {
    dir.create(lbl_dir, recursive = TRUE)
  }
  file <- file.path(lbl_dir, "index.html")
  x <- tagList(x, tags$head(tags$style(".html-widget { height: 250px !important; } .modebar-container { display: none; }")))
  tryCatch(
    save_html(x, file),
    error = function(e) {
      stop("Don't know how to render ", class(x)[[1]], " as an <iframe>")
    }
  )
  include_url(file)
}

render_as_image <- function(x, options, ...) {
  lbl <- get_chunk_label("as_image = TRUE")
  lbl_dir <- examples_path()
  if (!dir.exists(lbl_dir)) {
    dir.create(lbl_dir, recursive = TRUE)
  }
  file <- file.path(lbl_dir, paste0(lbl, ".png"))
  delay <- options$delay
  if (is.null(delay)) {
    delay <- 1
  }

  tryCatch({
      func <- if (inherits(x, "shiny.appobj")) webshot2::appshot else webshot2::webshot
      func(x, file, vwidth = options$out.width, vheight = options$out.height, delay = delay)
    },
    error = function(e) {
      stop("Don't know how to render ", class(x)[[1]], " as an image")
    }
  )
  knitr::include_graphics(file, dpi = 300)
}


include_vimeo <- function(id, width = "100%", height = "400") {
  url <- sprintf("https://player.vimeo.com/video/%s?title=0&byline=0&portrait=0", id)
  tags$iframe(
    src = url,
    width = width,
    height = height,
    frameborder = "0",
    seamless = "seamless",
    webkitAllowFullScreen = NA,
    mozallowfullscreen = NA,
    allowFullScreen = NA
  )
}
