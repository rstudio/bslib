#' @export
#' @inheritParams card
#' @param title A (left-aligned) title to place in the card header/footer. If
#'   provided, other nav items are automatically right aligned.
#' @param padding Whether vertical and/or horizontal padding should be included
#'   around contents. Use `NULL` for neither, `"x"` for horizontal only,
#'   `"y"` for vertical only, or `c("x", "y")` for both (the default).
#' @param stretch If `TRUE`, the contents will stretch to fit remaining space
#'   in the card body.
#' @param full_screen If `TRUE`, a icon will appear when hovering over the card body
#'   to expand the contents to the entire viewport size.
#' @rdname navs
navs_tab_card <- function(..., id = NULL, selected = NULL, title = NULL,
                          header = NULL, footer = NULL, height = NULL, width = NULL,
                          padding = c("x", "y"), stretch = full_screen,
                          full_screen = FALSE) {

  items <- rlang::list2(...)

  if (!is.null(title)) {
    title <- nav_item(title, style = "margin-right:auto")
    items <- c(list(title), items)
  }

  tabs <- navs_tab(
    !!!items, id = id, selected = selected, header = header, footer = footer
  )

  # https://getbootstrap.com/docs/5.0/components/card/#navigation
  nav <- tagQuery(tabs)$
    find(".nav")$
    addClass("card-header-tabs")$
    selectedTags()

  card(
    height = height, width = width,
    card_header(nav),
    navs_card_body(tabs, padding, stretch, full_screen)
  )
}

#' @export
#' @param placement placement of the nav items relative to the content.
#' @rdname navs
navs_pill_card <- function(..., id = NULL, selected = NULL, title = NULL,
                           header = NULL, footer = NULL, height = NULL, width = NULL,
                           padding = c("x", "y"), stretch = full_screen,
                           full_screen = FALSE, placement = c("above", "below")) {

  items <- rlang::list2(...)

  if (!is.null(title)) {
    title <- nav_item(title, style = "margin-right:auto")
    items <- c(list(title), items)
  }

  pills <- navs_pill(
    !!!items, id = id, selected = selected,
    header = header, footer = footer
  )

  above <- match.arg(placement) == "above"

  nav <- tagQuery(pills)$
    find(".nav")$
    addClass(if (above) "card-header-pills")$
    selectedTags()

  card(
    height = height, width = width,
    if (above) card_header(nav),
    navs_card_body(pills, padding, stretch, full_screen),
    if (!above) card_footer(nav)
  )
}

navs_card_body <- function(tabs, padding, stretch, full_screen) {

  content <- tagQuery(tabs)$find(".tab-content")$selectedTags()

  if (length(content) > 1) {
    stop("Found more than 1 .tab-content CSS class. Please use another name for your CSS classes.")
  }

  content <- content[[1]]

  if (stretch) {
    content <- tagAppendAttributes(content, style = "height:100%")
    content <- tagAppendAttributes(content, .cssSelector = ".tab-pane", style = "height:100%")
  }

  card_body(
    padding = padding, stretch = stretch,
    content,
    if (full_screen) full_screen_toggle()
  )
}

# TODO: allow full_screen option to take a list of options to control icons, tooltip, etc
full_screen_toggle <- function() {
  icons <- list(open = "expand-alt", close = "compress-alt")

  js <- sprintf(
    "
    $(function() { new bootstrap.Tooltip('[data-bs-toggle=\"tooltip\"]') });

    $(document).on('click', '.bslib-full-screen-toggle', function(e) {
      var card = $(e.target).parents('.card');

      card.hasClass('bslib-full-screen') ?
         exitFullScreen(card) :
         enterFullScreen(card);
    });

    document.addEventListener('keyup', function(e) {
      if (e.key === 'Escape') {
        var card = $('.card.bslib-full-screen');
        if (card) exitFullScreen(card);
      }
    }, false);

    function enterFullScreen(card) {
      var toggle = card.find('.bslib-full-screen-toggle .fa');
      toggle.removeClass('fa-%s').addClass('fa-%s');

      // Before entering full-screen, remember the current width/height
      // so we can restore it when exiting
      var body = card.find('.card-body');
      body.data('height', body[0].offsetHeight);
      body.data('width', body[0].offsetWidth);

      // Relay resize to the window so htmlwidgets/plots know to resize
      var ro = new ResizeObserver(function(entries) {
        ro.disconnect();
        triggerResize();
      });

      ro.observe(body[0]);

      card.addClass('bslib-full-screen');
    }

    // When exiting full-screen, (temporarily) fix the size to the original size.
    // Without this trick, htmlwidgets/plots won't know how to shrink
    // back to their original container size (when stretch=TRUE)
    function exitFullScreen(card) {
      var toggle = card.find('.bslib-full-screen-toggle .fa');
      toggle.removeClass('fa-%s').addClass('fa-%s');

      var body = card.find('.card-body');

      // Relay resize to the window so htmlwidgets/plots know to resize
      var ro = new ResizeObserver(function(entries) {
        ro.disconnect();
        triggerResize();
        // TODO: ideally, the inline style would get removed once the resize has already
        // started. For now, waiting a second seems to work ok.
        setTimeout(function() { body.css('height', '').css('width', ''); }, 1000);
      });

      ro.observe(body[0]);

      card.removeClass('bslib-full-screen');

      body
        .css('height', body.data('height'))
        .css('width', body.data('width'));
    }

    function triggerResize() {
      window.dispatchEvent(new Event('resize'));
    }
    ", icons$open, icons$close, icons$close, icons$open
  )

  tags$a(
    class = "bslib-full-screen-toggle",
    style = "color: var(--bs-body-color)",
    "data-bs-toggle" = "tooltip",
    "data-bs-placement" = "bottom",
    title = "Toggle fullscreen",
    fontawesome::fa_i(icons$open),
    tags$head(tags$script(js))
  )
}
