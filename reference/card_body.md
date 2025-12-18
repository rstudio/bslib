# Card items

Components designed to be provided as direct children of a
[`card()`](https://rstudio.github.io/bslib/reference/card.md). For a
general overview of the
[`card()`](https://rstudio.github.io/bslib/reference/card.md) API, see
[the Cards
article](https://rstudio.github.io/bslib/articles/cards/index.html) or
the other articles listed in the *References* section of the
[`card()`](https://rstudio.github.io/bslib/reference/card.md)
documentation.

## Usage

``` r
card_body(
  ...,
  fillable = TRUE,
  min_height = NULL,
  max_height = NULL,
  max_height_full_screen = max_height,
  height = NULL,
  padding = NULL,
  gap = NULL,
  fill = TRUE,
  class = NULL
)

card_title(..., container = htmltools::h5)

card_header(..., gap = NULL, class = NULL, container = htmltools::div)

card_footer(..., class = NULL)

card_image(
  file,
  ...,
  alt = "",
  src = NULL,
  href = NULL,
  border_radius = c("auto", "top", "bottom", "all", "none"),
  mime_type = NULL,
  class = NULL,
  height = NULL,
  fill = FALSE,
  width = NULL,
  container = NULL
)

as.card_item(x)

is.card_item(x)
```

## Arguments

- ...:

  Unnamed arguments can be any valid child of an [htmltools
  tag](https://rstudio.github.io/htmltools/reference/builder.html).
  Named arguments become HTML attributes on returned UI element.

- fillable:

  Whether or not the card item should be a fillable (i.e. flexbox)
  container.

- min_height, max_height, max_height_full_screen:

  Any valid [CSS length
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html).

- height:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `height="200px"`). Doesn't apply when a card is made
  `full_screen` (in this case, consider setting a `height` in
  `card_body()`).

- padding:

  Padding to use for the body. This can be a numeric vector (which will
  be interpreted as pixels) or a character vector with valid CSS
  lengths. The length can be between one and four. If one, then that
  value will be used for all four sides. If two, then the first value
  will be used for the top and bottom, while the second value will be
  used for left and right. If three, then the first will be used for
  top, the second will be left and right, and the third will be bottom.
  If four, then the values will be interpreted as top, right, bottom,
  and left respectively.

- gap:

  A [CSS length
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  defining the `gap` (i.e., spacing) between elements provided to `...`.
  This argument is only applicable when `fillable = TRUE`

- fill:

  Whether to allow this element to grow/shrink to fit its
  [`card()`](https://rstudio.github.io/bslib/reference/card.md)
  container.

- class:

  Additional CSS classes for the returned UI element.

- container:

  A function to generate an HTML element to contain the image. Setting
  this value to `card_body()` places the image inside the card body
  area, otherwise the image will extend to the edges of the card.

- file:

  A file path pointing an image. Local images (i.e. not a URI starting
  with `https://` or similar) will be base64 encoded and provided to the
  `src` attribute of the `<img>`. Alternatively, you may directly set
  the image `src`, in which case `file` is ignored.

- alt:

  Alternate text for the image, used by screen readers and assistive
  devices. Provide alt text with a description of the image for any
  images with important content. If alt text is not provided, the image
  will be considered to be decorative and will not be read or announced
  by screen readers.

  For more information, the Web Accessibility Initiative (WAI) has a
  [helpful tutorial on alt
  text](https://www.w3.org/WAI/tutorials/images/).

- src:

  The `src` attribute of the `<img>` tag. If provided, `file` is ignored
  entirely. Use `src` to provide a relative path to a file that will be
  served by the Shiny application and should not be base64 encoded.

- href:

  An optional URL to link to when a user clicks on the image.

- border_radius:

  Which side of the image should have rounded corners, useful when
  `card_image()` is used as an image cap at the top or bottom of the
  card.

  The value of `border_radius` determines whether the `card-img-top`
  (`"top"`), `card-img-bottom` (`"bottom"`), or `card-img` (`"all"`)
  [Bootstrap
  classes](https://getbootstrap.com/docs/5.3/components/card/#images)
  are applied to the card. The default `"auto"` value will use the
  image's position within a
  [`card()`](https://rstudio.github.io/bslib/reference/card.md) to
  automatically choose the appropriate class.

- mime_type:

  The mime type of the `file` when it is base64 encoded. This argument
  is available for advanced use cases where
  [`mime::guess_type()`](https://rdrr.io/pkg/mime/man/guess_type.html)
  is unable to automatically determine the file type.

- width:

  Any valid [CSS
  unit](https://rstudio.github.io/htmltools/reference/validateCssUnit.html)
  (e.g., `width="100%"`).

- x:

  an object to test (or coerce to) a card item.

## Value

An
[`htmltools::div()`](https://rstudio.github.io/htmltools/reference/builder.html)
tag.

## Functions

- `card_body()`: A general container for the "main content" of a
  [`card()`](https://rstudio.github.io/bslib/reference/card.md).

- `card_title()`: Similar to `card_header()` but without the border and
  background color.

- `card_header()`: A header (with border and background color) for the
  [`card()`](https://rstudio.github.io/bslib/reference/card.md).
  Typically appears before a `card_body()`.

- `card_footer()`: A header (with border and background color) for the
  [`card()`](https://rstudio.github.io/bslib/reference/card.md).
  Typically appears after a `card_body()`.

- `card_image()`: Include static images in a card, for example as an
  image cap at the top or bottom of the card.

- `as.card_item()`: Mark an object as a card item. This will prevent the
  [`card()`](https://rstudio.github.io/bslib/reference/card.md) from
  putting the object inside a `wrapper` (i.e., a `card_body()`).

## See also

[`card()`](https://rstudio.github.io/bslib/reference/card.md) creates a
card component.

[`navset_card_tab()`](https://rstudio.github.io/bslib/reference/navset.md),
[`navset_card_pill()`](https://rstudio.github.io/bslib/reference/navset.md)
and
[`navset_card_underline()`](https://rstudio.github.io/bslib/reference/navset.md)
create cards with tabbed navigation.

[`layout_columns()`](https://rstudio.github.io/bslib/reference/layout_columns.md)
and
[`layout_column_wrap()`](https://rstudio.github.io/bslib/reference/layout_column_wrap.md)
help position multiple cards into columns and rows and can also be used
inside a card.

[`layout_sidebar()`](https://rstudio.github.io/bslib/reference/sidebar.md)
adds a sidebar to a card when nested in
[`card()`](https://rstudio.github.io/bslib/reference/card.md) or
`card_body()`.
