# Value boxes

This (short) article on
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
assumes you’ve loaded the following packages:

``` r

library(bslib)
library(shiny)
library(bsicons)
```

### Build a Box App

Want to explore all of the
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
options and layouts in an interactive app? Check out the [Build a Box
App](https://bslib.shinyapps.io/build-a-box)! Use the app to quickly
choose the right layout and theme for your value boxes, and then copy
the code right into your own app.

## Hello `value_box()`

A
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
has 4 main parts:

1.  `value`: Some text value.
2.  `title`: Optional text to display above `value`.
3.  `showcase`: Optional UI element(s) to display alongside the value.
4.  `theme`: Optional theme to change the appearance of the value box.
5.  `...`: Any other text/UI elements to appear below `value`.

As we’ll see later, one can be clever with what goes in the `showcase`,
but in many cases an icon provides enough visual context for the box to
feel “complete”. We recommend using the new
[bsicons](https://github.com/rstudio/bsicons) package since it’s
designed with Bootstrap in mind, but you could also use
[fontawesome](https://github.com/rstudio/fontawesome) or `{icons}`.

With each value box you can `showcase` a plot or an icon, choosing from
one of three values for `showcase_layout`: `"left center"`,
`"top right"`, or `"bottom"`. See [the Showcase Layouts
section](https://rstudio.github.io/bslib/dev/articles/reference/value_box.html#showcase-layouts)
in the
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
documentation for more details.

The overall appearance of the value box may be customized with the
`theme` argument, where you can choose from a wide variety of themes —
[the Themes
section](https://rstudio.github.io/bslib/dev/articles/reference/value_box.html#showcase-layouts)
of the
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
documentation lays out all of your options.

- Left center
- Top Right

``` r

value_box(
  title = "I got",
  value = "99 problems",
  showcase = bs_icon("music-note-beamed"),
  p("bslib ain't one", bs_icon("emoji-smile")),
  p("hit me", bs_icon("suit-spade"))
)
```

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLW11c2ljLW5vdGUtYmVhbWVkICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTYgMTNjMCAxLjEwNS0xLjEyIDItMi41IDJTMSAxNC4xMDUgMSAxM2MwLTEuMTA0IDEuMTItMiAyLjUtMnMyLjUuODk2IDIuNSAyem05LTJjMCAxLjEwNS0xLjEyIDItMi41IDJzLTIuNS0uODk1LTIuNS0yIDEuMTItMiAyLjUtMiAyLjUuODk1IDIuNSAyeiIgLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNCAxMVYyaDF2OWgtMXpNNiAzdjEwSDVWM2gxeiIgLz48cGF0aCBkPSJNNSAyLjkwNWExIDEgMCAwIDEgLjktLjk5NWw4LS44YTEgMSAwIDAgMSAxLjEuOTk1VjNMNSA0VjIuOTA1eiIgLz48L3N2Zz4=)

I got

99 problems

bslib ain't one
![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWVtb2ppLXNtaWxlICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6IiAvPjxwYXRoIGQ9Ik00LjI4NSA5LjU2N2EuNS41IDAgMCAxIC42ODMuMTgzQTMuNDk4IDMuNDk4IDAgMCAwIDggMTEuNWEzLjQ5OCAzLjQ5OCAwIDAgMCAzLjAzMi0xLjc1LjUuNSAwIDEgMSAuODY2LjVBNC40OTggNC40OTggMCAwIDEgOCAxMi41YTQuNDk4IDQuNDk4IDAgMCAxLTMuODk4LTIuMjUuNS41IDAgMCAxIC4xODMtLjY4M3pNNyA2LjVDNyA3LjMyOCA2LjU1MiA4IDYgOHMtMS0uNjcyLTEtMS41UzUuNDQ4IDUgNiA1czEgLjY3MiAxIDEuNXptNCAwYzAgLjgyOC0uNDQ4IDEuNS0xIDEuNXMtMS0uNjcyLTEtMS41UzkuNDQ4IDUgMTAgNXMxIC42NzIgMSAxLjV6IiAvPjwvc3ZnPg==)

hit me
![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLXN1aXQtc3BhZGUgIiBzdHlsZT0iaGVpZ2h0OjFlbTt3aWR0aDoxZW07ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBkPSJNOCAwYS41LjUgMCAwIDEgLjQyOS4yNDNjMS4zNTkgMi4yNjUgMi45MjUgMy42ODIgNC4yNSA0Ljg4Mi4wOTYuMDg2LjE5LjE3LjI4Mi4yNTVDMTQuMzA4IDYuNjA0IDE1LjUgNy43NDcgMTUuNSA5LjVhNCA0IDAgMCAxLTUuNDA2IDMuNzQ2Yy4yMzUuMzkuNDkxLjc4Mi43MjIgMS4xMzEuNDM0LjY1OS0uMDEgMS42MjMtLjg1NiAxLjYyM0g2LjA0Yy0uODQ1IDAtMS4yOS0uOTY0LS44NTYtMS42MjMuMjYzLS4zOTcuNTEtLjc3Ny43MjgtMS4xMzRBNCA0IDAgMCAxIC41IDkuNWMwLTEuNzUzIDEuMTkyLTIuODk2IDIuNTM5LTQuMTJsLjI4MS0uMjU1YzEuMzI2LTEuMiAyLjg5Mi0yLjYxNyA0LjI1MS00Ljg4MkEuNS41IDAgMCAxIDggMHpNMy43MTEgNi4xMkMyLjMwOCA3LjM5NiAxLjUgOC4yNTMgMS41IDkuNWEzIDMgMCAwIDAgNS4yNzUgMS45NTYuNS41IDAgMCAxIC44NjguNDNjLS4wOTQuNDM4LS4zMy45MzItLjYxMSAxLjQyOGEyOS4yNDcgMjkuMjQ3IDAgMCAxLTEuMDEzIDEuNjE0LjAzLjAzIDAgMCAwLS4wMDUuMDE4LjA3NC4wNzQgMCAwIDAgLjAyNC4wNTRoMy45MjRhLjA3NC4wNzQgMCAwIDAgLjAyNC0uMDU0LjAzLjAzIDAgMCAwLS4wMDUtLjAxOGMtLjMtLjQ1NS0uNjU4LTEuMDA1LS45Ni0xLjUzNS0uMjk0LS41MTQtLjU3LTEuMDY0LS42NjQtMS41MDdhLjUuNSAwIDAgMSAuODY4LS40M0EzIDMgMCAwIDAgMTQuNSA5LjVjMC0xLjI0Ny0uODA4LTIuMTA0LTIuMjExLTMuMzhMMTIgNS44NmMtMS4xOTYtMS4wODQtMi42NjgtMi40MTYtNC00LjQyNC0xLjMzMiAyLjAwOC0yLjgwNCAzLjM0LTQgNC40MjJsLS4yODkuMjYxeiIgLz48L3N2Zz4=)

``` r

value_box(
  title = "I got",
  value = "99 problems",
  showcase = bs_icon("music-note-beamed"),
  showcase_layout = "top right",
  theme = "secondary",
  p("bslib ain't one", bs_icon("emoji-smile")),
  p("hit me", bs_icon("suit-spade"))
)
```

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLW11c2ljLW5vdGUtYmVhbWVkICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTYgMTNjMCAxLjEwNS0xLjEyIDItMi41IDJTMSAxNC4xMDUgMSAxM2MwLTEuMTA0IDEuMTItMiAyLjUtMnMyLjUuODk2IDIuNSAyem05LTJjMCAxLjEwNS0xLjEyIDItMi41IDJzLTIuNS0uODk1LTIuNS0yIDEuMTItMiAyLjUtMiAyLjUuODk1IDIuNSAyeiIgLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNCAxMVYyaDF2OWgtMXpNNiAzdjEwSDVWM2gxeiIgLz48cGF0aCBkPSJNNSAyLjkwNWExIDEgMCAwIDEgLjktLjk5NWw4LS44YTEgMSAwIDAgMSAxLjEuOTk1VjNMNSA0VjIuOTA1eiIgLz48L3N2Zz4=)

I got

99 problems

bslib ain't one
![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWVtb2ppLXNtaWxlICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6IiAvPjxwYXRoIGQ9Ik00LjI4NSA5LjU2N2EuNS41IDAgMCAxIC42ODMuMTgzQTMuNDk4IDMuNDk4IDAgMCAwIDggMTEuNWEzLjQ5OCAzLjQ5OCAwIDAgMCAzLjAzMi0xLjc1LjUuNSAwIDEgMSAuODY2LjVBNC40OTggNC40OTggMCAwIDEgOCAxMi41YTQuNDk4IDQuNDk4IDAgMCAxLTMuODk4LTIuMjUuNS41IDAgMCAxIC4xODMtLjY4M3pNNyA2LjVDNyA3LjMyOCA2LjU1MiA4IDYgOHMtMS0uNjcyLTEtMS41UzUuNDQ4IDUgNiA1czEgLjY3MiAxIDEuNXptNCAwYzAgLjgyOC0uNDQ4IDEuNS0xIDEuNXMtMS0uNjcyLTEtMS41UzkuNDQ4IDUgMTAgNXMxIC42NzIgMSAxLjV6IiAvPjwvc3ZnPg==)

hit me
![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLXN1aXQtc3BhZGUgIiBzdHlsZT0iaGVpZ2h0OjFlbTt3aWR0aDoxZW07ZmlsbDpjdXJyZW50Q29sb3I7dmVydGljYWwtYWxpZ246LTAuMTI1ZW07IiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIj48cGF0aCBkPSJNOCAwYS41LjUgMCAwIDEgLjQyOS4yNDNjMS4zNTkgMi4yNjUgMi45MjUgMy42ODIgNC4yNSA0Ljg4Mi4wOTYuMDg2LjE5LjE3LjI4Mi4yNTVDMTQuMzA4IDYuNjA0IDE1LjUgNy43NDcgMTUuNSA5LjVhNCA0IDAgMCAxLTUuNDA2IDMuNzQ2Yy4yMzUuMzkuNDkxLjc4Mi43MjIgMS4xMzEuNDM0LjY1OS0uMDEgMS42MjMtLjg1NiAxLjYyM0g2LjA0Yy0uODQ1IDAtMS4yOS0uOTY0LS44NTYtMS42MjMuMjYzLS4zOTcuNTEtLjc3Ny43MjgtMS4xMzRBNCA0IDAgMCAxIC41IDkuNWMwLTEuNzUzIDEuMTkyLTIuODk2IDIuNTM5LTQuMTJsLjI4MS0uMjU1YzEuMzI2LTEuMiAyLjg5Mi0yLjYxNyA0LjI1MS00Ljg4MkEuNS41IDAgMCAxIDggMHpNMy43MTEgNi4xMkMyLjMwOCA3LjM5NiAxLjUgOC4yNTMgMS41IDkuNWEzIDMgMCAwIDAgNS4yNzUgMS45NTYuNS41IDAgMCAxIC44NjguNDNjLS4wOTQuNDM4LS4zMy45MzItLjYxMSAxLjQyOGEyOS4yNDcgMjkuMjQ3IDAgMCAxLTEuMDEzIDEuNjE0LjAzLjAzIDAgMCAwLS4wMDUuMDE4LjA3NC4wNzQgMCAwIDAgLjAyNC4wNTRoMy45MjRhLjA3NC4wNzQgMCAwIDAgLjAyNC0uMDU0LjAzLjAzIDAgMCAwLS4wMDUtLjAxOGMtLjMtLjQ1NS0uNjU4LTEuMDA1LS45Ni0xLjUzNS0uMjk0LS41MTQtLjU3LTEuMDY0LS42NjQtMS41MDdhLjUuNSAwIDAgMSAuODY4LS40M0EzIDMgMCAwIDAgMTQuNSA5LjVjMC0xLjI0Ny0uODA4LTIuMTA0LTIuMjExLTMuMzhMMTIgNS44NmMtMS4xOTYtMS4wODQtMi42NjgtMi40MTYtNC00LjQyNC0xLjMzMiAyLjAwOC0yLjgwNCAzLjM0LTQgNC40MjJsLS4yODkuMjYxeiIgLz48L3N2Zz4=)

## Dynamic rendering (Shiny)

When using Shiny to dynamically render
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
contents, it’s good practice to use
[`textOutput()`](https://rdrr.io/pkg/shiny/man/textOutput.html) to serve
as a placeholder for `value`, `title`, etc. This way, if the value takes
a moment to compute, the value box will appear before the value is
ready, and thus reduces “layout shift” when the value is actually
rendered.

``` r

ui <- page_fixed(
  value_box(
    title = "The current time",
    value = textOutput("time"),
    showcase = bs_icon("clock")
  )
)

server <- function(input, output) {
  output$time <- renderText({
    invalidateLater(1000)
    format(Sys.time())
  })
}

shinyApp(ui, server)
```

## Multiple value boxes

To layout multiple value boxes, it’s recommended to use
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
(or
[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)),
which ensures a uniform height and width (at least by default) across
the boxes.

``` r

vbs <- list(
  value_box(
    title = "1st value",
    value = "123",
    showcase = bs_icon("bar-chart"),
    theme = "purple",
    p("The 1st detail")
  ),
  value_box(
    title = "2nd value",
    value = "456",
    showcase = bs_icon("graph-up"),
    theme = "teal",
    p("The 2nd detail"),
    p("The 3rd detail")
  ),
  value_box(
    title = "3rd value",
    value = "789",
    showcase = bs_icon("pie-chart"),
    theme = "pink",
    p("The 4th detail"),
    p("The 5th detail"),
    p("The 6th detail")
  )
)

layout_column_wrap(
  width = "250px",
  !!!vbs
)
```

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWJhci1jaGFydCAiIHN0eWxlPSJoZWlnaHQ6MWVtO3dpZHRoOjFlbTtmaWxsOmN1cnJlbnRDb2xvcjt2ZXJ0aWNhbC1hbGlnbjotMC4xMjVlbTsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciPjxwYXRoIGQ9Ik00IDExSDJ2M2gydi0zem01LTRIN3Y3aDJWN3ptNS01djEyaC0yVjJoMnptLTItMWExIDEgMCAwIDAtMSAxdjEyYTEgMSAwIDAgMCAxIDFoMmExIDEgMCAwIDAgMS0xVjJhMSAxIDAgMCAwLTEtMWgtMnpNNiA3YTEgMSAwIDAgMSAxLTFoMmExIDEgMCAwIDEgMSAxdjdhMSAxIDAgMCAxLTEgMUg3YTEgMSAwIDAgMS0xLTFWN3ptLTUgNGExIDEgMCAwIDEgMS0xaDJhMSAxIDAgMCAxIDEgMXYzYTEgMSAwIDAgMS0xIDFIMmExIDEgMCAwIDEtMS0xdi0zeiIgLz48L3N2Zz4=)

1st value

123

The 1st detail

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLWdyYXBoLXVwICIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yO3ZlcnRpY2FsLWFsaWduOi0wLjEyNWVtOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwaDF2MTVoMTV2MUgwVjBabTE0LjgxNyAzLjExM2EuNS41IDAgMCAxIC4wNy43MDRsLTQuNSA1LjVhLjUuNSAwIDAgMS0uNzQuMDM3TDcuMDYgNi43NjdsLTMuNjU2IDUuMDI3YS41LjUgMCAwIDEtLjgwOC0uNTg4bDQtNS41YS41LjUgMCAwIDEgLjc1OC0uMDZsMi42MDkgMi42MSA0LjE1LTUuMDczYS41LjUgMCAwIDEgLjcwNC0uMDdaIiAvPjwvc3ZnPg==)

2nd value

456

The 2nd detail

The 3rd detail

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAxNiAxNiIgY2xhc3M9ImJpIGJpLXBpZS1jaGFydCAiIHN0eWxlPSJoZWlnaHQ6MWVtO3dpZHRoOjFlbTtmaWxsOmN1cnJlbnRDb2xvcjt2ZXJ0aWNhbC1hbGlnbjotMC4xMjVlbTsiIGFyaWEtaGlkZGVuPSJ0cnVlIiByb2xlPSJpbWciPjxwYXRoIGQ9Ik03LjUgMS4wMThhNyA3IDAgMCAwLTQuNzkgMTEuNTY2TDcuNSA3Ljc5M1YxLjAxOHptMSAwVjcuNWg2LjQ4MkE3LjAwMSA3LjAwMSAwIDAgMCA4LjUgMS4wMTh6TTE0Ljk4MiA4LjVIOC4yMDdsLTQuNzkgNC43OUE3IDcgMCAwIDAgMTQuOTgyIDguNXpNMCA4YTggOCAwIDEgMSAxNiAwQTggOCAwIDAgMSAwIDh6IiAvPjwvc3ZnPg==)

3rd value

789

The 4th detail

The 5th detail

The 6th detail

  

And, when incorporating multiple value boxes into a larger [filling
layout](https://rstudio.github.io/bslib/dev/articles/filling), it’s good
practice to set `fill = FALSE` on the layout container since that’ll
prevent the boxes from using up more space than they really need. For
example, try resizing the following example vertically. Notice how the
height of the value boxes don’t change, but the height of the plot does
(and it isn’t allowed to shrink below 200 pixels):

``` r

page_fillable(
  layout_column_wrap(
    width = "250px",
    fill = FALSE,
    vbs[[1]], vbs[[2]]
  ),
  card(
    min_height = 200,
    plotly::plot_ly(x = rnorm(100))
  )
)
```

## Expandable sparklines

Under-the-hood,
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
is implemented using
[`card()`](https://rstudio.github.io/bslib/dev/reference/card.md),
mainly to inherit it’s `full_screen` capabilities. Expanding a
[`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
to full screen isn’t so useful when the `showcase` is something simple
like an icon, but it becomes quite compelling for something like an
“expandable [sparkline](https://en.wikipedia.org/wiki/Sparkline)”. The
code to the right demonstrates one way you might go about that with
plotly.

Note that, since this example is statically rendered (outside of Shiny),
we make use of
[`htmlwidgets::onRender()`](https://rdrr.io/pkg/htmlwidgets/man/onRender.html)
to add some JavaScript that effectively says: “Show the xaxis of the
chart when it’s taller than 200 pixels; otherwise, hide it”.

Those of you who aren’t wanting to write JavaScript can achieve similar
behavior (i.e., displaying a different chart depending on its size) via
[`shiny::getCurrentOutputInfo()`](https://rdrr.io/pkg/shiny/man/getCurrentOutputInfo.html),
as mentioned in the [article on
cards](https://rstudio.github.io/bslib/dev/articles/cards#shiny). In
fact, here’s the [source
code](https://github.com/rstudio/bslib/tree/main/inst/examples-shiny/value_box)
for a Shiny app does effectively the same thing without any JavaScript
(note how it also leverages other
[`getCurrentOutputInfo()`](https://rdrr.io/pkg/shiny/man/getCurrentOutputInfo.html)
values to avoid hard coding `"white"` into the colors of the
sparklines).

``` r

library(plotly)

sparkline <- plot_ly(economics) %>%
  add_lines(
    x = ~date, y = ~psavert,
    color = I("white"), span = I(1),
    fill = 'tozeroy', alpha = 0.2
  ) %>%
  layout(
    xaxis = list(visible = F, showgrid = F, title = ""),
    yaxis = list(visible = F, showgrid = F, title = ""),
    hovermode = "x",
    margin = list(t = 0, r = 0, l = 0, b = 0),
    font = list(color = "white"),
    paper_bgcolor = "transparent",
    plot_bgcolor = "transparent"
  ) %>%
  config(displayModeBar = F) %>%
  htmlwidgets::onRender(
    "function(el) {
      el.closest('.bslib-value-box')
        .addEventListener('bslib.card', function(ev) {
          Plotly.relayout(el, {'xaxis.visible': ev.detail.fullScreen});
        })
    }"
  )


value_box(
  title = "Personal Savings Rate",
  value = "7.6%",
  p("Started at 12.6%"),
  p("Averaged 8.6% over that period"),
  p("Peaked 17.3% in May 1975"),
  showcase = sparkline,
  full_screen = TRUE,
  theme = "success"
)
```

Personal Savings Rate

7.6%

Started at 12.6%

Averaged 8.6% over that period

Peaked 17.3% in May 1975

Expand

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCIgc3R5bGU9ImhlaWdodDoxZW07d2lkdGg6MWVtO2ZpbGw6Y3VycmVudENvbG9yOyIgYXJpYS1oaWRkZW49InRydWUiIHJvbGU9ImltZyI+PHBhdGggZD0iTTIwIDVDMjAgNC40IDE5LjYgNCAxOSA0SDEzQzEyLjQgNCAxMiAzLjYgMTIgM0MxMiAyLjQgMTIuNCAyIDEzIDJIMjFDMjEuNiAyIDIyIDIuNCAyMiAzVjExQzIyIDExLjYgMjEuNiAxMiAyMSAxMkMyMC40IDEyIDIwIDExLjYgMjAgMTFWNVpNNCAxOUM0IDE5LjYgNC40IDIwIDUgMjBIMTFDMTEuNiAyMCAxMiAyMC40IDEyIDIxQzEyIDIxLjYgMTEuNiAyMiAxMSAyMkgzQzIuNCAyMiAyIDIxLjYgMiAyMVYxM0MyIDEyLjQgMi40IDEyIDMgMTJDMy42IDEyIDQgMTIuNCA0IDEzVjE5WiIgLz48L3N2Zz4=)
