# input_code_editor() rejects invalid themes

    Code
      input_code_editor("test", theme_light = "invalid-theme")
    Condition
      Error in `input_code_editor()`:
      ! `theme_light` must be one of "atom-one-dark", "dracula", "github-dark-dimmed", "github-dark", "github-light", "night-owl-light", "night-owl", "prism-okaidia", "prism-solarized-light", "prism-tomorrow", "prism-twilight", "prism", "vs-code-dark", or "vs-code-light", not "invalid-theme".

# arg_match_language rejects invalid languages

    Code
      input_code_editor("test", language = "fortran")
    Condition
      Error in `input_code_editor()`:
      ! `language` must be one of "r", "python", "julia", "sql", "javascript", "typescript", "markup", "css", "scss", "sass", "json", "markdown", "yaml", "xml", "toml", "ini", "bash", "docker", "latex", "cpp", "rust", "diff", "md", "html", "plain", "plaintext", "text", or "txt", not "fortran".

# input_code_editor validates theme names

    Code
      input_code_editor("test", theme_light = "invalid-theme")
    Condition
      Error in `input_code_editor()`:
      ! `theme_light` must be one of "atom-one-dark", "dracula", "github-dark-dimmed", "github-dark", "github-light", "night-owl-light", "night-owl", "prism-okaidia", "prism-solarized-light", "prism-tomorrow", "prism-twilight", "prism", "vs-code-dark", or "vs-code-light", not "invalid-theme".
    Code
      input_code_editor("test", theme_dark = "invalid-theme")
    Condition
      Error in `input_code_editor()`:
      ! `theme_dark` must be one of "atom-one-dark", "dracula", "github-dark-dimmed", "github-dark", "github-light", "night-owl-light", "night-owl", "prism-okaidia", "prism-solarized-light", "prism-tomorrow", "prism-twilight", "prism", "vs-code-dark", or "vs-code-light", not "invalid-theme".

# input_code_editor validates language

    Code
      input_code_editor("test", language = "fortran")
    Condition
      Error in `input_code_editor()`:
      ! `language` must be one of "r", "python", "julia", "sql", "javascript", "typescript", "markup", "css", "scss", "sass", "json", "markdown", "yaml", "xml", "toml", "ini", "bash", "docker", "latex", "cpp", "rust", "diff", "md", "html", "plain", "plaintext", "text", or "txt", not "fortran".

# update_code_editor validates inputs

    Code
      update_code_editor("test", language = "fortran", session = NULL)
    Condition
      Error in `update_code_editor()`:
      ! `language` must be one of "r", "python", "julia", "sql", "javascript", "typescript", "markup", "css", "scss", "sass", "json", "markdown", "yaml", "xml", "toml", "ini", "bash", "docker", "latex", "cpp", "rust", "diff", "md", "html", "plain", "plaintext", "text", or "txt", not "fortran".

---

    Code
      update_code_editor("test", theme_light = "invalid", session = NULL)
    Condition
      Error in `update_code_editor()`:
      ! `theme_light` must be one of "atom-one-dark", "dracula", "github-dark-dimmed", "github-dark", "github-light", "night-owl-light", "night-owl", "prism-okaidia", "prism-solarized-light", "prism-tomorrow", "prism-twilight", "prism", "vs-code-dark", or "vs-code-light", not "invalid".

---

    Code
      update_code_editor("test", theme_dark = "invalid", session = NULL)
    Condition
      Error in `update_code_editor()`:
      ! `theme_dark` must be one of "atom-one-dark", "dracula", "github-dark-dimmed", "github-dark", "github-light", "night-owl-light", "night-owl", "prism-okaidia", "prism-solarized-light", "prism-tomorrow", "prism-twilight", "prism", "vs-code-dark", or "vs-code-light", not "invalid".

---

    Code
      update_code_editor("test", indentation = "invalid", session = NULL)
    Condition
      Error in `update_code_editor()`:
      ! `indentation` must be one of "space" or "tab", not "invalid".

