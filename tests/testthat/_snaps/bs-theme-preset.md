# resolve_bs_preset(): throws an error if both `name` and `bootswatch` are provided

    Code
      resolve_bs_preset(preset = "name", bootswatch = "bootswatch")
    Error <rlang_error>
      Only one of `preset` or `bootswatch` may be provided, and `name` is preferred.
      i Did you mean one of the following options?
      * `preset = "name"`
      * `preset = "bootswatch"`
      * `bootswatch = "bootswatch"`

# resolve_bs_preset(): throws an error if `name` or `bootswatch` are not scalar strings

    Code
      resolve_bs_preset(preset = c("a", "b"))
    Error <rlang_error>
      The preset theme `preset` must be a single character string.
      x Bad: `preset = c("flatly", "darkly")`
      v Good: `preset = "flatly"`

---

    Code
      resolve_bs_preset(bootswatch = c("a", "b"))
    Error <rlang_error>
      The preset theme `bootswatch` must be a single character string.
      x Bad: `bootswatch = c("flatly", "darkly")`
      v Good: `bootswatch = "flatly"`

# resolve_bs_preset(): throws an error if `name` or `bootswatch` don't match existing presets

    Code
      resolve_bs_preset(preset = "not_a_preset", version = 4)
    Error <rlang_error>
      'not_a_preset' is not a known preset theme name for Bootstrap version 4.
      i You can list available preset themes:
      * Built-in: `builtin_themes(4)`
      * Bootswatch: `bootswatch_themes(4)`.

---

    Code
      resolve_bs_preset(bootswatch = "not_a_preset", version = 4)
    Error <rlang_error>
      'not_a_preset' is not a known preset theme name for Bootstrap version 4.
      i You can list available preset themes:
      * Built-in: `builtin_themes(4)`
      * Bootswatch: `bootswatch_themes(4)`.

