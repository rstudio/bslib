# Tooltips & Popovers

This article on
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
and
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
assumes you’ve loaded the following packages:

``` r

library(bslib)
library(shiny)
library(bsicons)
```

## Motivation

Tooltips and popovers are a useful means for both displaying (tooltips)
and interacting with (popovers) additional information in a
non-obtrusive way. The motivating example below applies these components
to achieve a few useful patterns:

1.  Attaches a
    [`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
    to a “tip” icon in a
    [`card_header()`](https://rstudio.github.io/bslib/dev/reference/card_body.md),
    allowing the user to learn more about the data being visualized.
2.  Attaches a
    [`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
    to a “settings” icon in the
    [`card_header()`](https://rstudio.github.io/bslib/dev/reference/card_body.md),
    allowing the user to control parameters of the visualization
3.  Attaches a
    [`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
    to a link in the
    [`card_footer()`](https://rstudio.github.io/bslib/dev/reference/card_body.md),
    which facilitates not only display of more information, but also
    allowing for more interaction with that information (e.g., a
    hyperlink).

Show code

``` r

library(shiny)
library(bslib)
library(palmerpenguins)
library(ggplot2)

ui <- page_fillable(
  card(
    card_header(
      "Penguin body mass",
      tooltip(
        bsicons::bs_icon("question-circle"),
        "Mass measured in grams.",
        placement = "right"
      ),
      popover(
        bsicons::bs_icon("gear", class = "ms-auto"),
        selectInput("yvar", "Split by", c("sex", "species", "island")),
        selectInput("color", "Color by", c("species", "island", "sex"), "island"),
        title = "Plot settings"
      ),
      class = "d-flex align-items-center gap-1"
    ),
    plotOutput("plt"),
    card_footer(
      "Source: Gorman KB, Williams TD, Fraser WR (2014).",
      popover(
        a("Learn more", href = "#"),
        markdown(
          "Originally published in: Gorman KB, Williams TD, Fraser WR (2014) Ecological Sexual Dimorphism and Environmental Variability within a Community of Antarctic Penguins (Genus Pygoscelis). PLoS ONE 9(3): e90081. [doi:10.1371/journal.pone.0090081](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0090081)"
        )
      )
    )
  )
)

server <- function(input, output, session) {
  output$plt <- renderPlot({
    ggplot(penguins, aes(x = body_mass_g, y = !!sym(input$yvar), fill = !!sym(input$color))) +
      ggridges::geom_density_ridges(scale = 0.9, alpha = 0.5) +
      coord_cartesian(clip = "off") +
      labs(x = NULL, y = NULL) +
      ggokabeito::scale_fill_okabe_ito() +
      theme_minimal(base_size = 20) +
      theme(legend.position = "top")
  })
}

shinyApp(ui, server)
```

## Get started

In terms of how they’re implemented, tooltips and popovers are quite
similar. They both require a UI element to serve as the “trigger” (i.e.,
the UI that the user must interact with to toggle visibility) as well as
a message to show. Both
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
and
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
treat their 1st argument as the `trigger`, whereas other unnamed
arguments go into the message. Optionally, with
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md),
a `title` may also be provided.

In terms of their UX and applications, tooltips and popovers are quite
different. Tooltips are toggled via focus / hover whereas popovers are
toggled via click. As a result, popovers are much more “persistent”
(i.e., harder to open/close), and thus should only be used over tooltips
when further interaction may be needed. To put it another way, use
tooltips for small “read-only” messages, and popovers when the user
should be able to interact with the message itself.

``` r

actionButton(
  "btn_tip",
  "Focus/hover here for tooltip"
) |>
  tooltip("Tooltip message")
```

Tooltip message

Focus/hover here for tooltip

  

``` r

actionButton(
  "btn_pop", 
  "Click here for popover"
) |>
  popover(
    "Popover message",
    title = "Popover title"
  )
```

Popover message

Popover title

Click here for popover

## Examples

### Icons

In general, icons are probably the most ubiquitous trigger for a
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
(or
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)).
They’re small, unobtrusive, and provide a clear affordance that there’s
more information available. If you’d like to display an icon inline with
other text, and also treat that text as part of the trigger, wrap the
icon and text in a
[`span()`](https://rstudio.github.io/htmltools/reference/builder.html).

``` r

tooltip(
  span(
    "This text does trigger",
    bs_icon("info-circle")
  ),
  "Tooltip message",
  placement = "bottom"
)
```

Tooltip message This text does trigger
![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWluZm8tY2lyY2xlICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6IiAvPjxwYXRoIGQ9Im04LjkzIDYuNTg4LTIuMjkuMjg3LS4wODIuMzguNDUuMDgzYy4yOTQuMDcuMzUyLjE3Ni4yODguNDY5bC0uNzM4IDMuNDY4Yy0uMTk0Ljg5Ny4xMDUgMS4zMTkuODA4IDEuMzE5LjU0NSAwIDEuMTc4LS4yNTIgMS40NjUtLjU5OGwuMDg4LS40MTZjLS4yLjE3Ni0uNDkyLjI0Ni0uNjg2LjI0Ni0uMjc1IDAtLjM3NS0uMTkzLS4zMDQtLjUzM0w4LjkzIDYuNTg4ek05IDQuNWExIDEgMCAxIDEtMiAwIDEgMSAwIDAgMSAyIDB6IiAvPjwvc3ZnPg==)

Alternatively, if you wanted just the icon to be the trigger, you could
bring the
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
modifier inside the
[`span()`](https://rstudio.github.io/htmltools/reference/builder.html)
(i.e., the containing element for the text). Another way to do this
would be replace the
[`span()`](https://rstudio.github.io/htmltools/reference/builder.html)
in the 1st example with a [`list()`](https://rdrr.io/r/base/list.html)
(or
[`tagList()`](https://rstudio.github.io/htmltools/reference/tagList.html)),
which happens to work since
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
and
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
use the last HTML element in their 1st argument as the trigger.

``` r

span(
  "This text doesn't trigger",
  tooltip(
    bs_icon("info-circle"),
    "Tooltip message",
    placement = "bottom"
  )
)
```

This text doesn't trigger Tooltip
message![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWluZm8tY2lyY2xlICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6IiAvPjxwYXRoIGQ9Im04LjkzIDYuNTg4LTIuMjkuMjg3LS4wODIuMzguNDUuMDgzYy4yOTQuMDcuMzUyLjE3Ni4yODguNDY5bC0uNzM4IDMuNDY4Yy0uMTk0Ljg5Ny4xMDUgMS4zMTkuODA4IDEuMzE5LjU0NSAwIDEuMTc4LS4yNTIgMS40NjUtLjU5OGwuMDg4LS40MTZjLS4yLjE3Ni0uNDkyLjI0Ni0uNjg2LjI0Ni0uMjc1IDAtLjM3NS0uMTkzLS4zMDQtLjUzM0w4LjkzIDYuNTg4ek05IDQuNWExIDEgMCAxIDEtMiAwIDEgMSAwIDAgMSAyIDB6IiAvPjwvc3ZnPg==)

### Input labels

Input labels are great place to apply what we learned in
[icons](#icons). They’re already a common place to provide information
about an input, so adding a tooltip or popover to them is a natural
place to provide additional context.

``` r

textInput(
  "txt",
  label = tooltip(
    trigger = list(
      "Input label",
      bs_icon("info-circle")
    ),
    "Tooltip message"
  )
)
```

Tooltip message Input label
![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWluZm8tY2lyY2xlICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6IiAvPjxwYXRoIGQ9Im04LjkzIDYuNTg4LTIuMjkuMjg3LS4wODIuMzguNDUuMDgzYy4yOTQuMDcuMzUyLjE3Ni4yODguNDY5bC0uNzM4IDMuNDY4Yy0uMTk0Ljg5Ny4xMDUgMS4zMTkuODA4IDEuMzE5LjU0NSAwIDEuMTc4LS4yNTIgMS40NjUtLjU5OGwuMDg4LS40MTZjLS4yLjE3Ni0uNDkyLjI0Ni0uNjg2LjI0Ni0uMjc1IDAtLjM3NS0uMTkzLS4zMDQtLjUzM0w4LjkzIDYuNTg4ek05IDQuNWExIDEgMCAxIDEtMiAwIDEgMSAwIDAgMSAyIDB6IiAvPjwvc3ZnPg==)

### Cards

[Cards](https://rstudio.github.io/bslib/dev/articles/tooltips-popovers/cards.md)
provide a wealth of opportunity to apply what we learned in
[icons](#icons). More specifically, tooltips/popovers often work well
inside a
[`card_header()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)/[`card_footer()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
since they’re already designed for providing additional information
about output(s). The next few sections explore a few useful patterns.

#### Simple tooltip

Often times it’s useful to provide additional information about a card’s
header, especially if that header contains acronyms or other jargon. In
this case, a
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
can help non-expert users gain more context about the data being
visualized.

``` r

card(
  card_header(
    "Card header",
    tooltip(
      bs_icon("info-circle"),
      "Tooltip message"
    )
  ),
  "Card body..."
)
```

Card header Tooltip
message![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWluZm8tY2lyY2xlICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6IiAvPjxwYXRoIGQ9Im04LjkzIDYuNTg4LTIuMjkuMjg3LS4wODIuMzguNDUuMDgzYy4yOTQuMDcuMzUyLjE3Ni4yODguNDY5bC0uNzM4IDMuNDY4Yy0uMTk0Ljg5Ny4xMDUgMS4zMTkuODA4IDEuMzE5LjU0NSAwIDEuMTc4LS4yNTIgMS40NjUtLjU5OGwuMDg4LS40MTZjLS4yLjE3Ni0uNDkyLjI0Ni0uNjg2LjI0Ni0uMjc1IDAtLjM3NS0uMTkzLS4zMDQtLjUzM0w4LjkzIDYuNTg4ek05IDQuNWExIDEgMCAxIDEtMiAwIDEgMSAwIDAgMSAyIDB6IiAvPjwvc3ZnPg==)

Card body...

#### Input toolbar

When your app has “secondary” inputs that are specific to a given card,
it can be useful to “hideaway” those inputs into a
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
attached to the card’s header. This is especially useful when the inputs
are just meant to tweak parameters and/or only relevant to a subset of
users. In this case, it can be useful to provide a “settings” icon in
the card’s header, which when clicked, opens a
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
containing the inputs.

``` r

gear <- popover(
  bs_icon("gear"),
  textInput("txt", NULL, "Enter input"),
  title = "Input controls"
)

card(
  card_header(
    "Card header", gear,
    class = "d-flex justify-content-between"
  ),
  "Card body..."
)
```

Card header

Input controls

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWdlYXIgIiBzdHlsZT0iaGVpZ2h0OjFlbTt3aWR0aDoxZW07ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBkPSJNOCA0Ljc1NGEzLjI0NiAzLjI0NiAwIDEgMCAwIDYuNDkyIDMuMjQ2IDMuMjQ2IDAgMCAwIDAtNi40OTJ6TTUuNzU0IDhhMi4yNDYgMi4yNDYgMCAxIDEgNC40OTIgMCAyLjI0NiAyLjI0NiAwIDAgMS00LjQ5MiAweiIgLz48cGF0aCBkPSJNOS43OTYgMS4zNDNjLS41MjctMS43OS0zLjA2NS0xLjc5LTMuNTkyIDBsLS4wOTQuMzE5YS44NzMuODczIDAgMCAxLTEuMjU1LjUybC0uMjkyLS4xNmMtMS42NC0uODkyLTMuNDMzLjkwMi0yLjU0IDIuNTQxbC4xNTkuMjkyYS44NzMuODczIDAgMCAxLS41MiAxLjI1NWwtLjMxOS4wOTRjLTEuNzkuNTI3LTEuNzkgMy4wNjUgMCAzLjU5MmwuMzE5LjA5NGEuODczLjg3MyAwIDAgMSAuNTIgMS4yNTVsLS4xNi4yOTJjLS44OTIgMS42NC45MDEgMy40MzQgMi41NDEgMi41NGwuMjkyLS4xNTlhLjg3My44NzMgMCAwIDEgMS4yNTUuNTJsLjA5NC4zMTljLjUyNyAxLjc5IDMuMDY1IDEuNzkgMy41OTIgMGwuMDk0LS4zMTlhLjg3My44NzMgMCAwIDEgMS4yNTUtLjUybC4yOTIuMTZjMS42NC44OTMgMy40MzQtLjkwMiAyLjU0LTIuNTQxbC0uMTU5LS4yOTJhLjg3My44NzMgMCAwIDEgLjUyLTEuMjU1bC4zMTktLjA5NGMxLjc5LS41MjcgMS43OS0zLjA2NSAwLTMuNTkybC0uMzE5LS4wOTRhLjg3My44NzMgMCAwIDEtLjUyLTEuMjU1bC4xNi0uMjkyYy44OTMtMS42NC0uOTAyLTMuNDMzLTIuNTQxLTIuNTRsLS4yOTIuMTU5YS44NzMuODczIDAgMCAxLTEuMjU1LS41MmwtLjA5NC0uMzE5em0tMi42MzMuMjgzYy4yNDYtLjgzNSAxLjQyOC0uODM1IDEuNjc0IDBsLjA5NC4zMTlhMS44NzMgMS44NzMgMCAwIDAgMi42OTMgMS4xMTVsLjI5MS0uMTZjLjc2NC0uNDE1IDEuNi40MiAxLjE4NCAxLjE4NWwtLjE1OS4yOTJhMS44NzMgMS44NzMgMCAwIDAgMS4xMTYgMi42OTJsLjMxOC4wOTRjLjgzNS4yNDYuODM1IDEuNDI4IDAgMS42NzRsLS4zMTkuMDk0YTEuODczIDEuODczIDAgMCAwLTEuMTE1IDIuNjkzbC4xNi4yOTFjLjQxNS43NjQtLjQyIDEuNi0xLjE4NSAxLjE4NGwtLjI5MS0uMTU5YTEuODczIDEuODczIDAgMCAwLTIuNjkzIDEuMTE2bC0uMDk0LjMxOGMtLjI0Ni44MzUtMS40MjguODM1LTEuNjc0IDBsLS4wOTQtLjMxOWExLjg3MyAxLjg3MyAwIDAgMC0yLjY5Mi0xLjExNWwtLjI5Mi4xNmMtLjc2NC40MTUtMS42LS40Mi0xLjE4NC0xLjE4NWwuMTU5LS4yOTFBMS44NzMgMS44NzMgMCAwIDAgMS45NDUgOC45M2wtLjMxOS0uMDk0Yy0uODM1LS4yNDYtLjgzNS0xLjQyOCAwLTEuNjc0bC4zMTktLjA5NEExLjg3MyAxLjg3MyAwIDAgMCAzLjA2IDQuMzc3bC0uMTYtLjI5MmMtLjQxNS0uNzY0LjQyLTEuNiAxLjE4NS0xLjE4NGwuMjkyLjE1OWExLjg3MyAxLjg3MyAwIDAgMCAyLjY5Mi0xLjExNWwuMDk0LS4zMTl6IiAvPjwvc3ZnPg==)

Card body...

#### Popover with hyperlink

[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)s
are not only useful for creating [input toolbars](#input-toolbar), but
can also be useful in non-input situations, like providing more context
along with hyperlinks. Taking inspiration from the motivating example,
we can provide a
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
attached to a
[`actionLink()`](https://rdrr.io/pkg/shiny/man/actionButton.html) in the
card’s footer.[^1]

``` r

foot <- popover(
  actionLink("link", "Card footer"),
  "Here's a ",
  a("hyperlink", href = "https://google.com")
)

card(
  card_header("Card header"),
  "Card body...",
  card_footer(foot)
)
```

Card header

Card body...

Here's a [hyperlink](https://google.com)

[Card footer](javascript:void(0))

#### Editable header

Combining the idea of a [input toolbar](#input-toolbar) with Shiny’s
[`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html)/[`renderUI()`](https://rdrr.io/pkg/shiny/man/renderUI.html)
(i.e., dynamic UI) pattern, we can create an editable header. In this
case, we’ll use a
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
attached to a
[`uiOutput()`](https://rdrr.io/pkg/shiny/man/htmlOutput.html) in the
card’s header, which when clicked, opens a
[`textInput()`](https://rdrr.io/pkg/shiny/man/textInput.html).

Show code

``` r

ui <- page_fixed(
  card(
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
    list(
      input$card_title, 
      bsicons::bs_icon("pencil-square")
    )
  })
}

shinyApp(ui, server)
```

## Shiny

In Shiny, it’s possible to programmatically show, hide, and update the
contents of a
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
or
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md).
This can be useful for creating more dynamic apps, where the
tooltip/popover’s contents are dependent on user input. The next few
sections explore a few useful patterns.

### Read/update visibility

Use
[`toggle_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)/[`toggle_popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
to programmatically show/hide a
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)/[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md).
This is useful if you want a tooltip to be shown on page load and/or a
tooltip should be shown in response to some user input (e.g., a button
click).

Show code

``` r

library(shiny)

ui <- page_fixed(
  "Here's a tooltip:",
  tooltip(
    bsicons::bs_icon("info-circle"),
    "Tooltip message", 
    id = "tooltip"
  ),
  actionButton("show_tooltip", "Show tooltip"),
  actionButton("hide_tooltip", "Hide tooltip")
)

server <- function(input, output) {
  observeEvent(input$show_tooltip, {
    toggle_tooltip("tooltip", show = TRUE)
  })

  observeEvent(input$hide_tooltip, {
    toggle_tooltip("tooltip", show = FALSE)
  })
}

shinyApp(ui, server)
```

### Update contents

Use
[`update_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)/[`update_popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
to programmatically update the contents of a
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)/[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md).
This is especially useful of the tooltip/popover should reflect some
user input (e.g., a text input).

Show code

``` r

library(shiny)

ui <- page_fixed(
  "Here's a tooltip:",
  tooltip(
    bsicons::bs_icon("info-circle"),
    "Tooltip message",
    id = "tooltip"
  ),
  textInput("tooltip_msg", NULL, "Tooltip message")
)

server <- function(input, output) {
  observeEvent(input$tooltip_msg, {
    update_tooltip("tooltip", input$tooltip_msg)
  })
}

shinyApp(ui, server)
```

## Appendix

### Additional options

Both
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
and
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
support a number of additional options not covered in this article, but
are documented on their respective reference pages
([`?tooltip`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
and
[`?popover`](https://rstudio.github.io/bslib/dev/reference/popover.md)).

### Popovers vs modals

Those already familiar with Shiny’s
[`modalDialog()`](https://rdrr.io/pkg/shiny/man/modalDialog.html)/[`showModal()`](https://rdrr.io/pkg/shiny/man/showModal.html)
might wonder when a
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
is more appropriate. In general,
[`modalDialog()`](https://rdrr.io/pkg/shiny/man/modalDialog.html)s are
more appropriate for “blocking” interactions (i.e., the user must or
should interact with the modal before they interact with anything else).
In contrast,
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)s
are more appropriate for “non-blocking” interactions (i.e., the user can
interact with the popover and other UI elements at the same time). That
said, popovers don’t always scale well to larger messages/menus. In
those cases, consider a [offcanvas
menu](https://getbootstrap.com/docs/5.3/components/offcanvas/)
([bslib](https://rstudio.github.io/bslib/) doesn’t currently support
offcanvas menus, but it’s on the roadmap).

### Popovers on hyperlinks

In general, it’s not recommended to use a hyperlink as the trigger for a
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md).
That’s because, the typical click action of a hyperlink (i.e.,
navigating to a new page) conflicts with the click action of a
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md).
For this reason,
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
changes the trigger interaction to hover/focus when attached to a
hyperlink (i.e., it acts more like a
[`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
in this case), which at least makes the popover content visible. That
said, this is still a bit of a confusing UX, and thus should be avoided.
Instead, consider using a [icon](#icons) (next to a hyperlink) as the
trigger for the
[`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md).

[^1]: Using an
    [`actionLink()`](https://rdrr.io/pkg/shiny/man/actionButton.html)
    will only work as expected in Shiny apps. In a static document,
    you’ll need to use a `a(href = 'javascript:void(0)')` instead.
