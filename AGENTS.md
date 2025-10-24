# bslib

> Bootstrap-based UI toolkit for Shiny and R Markdown, enabling data scientists to build professional apps without web development expertise

## Overview

bslib is an R package that provides Bootstrap-based UI components and theming for Shiny web applications and R Markdown documents. It serves data scientists and analysts who want to build professional-looking apps without needing web development expertise. The package started as a way to access different Bootstrap versions in Shiny (which defaults to Bootstrap 3) and has evolved into a full-featured component library built on modern Bootstrap (v5), offering high-level UI patterns like cards, sidebars, value boxes, and responsive layouts that go beyond Bootstrap's low-level templates.

The package handles the complexity of Sass compilation, dependency management, and client-side interactivity, exposing a clean R API where users call functions like `card()` and `layout_column_wrap()` instead of writing HTML, CSS, or JavaScript.

## Purpose & Design Philosophy

bslib bridges the gap between R users and modern web UI design by:

1. **Abstracting web complexity**: Data scientists call R functions; bslib generates the HTML, manages CSS/JS dependencies, and handles Bootstrap's complexity.

2. **Progressive enhancement**: Components are "more than just" Bootstrap wrappers - they add features Shiny users need (like full-screen card toggles, enhanced sidebars) while maintaining Bootstrap's foundation.

3. **Flexible theming**: Supports both quick customization (via `brand` or `preset` arguments) and deep customization (via Sass variables), with real-time preview capability.

4. **Version flexibility**: Allows apps to use Bootstrap 3 (backwards compatibility), 4, or 5 (modern features) without rewriting code.

The central design tension: provide powerful, opinionated components that "just work" for non-web-developers, while preserving enough flexibility for advanced customization through function arguments like `class` and `style`. Components are opinionated and composable, but users with knowledge of Bootstrap can extend them comfortably.

## Quick Reference

- **Type**: R package with TypeScript components
- **Languages**: R (API/components), TypeScript (interactivity), Sass (styling)
- **Key Frameworks**: Bootstrap 3/4/5, Shiny, R Markdown, htmltools
- **Build Tools**: roxygen2 (R docs), esbuild (TS→JS), yarn (JS deps)
- **Primary Integration**: Shiny web framework for R

## Architecture

### The Two-Layer System

**R Layer** (`R/` directory):
- **Theme API**: `bs_theme()` creates a `sass_bundle` object representing a Bootstrap theme with customizations
- **UI Components**: Functions like `card()`, `sidebar()`, `value_box()` return `htmltools` tag objects
- **Compilation Orchestration**: `bs_theme_dependencies()` compiles Sass to CSS, bundles JS/fonts, returns HTML dependencies

**TypeScript Layer** (`srcts/` directory):
- **Component Enhancements**: Adds interactivity beyond Bootstrap (full-screen cards, dark mode toggle, responsive behavior)
- **Web Components**: Custom elements for complex UI patterns
- **Build Process**: TypeScript → esbuild → bundled JS in `inst/components/dist/`

### Component Architecture Pattern

Every bslib component follows this pattern:

```r
my_component <- function(arg1, ..., arg2 = default) {
  # 1. Separate attributes and children in dots, if needed. Useful when named
  #    attributes become attributes on a different tag than the children.
  dots <- separate_arguments(...) # => list(attribs = ..., children = ...)

  # 2. Build htmltools tag structure
  tag <- div(
    class = "bslib-my-component",
    data-attribute = "value",
    !!!dots$attribs,
    !!!dots$children,
    # 3. Add component-specific JS/CSS dependencies,
    my_component_dependencies()
  )

  # 4. Attach component dependencies (CSS/JS)
  tag <- tagAppendAttributes(tag, ...)
  tag_require(tag, version = 5)  # Ensures Bootstrap 5

  # 5. Return as HTML fragment
  as_fragment(tag)
}
```

Components are **composable**: `layout_sidebar(sidebar(...), card(...))` nests naturally because everything returns `htmltools` tags.

New components should be created in `R/{name}.R` and have a corresponding test file in `tests/testthat/test-{name}.R`.

### Adding TypeScript Interactivity

If your component needs client-side behavior, create TypeScript files in `srcts/src/components/`:

```
srcts/src/components/
  my-component.ts           # Component logic
  index.ts                  # Update to export your component
```

The build process (`yarn build`) compiles all exports from `srcts/src/components/index.ts` into `inst/components/dist/components.min.js`. On the R side, attach this dependency using `component_dependencies()` so the compiled JavaScript is included when your component renders. The TypeScript code typically:
- Initializes on elements with specific `data-*` attributes (e.g., `data-bslib-my-component`)
- Uses Bootstrap's JavaScript API for native component integration
- Registers event listeners and manages component state
- Communicates with Shiny via `Shiny.setInputValue()` when needed

### Adding Component Styles

Component-specific Sass should be placed in `inst/components/scss/`, e.g. `inst/components/scss/my-component.scss`.

These styles are compiled as part of the theme compilation process and become themable (they can access Bootstrap variables like `$primary`, `$border-radius`, etc.).

The final CSS should use CSS variables (e.g. `--bslib-*`) to support runtime theming, and these variables can fall back to using Bootstrap Sass variables that are filled in during compilation.

### Server-Client Communication Patterns

There are three main ways to communicate between the Shiny server and client-side components:

**1. Input Bindings (for bidirectional component state)**

Create a full Shiny input by extending `InputBinding` and implementing `getValue()`, `setValue()`, and `receiveMessage()`. This is the most robust pattern for components that maintain state and can be updated from the server.

- **Example**: Sidebar (`srcts/src/components/sidebar.ts`, `R/sidebar.R`)
- **Client side**: `SidebarInputBinding` extends `InputBinding`, implements `receiveMessage(el, data)` to handle server updates
- **Server side**: `sidebar()` creates the input, server updates via `session$sendInputMessage(id, list(method = "open"))`
- **Use when**: The component is a true input control with state that should be bookmarkable and updatable from both client and server

**2. Simple Input Values (for reporting client state)**

Use `Shiny.setInputValue()` to send values from client to server in a lightweight, non-bookmarkable way. Best for internal state reporting.

- **Example**: Card full-screen state (`srcts/src/components/card.ts`, `R/card.R`)
- **Client side**: `Shiny.setInputValue(this.card.id + "_full_screen", isFullScreen)`
- **Server side**: Read value via `input$<card_id>_full_screen` (reactive)
- **Use when**: Component needs to report state changes to server but doesn't need full input binding infrastructure or bookmarking

**3. Custom Messages (for server-initiated updates)**

Use `session$sendCustomMessage()` from the server and register a handler with `Shiny.addCustomMessageHandler()` on the client. Ideal for global updates or when you don't have a specific input `id`.

- **Example**: Dark mode toggle (`R/input-dark-mode.R`, `srcts/src/components/webcomponents/inputDarkMode.ts`)
- **Server side**: `session$sendCustomMessage("bslib.toggle-dark-mode", list(method = "toggle", value = "dark"))`
- **Client side**: `Shiny.addCustomMessageHandler("bslib.toggle-dark-mode", function(data) { ... })`
- **Use when**: Updates affect global state or the communication is primarily one-way (server → client)

### Key Design Aspects

**Sass Layering System**:
- Bootstrap core variables (lowest priority)
- Preset/Bootswatch theme overrides
- User-specified variables (via `bs_theme(bg = ...)`)
- Custom rules (via `bs_add_rules()`)
- Highest priority wins in Sass compilation

**Dependency Management**:
- Uses `htmltools::htmlDependency()` to track CSS/JS files
- Dependencies are automatically deduplicated when tags are rendered
- Each component specifies its own dependencies; htmltools resolves conflicts

**Version Handling**:
- `inst/lib/bs3/`, `inst/lib/bs4/`, `inst/lib/bs5/` contain Bootstrap sources
- Component functions check version compatibility via `tag_require(tag, version = 5)`
- Some components (modern layouts, value boxes) only work with Bootstrap 5

## Technical Details

### Directory Structure

```
bslib/
├── R/                         # R package source
│   ├── bs-theme*.R            # Theme creation and management API
│   ├── bs-dependencies.R      # Sass compilation and dependency bundling
│   ├── card.R, sidebar.R, ... # UI component functions
│   ├── layout.R, page.R       # Layout containers and page templates
│   ├── navs.R, nav-*.R        # Navigation components (tabs, pills, navbar)
│   └── utils*.R               # Internal utilities
│
├── inst/                        # Assets bundled with package
│   ├── lib/                     # Third-party libraries
│   │   ├── bs3/, bs4/, bs5/     # Bootstrap source Sass and compiled JS
│   │   ├── bsw3/, bsw4/, bsw5/  # Bootswatch theme Sass
│   │   └── bs-colorpicker/, bs-a11y-p/  # Additional libraries
│   ├── components/
│   │   ├── scss/              # Custom component Sass (bslib-specific styles)
│   │   └── dist/              # Compiled component JS (from srcts/)
│   ├── css-precompiled/       # Precompiled CSS for stock Bootstrap builds
│   │   ├── 3/, 4/, 5/         # Organized by Bootstrap version
│   ├── builtin/bs5/shiny/     # Built-in "shiny" preset theme assets
│   ├── examples-shiny/        # Demo Shiny apps (runExample())
│   └── fonts/                 # Font files used by components
│
├── srcts/                     # TypeScript source (not in built package)
│   ├── src/components/        # Component TypeScript implementations
│   └── build/                 # esbuild configuration
│
├── man/                        # Generated R documentation (from roxygen2)
├── tests/testthat/             # Unit tests
├── vignettes/                  # Package vignettes (guides/tutorials)
├── _dev/                       # Development scripts and notes
├── docs/                       # pkgdown website (generated)
│
├── DESCRIPTION                 # Package metadata and dependencies
├── NAMESPACE                   # Exported functions (auto-generated)
├── package.json, yarn.lock     # Node.js dependencies for build process
└── tsconfig.json              # TypeScript compiler configuration
```

### Key Components & Modules

**Theme System** (`R/bs-theme*.R`):
- `bs_theme()`: Main entry point; creates `sass_bundle` with Bootstrap + customizations
- `bs_theme_update()`, `bs_add_variables()`, `bs_add_rules()`: Modify existing themes
- `bs_theme_preview()`: Interactive Shiny app for real-time theme editing
- Preset system: Built-in themes (`builtin_themes()`), Bootswatch (`bootswatch_themes()`), brand.yml

**UI Components** (`R/card.R`, `R/sidebar.R`, `R/value-box.R`, etc.):
- `card()` family: Container with header/body/footer, full-screen capability
- `layout_*()` family: Column wrapping, sidebars, fillable containers
- `value_box()`: Dashboard metric display with icons and styling
- `navset_*()` family: Tabbed and navigation interfaces
- `page_*()` family: Page-level templates (fillable, sidebar, navbar, fluid)

**Compilation & Dependencies** (`R/bs-dependencies.R`):
- `bs_theme_dependencies()`: Compiles theme → CSS, bundles all dependencies
- `bs_dependency()`: Creates themable component dependencies for extension authors
- Precompilation logic: Checks for stock builds, falls back to dynamic compilation
- Caching via `sass::sass_cache_context_dir()`

**Client-Side Enhancements** (`srcts/src/components/`):
- Card full-screen mode toggle and state management
- Dark mode input (`input-dark-mode.ts`)
- Sidebar collapse/expand behavior
- Web components for complex interactions

**Legacy Compatibility** (`R/navs-legacy.R`, `inst/bs3compat/`):
- Bootstrap 3 compatibility shims for Shiny components
- Migration helpers for transitioning apps from BS3 to BS4/5

## Development Workflow

### Getting Started

```r
# Install package dependencies
pak::local_install_dev_deps()
```

```bash
# For TypeScript development
# (Requires Node.js 14+ and Yarn 1.22+)
yarn install
```

### Common Tasks

**Build TypeScript components**:
```bash
yarn build             # Compile TS → JS (with type checking and linting)
yarn watch             # Auto-rebuild on file changes
yarn check_types       # TypeScript type checking only
yarn check_lint        # ESLint checks only
```

**R package development**:
```r
devtools::load_all() # Load package for interactive development
devtools::document() # Build documentation
devtools::test()     # Run tests
devtools::test(filter = "{name}")  # Test specific file
devtools::check()    # Check package (R CMD check) (use as final check)
```

**Enable Shiny dev mode** (disables caching/precompilation):
```r
options(shiny.devmode = TRUE)
# or
shiny::devmode(TRUE)
```

## Code Conventions & Standards

**R Code Style**:
- Follow tidyverse style guide (function names use `snake_case`)
- Exported functions documented with roxygen2 (`#'` comments)
- Use `rlang` for tidy evaluation (`rlang::list2()`, `!!!` for splicing)

**TypeScript Code Style**:
- ESLint + Prettier enforce formatting
- Avoid `any` types; prefer explicit typing
- Use `lit` or standard `CustomElement` for web components
- Shiny uses jQuery internally, but all new components should strive to use standard browser APIs
- External Bootstrap types via `@types/bootstrap`

**Naming Conventions**:
- `bs_*()`: Core theming functions
- `layout_*()`: Layout containers
- `card_*()`, `value_box_*()`: Component families
- `navset_*()`: Navigation components
- Internal helpers do not need a prefix; they are simply not exported

**Documentation Patterns**:
- Every exported function has `@export` and complete roxygen2 docs
- `@family` tags group related functions
- `@examplesIf rlang::is_interactive()` prevents CRAN issues
- Cross-reference related functions with `[function_name()]`
- Order roxygen2 tags: `@description`, sections, `@examples`, `@param`, `@return`, `@seealso`, `@family`, `@export`.
- If multiple functions are documented in a single Rd file, use `@describeIn parent_function Description...` for all functions, including the parent function.

## Important Notes

**Bootstrap Version Compatibility**:
- Modern components (e.g., `value_box()`, `layout_column_wrap()`) require Bootstrap 5
- Components call `tag_require(tag, version = 5)` to enforce version requirements
- bslib provides Bootstrap 3/4 dependencies, but its components all target BS5+

**htmltools Dependency System**:
- Multiple components can declare the same dependency (e.g., Bootstrap CSS) - htmltools deduplicates automatically
- Dependencies can be added directly into any `tag` object or `tagList()`, you do not need to use `attachDependencies()` manually

**Common Gotchas**:
- TypeScript changes require `yarn build` before R package sees updates
- `inst/` directory contents are copied to package root during installation
- Sass variables use `$` prefix in Sass but `bs_theme()`/`bs_add_variables()` use R named arguments without `$`

## Resources

- **Package Website**: https://rstudio.github.io/bslib/
- **GitHub Repository**: https://github.com/rstudio/bslib
- **Key Articles** (on website):
  - [Theming](https://rstudio.github.io/bslib/articles/theming.html)
  - [Dashboards](https://rstudio.github.io/bslib/articles/dashboards.html)
  - [Cards](https://rstudio.github.io/bslib/articles/cards.html)
  - [Custom Components](https://rstudio.github.io/bslib/articles/custom-components.html)
- **README.md**: Quick start and installation
- **NEWS.md**: Changelog and release notes
- **Sass Package**: https://rstudio.github.io/sass/ (powers theming)
- **Bootstrap Documentation**: https://getbootstrap.com/ (underlying framework)

