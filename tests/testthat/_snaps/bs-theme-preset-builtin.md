# builtin_bundle(): errors for unknown preset names

    Code
      builtin_bundle("not-a-preset", version = "5")
    Error <rlang_error>
      'not-a-preset' is not a valid built-in theme preset provided by {bslib}.
      i Available Bootstrap 5 themes are: 'shiny'

---

    Code
      builtin_bundle("not-a-preset", version = "4")
    Error <rlang_error>
      'not-a-preset' is not a valid built-in theme preset provided by {bslib}.
      i No built-in theme presets are available for this version of Bootstrap.

