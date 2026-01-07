# Dark mode input control

Creates a button that toggles between dark and light modes, specifically
for toggling between light and dark [Bootstrap color
modes](https://getbootstrap.com/docs/5.3/customize/color-modes/) – a new
feature added in [Bootstrap
5.3](https://getbootstrap.com/docs/5.3/migration/#color-modes).

## Usage

``` r
input_dark_mode(..., id = NULL, mode = NULL)

toggle_dark_mode(mode = NULL, ..., session = get_current_session())
```

## Arguments

- ...:

  Additional attributes to be passed to the input control UI, such as
  `class`, `style`, etc.

  In `toggle_dark_mode()`, the `...` are included for future
  extensibility and are currently ignored.

- id:

  An optional input id, required to reactively read the current color
  mode.

- mode:

  The initial mode of the dark mode switch. By default or when set to
  `NULL`, the user's system settings for preferred color scheme will be
  used. Otherwise, set to `"light"` or `"dark"` to force a particular
  initial mode.

- session:

  A Shiny session object (the default should almost always be used).

## Value

Returns a UI element for a dark mode switch input control. The server
value received for the input corresponding to `id` will be a string
value with the current color mode (`"light"` or `"dark"`).

## Functions

- `input_dark_mode()`: Create a dark mode switch input control

- `toggle_dark_mode()`: Programmatically toggle or set the current light
  or dark color mode.

## See also

Other input controls:
[`input_code_editor()`](https://rstudio.github.io/bslib/reference/input_code_editor.md),
[`input_switch()`](https://rstudio.github.io/bslib/reference/input_switch.md)
