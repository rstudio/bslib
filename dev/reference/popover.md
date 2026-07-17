# Add a popover to a UI element

Display additional information when clicking on a UI element (typically
a button).

## Usage

``` r
popover(
  trigger,
  ...,
  title = NULL,
  id = NULL,
  placement = c("auto", "top", "right", "bottom", "left"),
  options = list()
)

toggle_popover(id, show = NULL, session = get_current_session())

update_popover(id, ..., title = NULL, session = get_current_session())
```

## Arguments

- trigger:

  The UI element to serve as the popover trigger (typically a
  [`shiny::actionButton()`](https://rdrr.io/pkg/shiny/man/actionButton.html)
  or similar). If `trigger` renders as multiple HTML elements (e.g.,
  it's a
  [`tagList()`](https://rstudio.github.io/htmltools/reference/tagList.html)),
  the last HTML element is used for the trigger. If the `trigger` should
  contain all of those elements, wrap the object in a
  [`htmltools::div()`](https://rstudio.github.io/htmltools/reference/builder.html)
  or
  [`htmltools::span()`](https://rstudio.github.io/htmltools/reference/builder.html).

- ...:

  UI elements for the popover's body. Character strings are
  [automatically
  escaped](https://rstudio.github.io/htmltools/reference/htmlEscape.html)
  unless marked as
  [`htmltools::HTML()`](https://rstudio.github.io/htmltools/reference/HTML.html).

- title:

  A title (header) for the popover. To remove a header with
  `update_popover()`, provide a either an empty string or
  `character(0)`.

- id:

  A character string. Required to re-actively respond to the visibility
  of the popover (via the `input[[id]]` value) and/or update the
  visibility/contents of the popover.

- placement:

  The placement of the popover relative to its trigger.

- options:

  A list of additional
  [options](https://getbootstrap.com/docs/5.3/components/popovers/#options).

- show:

  Whether to show (`TRUE`) or hide (`FALSE`) the popover. The default
  (`NULL`) will show if currently hidden and hide if currently shown.
  Note that a popover will not be shown if the trigger is not visible
  (e.g., it's hidden behind a tab).

- session:

  A Shiny session object (the default should almost always be used).

## Functions

- `popover()`: Add a popover to a UI element

- `toggle_popover()`: Programmatically show/hide a popover.

- `update_popover()`: Update the contents of a popover.

## Closing popovers

In addition to clicking the `close_button`, popovers can be closed by
pressing the Esc/Space key when the popover (and/or its trigger) is
focused.

## Theming/Styling

Like other bslib components, popovers can be themed by supplying
[relevant theming
variables](https://rstudio.github.io/bslib/articles/bs5-variables/index.html#popover-bg)
to
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md),
which effects styling of every popover on the page. To style a
*specific* popover differently from other popover, utilize the
`customClass` option:

    popover(
      "Trigger", "Popover message",
      options = list(customClass = "my-pop")
    )

And then add relevant rules to
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
via
[`bs_add_rules()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md):

    bs_theme() |> bs_add_rules(".my-pop { max-width: none; }")

## Accessibility of Popover Triggers

Because the user needs to interact with the `trigger` element to see the
popover, it's best practice to use an element that is typically
accessible via keyboard interactions, like a button or a link. If you
use a non-interactive element, like a `<span>` or text, bslib will
automatically add the `tabindex="0"` attribute to the trigger element to
make sure that users can reach the element with the keyboard. This means
that in most cases you can use any element you want as the trigger.

One place where it's important to consider the accessibility of the
trigger is when using an icon without any accompanying text. In these
cases, many R packages that provide icons will create an icon element
with the assumption that the icon is decorative, which will make it
inaccessible to users of assistive technologies.

When using an icon as the primary trigger, ensure that the icon does not
have `aria-hidden="true"` or `role="presentation"` attributes. Icon
packages typically provide a way to specify a title for the icon, as
well as a way to specify that the icon is not decorative. The title
should be a short description of the purpose of the trigger, rather than
a description of the icon itself.

- If you're using
  [`bsicons::bs_icon()`](https://rdrr.io/pkg/bsicons/man/bs_icon.html),
  provide a `title`.

- If you're using
  [`fontawesome::fa()`](https://rstudio.github.io/fontawesome/reference/fa.html),
  set `a11y = "sem"` and provide a `title`.

For example:

    popover(
      bsicons::bs_icon("gear", title = "Settings"),
      title = "Settings",
      sliderInput("n", "Number of points", 1, 100, 50)
    )

    popover(
      fontawesome::fa("gear", a11y = "sem", title = "Settings"),
      title = "Settings",
      sliderInput("n", "Number of points", 1, 100, 50)
    )

## References

Popovers are based on [Bootstrap's Popover
component](https://getbootstrap.com/docs/5.3/components/popovers/). See
the bslib website for an [interactive introduction to tooltips and
popovers](https://rstudio.github.io/bslib/articles/tooltips-popovers/index.html).

## See also

[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
provides an alternative way to display informational text on demand,
typically when focusing or hovering over a trigger element.

Other Components:
[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md),
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md),
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()

popover(
  shiny::actionButton("btn", "A button"),
  "Popover body content...",
  title = "Popover title"
)

library(shiny)
library(bslib)

ui <- page_fixed(
  card(class = "mt-5",
    card_header(
      popover(
        uiOutput("card_title", inline = TRUE),
        title = "Provide a new title",
        textInput("card_title", NULL, "An editable title")
      )
    ),
    "The card body..."
  )
)

server <- function(input, output) {
  output$card_title <- renderUI({
    list(input$card_title, bsicons::bs_icon("pencil-square"))
  })
}

shinyApp(ui, server)
}
```
