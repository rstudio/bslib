# Package index

## Page Layouts

Page layouts are the basic building blocks of any UI. bslib pages always
include Bootstrap and can be themed with bslib’s [theming
capabilities](#theming).

### Dashboard layouts

These page layouts work best for dashboards. For a single-page
dashboards with an optional sidebar, try
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md).
For multi-tab dashboards organized as pages in a navbar, also with an
optional sidebar, try
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md).
For a full-page dashboard with items that fill the screen, try
[`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md).

- [`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
  : A sidebar page (i.e., dashboard)
- [`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
  : Multi-page app with a top navigation bar
- [`page_fillable()`](https://rstudio.github.io/bslib/dev/reference/page_fillable.md)
  : A screen-filling page layout

### Basic page layouts

bslib variants of classic Shiny page layouts.

- [`page()`](https://rstudio.github.io/bslib/dev/reference/page.md)
  [`page_fluid()`](https://rstudio.github.io/bslib/dev/reference/page.md)
  [`page_fixed()`](https://rstudio.github.io/bslib/dev/reference/page.md)
  : Modern Bootstrap page layouts

## User Interface Layouts

These functions help you layout the user interface (UI) elements of your
app.

### Multiple columns

Organize UI elements into Bootstrap’s [12-column CSS
grid](https://getbootstrap.com/docs/5.3/layout/css-grid/) with
[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md).
Or organize elements into a grid of equal-width columns with
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md).
Both functions can layout an arbitrary number of elements without
needing to specify the number of columns, but
[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)
can be used to create more complex layouts whereas
[`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
creates a grid of equal column and row sizes.

- [`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md)
  : Responsive 12-column grid layouts
- [`layout_column_wrap()`](https://rstudio.github.io/bslib/dev/reference/layout_column_wrap.md)
  : Column-first uniform grid layouts

### Multiple panels

Create tabbed sections of content. First, choose the style of navigation
container. Then add navigation panels or items to the container. You can
programmatically control or update the navigation containers with
server-side logic.

- [`navset_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  [`navset_pill()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  [`navset_underline()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  [`navset_pill_list()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  [`navset_hidden()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  [`navset_bar()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  [`navset_card_tab()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  [`navset_card_pill()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  [`navset_card_underline()`](https://rstudio.github.io/bslib/dev/reference/navset.md)
  : Navigation containers
- [`nav_panel()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  [`nav_panel_hidden()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  [`nav_menu()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  [`nav_item()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  [`nav_spacer()`](https://rstudio.github.io/bslib/dev/reference/nav-items.md)
  : Navigation items
- [`nav_select()`](https://rstudio.github.io/bslib/dev/reference/nav_select.md)
  [`nav_insert()`](https://rstudio.github.io/bslib/dev/reference/nav_select.md)
  [`nav_remove()`](https://rstudio.github.io/bslib/dev/reference/nav_select.md)
  [`nav_show()`](https://rstudio.github.io/bslib/dev/reference/nav_select.md)
  [`nav_hide()`](https://rstudio.github.io/bslib/dev/reference/nav_select.md)
  : Dynamically update nav containers
- [`navbar_options()`](https://rstudio.github.io/bslib/dev/reference/navbar_options.md)
  : Create a set of navbar options

### Sidebar layout

Place input controls or additional context in a sidebar next to the main
contents. Sidebar layouts combine well with [cards](#cards) and are
built into the
[`page_sidebar()`](https://rstudio.github.io/bslib/dev/reference/page_sidebar.md)
and
[`page_navbar()`](https://rstudio.github.io/bslib/dev/reference/page_navbar.md)
page layouts.

- [`sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  [`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  [`toggle_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md)
  : Sidebar layouts

## Components

bslib brings a collection of Bootstrap components to Shiny. These
components require the latest version of Bootstrap and work best when
used with the [page functions listed above](#page-layouts).

### Cards

Cards are a great way to group content into a single, contained unit.
Cards combine nicely with many other functions in bslib. They can be
added to [dashboard page layouts](#dashboard-layouts), laid out with
helpers like
[`layout_columns()`](https://rstudio.github.io/bslib/dev/reference/layout_columns.md),
or have sidebars when used with
[`layout_sidebar()`](https://rstudio.github.io/bslib/dev/reference/sidebar.md).
You can even create [tabbed card interfaces](#navigation) with the
`navset_card_*()` functions.

- [`card()`](https://rstudio.github.io/bslib/dev/reference/card.md) : A
  Bootstrap card component
- [`card_body()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  [`card_title()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  [`card_header()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  [`card_footer()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  [`card_image()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  [`as.card_item()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  [`is.card_item()`](https://rstudio.github.io/bslib/dev/reference/card_body.md)
  : Card items

### Value box

Value boxes are a special type of card that highlight a single piece of
information, optionally showcasing an icon or plot. They are often used
in [dashboard layouts](#dashboard-layouts) to highlight key metrics.

- [`value_box()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  [`value_box_theme()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  [`showcase_left_center()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  [`showcase_top_right()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  [`showcase_bottom()`](https://rstudio.github.io/bslib/dev/reference/value_box.md)
  : Value box

### Accordions

Create collapsible sections of content. Each collapsible section is
defined with
[`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
and the collection of sections are grouped together within an
[`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md).

- [`accordion()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
  [`accordion_panel()`](https://rstudio.github.io/bslib/dev/reference/accordion.md)
  : Create a vertically collapsing accordion
- [`accordion_panel_set()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
  [`accordion_panel_open()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
  [`accordion_panel_close()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
  [`accordion_panel_insert()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
  [`accordion_panel_remove()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
  [`accordion_panel_update()`](https://rstudio.github.io/bslib/dev/reference/accordion_panel_set.md)
  : Dynamically update accordions

### Tooltips, Popovers and Toasts

Provide details on demand. In general, tooltips are ephemeral and
provide a little extra information when the user hovers over or focuses
on an element. Popovers are more persistent and are triggered by a click
or via the keyboard. Popovers can include more content than tooltips –
even Shiny inputs and outputs! Toasts are small notification messages
that appear temporarily in a corner of the screen.

- [`tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
  [`toggle_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
  [`update_tooltip()`](https://rstudio.github.io/bslib/dev/reference/tooltip.md)
  : Add a tooltip to a UI element
- [`popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
  [`toggle_popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
  [`update_popover()`](https://rstudio.github.io/bslib/dev/reference/popover.md)
  : Add a popover to a UI element
- [`toast()`](https://rstudio.github.io/bslib/dev/reference/toast.md)
  [`toast_header()`](https://rstudio.github.io/bslib/dev/reference/toast.md)
  : Toast notifications
- [`show_toast()`](https://rstudio.github.io/bslib/dev/reference/show_toast.md)
  [`hide_toast()`](https://rstudio.github.io/bslib/dev/reference/show_toast.md)
  : Show or hide a toast notification

### Miscellaneous inputs

UI controls for capturing user input

- [`input_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  [`update_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  [`toggle_switch()`](https://rstudio.github.io/bslib/dev/reference/input_switch.md)
  : Switch input control

- [`input_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md)
  [`toggle_dark_mode()`](https://rstudio.github.io/bslib/dev/reference/input_dark_mode.md)
  : Dark mode input control

- [`input_submit_textarea()`](https://rstudio.github.io/bslib/dev/reference/input_submit_textarea.md)
  [`update_submit_textarea()`](https://rstudio.github.io/bslib/dev/reference/input_submit_textarea.md)
  : Create a textarea input control with explicit submission

- [`input_task_button()`](https://rstudio.github.io/bslib/dev/reference/input_task_button.md)
  [`update_task_button()`](https://rstudio.github.io/bslib/dev/reference/input_task_button.md)
  : Button for launching longer-running operations

- [`bind_task_button()`](https://rstudio.github.io/bslib/dev/reference/bind_task_button.md)
  :

  Bind `input_task_button` to `ExtendedTask`

## Theming

bslib provides a flexible interface for customizing Bootstrap themes.
You can create your own Bootstrap themes, customize existing themes, or
create dynamic themes that can even be modified at runtime.

### Create a Bootstrap theme

Tools for creating customized Bootstrap themes. Create your own, highly
customized theme, or use a preset theme – either built into bslib or
provided by [Bootswatch](https://bootswatch.com/).

- [`bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  [`bs_theme_update()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  [`is_bs_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_theme.md)
  : Create a Bootstrap theme
- [`bs_add_variables()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md)
  [`bs_add_rules()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md)
  [`bs_add_functions()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md)
  [`bs_add_mixins()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md)
  [`bs_bundle()`](https://rstudio.github.io/bslib/dev/reference/bs_bundle.md)
  : Add low-level theming customizations
- [`font_face`](https://rstudio.github.io/bslib/dev/reference/font_face.md)
  [`font_link`](https://rstudio.github.io/bslib/dev/reference/font_face.md)
  [`font_google`](https://rstudio.github.io/bslib/dev/reference/font_face.md)
  [`font_collection`](https://rstudio.github.io/bslib/dev/reference/font_face.md)
  : Helpers for importing web fonts

### Interactive theming

Preview and interactively modify Bootstrap themes. Use
[`bs_theme_preview()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_preview.md)
for a preview of your theme in a Shiny app with many example components.
Use
[`run_with_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md)
to run an existing Shiny app with the theme editor or
[`bs_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md)
to add the theme editor UI to your app or R Markdown document.

- [`bs_theme_preview()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_preview.md)
  : Preview a Bootstrap theme
- [`run_with_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md)
  [`bs_themer()`](https://rstudio.github.io/bslib/dev/reference/run_with_themer.md)
  : Theme customization UI

### Dynamic theming

For package developers or advanced app authors, bslib provides tools for
creating dynamically themable HTML widgets.

- [`bs_dependency()`](https://rstudio.github.io/bslib/dev/reference/bs_dependency.md)
  [`bs_dependency_defer()`](https://rstudio.github.io/bslib/dev/reference/bs_dependency.md)
  : Themeable HTML components
- [`bs_theme_dependencies()`](https://rstudio.github.io/bslib/dev/reference/bs_theme_dependencies.md)
  : Compile Bootstrap Sass with (optional) theming
- [`bs_current_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_current_theme.md)
  : Obtain the currently active theme at render time

### Global theme creation

Use Bootstrap themes globally.

- [`bs_global_theme()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  [`bs_global_set()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  [`bs_global_get()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  [`bs_global_clear()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  [`bs_global_add_variables()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  [`bs_global_add_rules()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  [`bs_global_bundle()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  [`bs_global_theme_update()`](https://rstudio.github.io/bslib/dev/reference/bs_global_theme.md)
  : Global theming

### Theme subsetting

Reduce the final CSS bundle size by removing unwanted portions of a Sass
bundle.

- [`bs_remove()`](https://rstudio.github.io/bslib/dev/reference/bs_remove.md)
  [`bs_retrieve()`](https://rstudio.github.io/bslib/dev/reference/bs_remove.md)
  : Remove or retrieve Sass code from a theme

## Utility Functions

### Fill items and fillable containers

Create and test for fill items and fillable containers.

- [`as_fill_carrier()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  [`as_fillable_container()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  [`as_fill_item()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  [`remove_all_fill()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  [`is_fill_carrier()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  [`is_fillable_container()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  [`is_fill_item()`](https://rstudio.github.io/bslib/dev/reference/as_fill_carrier.md)
  : Test and/or coerce fill behavior

### Theming utility functions

- [`bs_get_variables()`](https://rstudio.github.io/bslib/dev/reference/bs_get_variables.md)
  [`bs_get_contrast()`](https://rstudio.github.io/bslib/dev/reference/bs_get_variables.md)
  : Retrieve Sass variable values from the current theme

- [`theme_version()`](https://rstudio.github.io/bslib/dev/reference/theme_version.md)
  : Obtain a theme's Bootstrap version

- [`theme_bootswatch()`](https://rstudio.github.io/bslib/dev/reference/theme_bootswatch.md)
  : Obtain a theme's Bootswatch theme name

- [`bootswatch_themes()`](https://rstudio.github.io/bslib/dev/reference/bootswatch_themes.md)
  : Obtain a list of all available bootswatch themes.

- [`builtin_themes()`](https://rstudio.github.io/bslib/dev/reference/builtin_themes.md)
  :

  Obtain a list of all available built-in bslib themes.

- [`versions()`](https://rstudio.github.io/bslib/dev/reference/versions.md)
  [`version_default()`](https://rstudio.github.io/bslib/dev/reference/versions.md)
  : Available Bootstrap versions

### Other utility functions

- [`breakpoints()`](https://rstudio.github.io/bslib/dev/reference/breakpoints.md)
  : Define breakpoint values
