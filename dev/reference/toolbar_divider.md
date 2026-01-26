# Toolbar: Add a divider or spacer to a toolbar

`toolbar_divider()` creates a visual divider line with customizable and
fixed width and spacing between toolbar elements. `toolbar_spacer()`
creates empty space that expands to push adjacent toolbar elements apart
as much as possible.

## Usage

``` r
toolbar_divider(..., width = NULL, gap = NULL)

toolbar_spacer()
```

## Arguments

- ...:

  Ignored, reserved for future use and to require named arguments in
  `toolbar_divider()`.

- width:

  A CSS length unit specifying the width of the divider line. Defaults
  to `"2px"` for a sensible dividing line. Pass `0px` for no divider
  line.

- gap:

  A CSS length unit defining the spacing around the divider. Defaults to
  `"1rem"` for sensible fixed spacing.

## Functions

- `toolbar_divider()`: Create a dividing line and fixed space between
  toolbar elements.

- `toolbar_spacer()`: Create empty, expanding space between toolbar
  elements. Note that for the spacer to push elements effectively, the
  parent toolbar needs `width: 100%` (which is automatically applied
  when the toolbar is a direct child of a label element). If the spacer
  doesn't appear to work, you may need to set `width = "100%"`
  explicitly on the
  [`toolbar()`](https://rstudio.github.io/bslib/dev/reference/toolbar.md).

## See also

Other toolbar components:
[`toolbar()`](https://rstudio.github.io/bslib/dev/reference/toolbar.md),
[`toolbar_input_button()`](https://rstudio.github.io/bslib/dev/reference/toolbar_input_button.md),
[`toolbar_input_select()`](https://rstudio.github.io/bslib/dev/reference/toolbar_input_select.md)

## Examples

``` r
if (FALSE) { # rlang::is_interactive()
toolbar(
  toolbar_input_button(id = "left1", label = "Left"),
  toolbar_divider(),
  toolbar_input_button(id = "right1", label = "Right")
)

toolbar(
  toolbar_input_button(id = "a", label = "A"),
  toolbar_divider(width = "5px", gap = "20px"),
  toolbar_input_button(id = "b", label = "B")
)

toolbar(
  toolbar_input_button(id = "previous", label = "Previous"),
  toolbar_spacer(),
  toolbar_input_button(id = "next", label = "Next")
)
}
```
