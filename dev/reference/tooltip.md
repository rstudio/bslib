# Add a tooltip to a UI element

Display additional information when focusing (or hovering over) a UI
element.

## Usage

``` r
tooltip(
  trigger,
  ...,
  id = NULL,
  placement = c("auto", "top", "right", "bottom", "left"),
  options = list()
)

toggle_tooltip(id, show = NULL, session = get_current_session())

update_tooltip(id, ..., session = get_current_session())
```

## Arguments

- trigger:

  A UI element (i.e., [htmltools
  tag](https://rstudio.github.io/htmltools/reference/builder.html)) to
  serve as the tooltip trigger. If `trigger` renders as multiple HTML
  elements (e.g., it's a
  [`tagList()`](https://rstudio.github.io/htmltools/reference/tagList.html)),
  the last HTML element is used for the trigger. If the `trigger` should
  contain all of those elements, wrap the object in a
  [`htmltools::div()`](https://rstudio.github.io/htmltools/reference/builder.html)
  or
  [`htmltools::span()`](https://rstudio.github.io/htmltools/reference/builder.html).

- ...:

  UI elements for the tooltip. Character strings are [automatically
  escaped](https://rstudio.github.io/htmltools/reference/htmlEscape.html)
  unless marked as
  [`htmltools::HTML()`](https://rstudio.github.io/htmltools/reference/HTML.html).
  Tooltip content should expand on, not contradict element labels.

- id:

  a character string that matches an existing tooltip id.

- placement:

  The placement of the tooltip relative to its trigger.

- options:

  A list of additional
  [options](https://getbootstrap.com/docs/5.3/components/tooltips/#options).

- show:

  Whether to show (`TRUE`) or hide (`FALSE`) the tooltip. The default
  (`NULL`) will show if currently hidden and hide if currently shown.
  Note that a tooltip will not be shown if the trigger is not visible
  (e.g., it's hidden behind a tab).

- session:

  A Shiny session object (the default should almost always be used).

## Functions

- `tooltip()`: Add a tooltip to a UI element

- `toggle_tooltip()`: Programmatically show/hide a tooltip.

- `update_tooltip()`: Update the contents of a tooltip.

## Theming/Styling

Like other bslib components, tooltips can be themed by supplying
[relevant theming
variables](https://rstudio.github.io/bslib/articles/bs5-variables/index.html#tooltip-bg)
to
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md),
which effects styling of every tooltip on the page. To style a
*specific* tooltip differently from other tooltip, utilize the
`customClass` option:

    tooltip(
      "Trigger", "Tooltip message",
      options = list(customClass = "my-tip")
    )

And then add relevant rules to
[`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
via
[`bs_add_rules()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md):

    bs_theme() |> bs_add_rules(".my-tip { max-width: none; }")

## Accessibility of Tooltip Triggers

Because the user needs to interact with the `trigger` element to see the
tooltip, it's best practice to use an element that is typically
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

    tooltip(
      bsicons::bs_icon("info-circle", title = "About tooltips"),
      "Text shown in the tooltip."
    )

    tooltip(
      fontawesome::fa("info-circle", a11y = "sem", title = "About tooltips"),
      "Text shown in the tooltip."
    )

## References

Tooltips are based on [Bootstrap's Tooltip
component](https://getbootstrap.com/docs/5.3/components/tooltips/). See
the bslib website for an [interactive introduction to tooltips and
popovers](https://rstudio.github.io/bslib/articles/tooltips-popovers/index.html).

## See also

[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
provides a an alternative and more persistent container for additional
elements, typically revealed by clicking on a target element.

Other Components:
[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md),
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md),
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()

tooltip(
  shiny::actionButton("btn", "A button"),
  "A message"
)

card(
  card_header(
    tooltip(
      span("Card title ", bsicons::bs_icon("question-circle-fill")),
      "Additional info",
      placement = "right"
    )
  ),
  "Card body content..."
)
}
```
