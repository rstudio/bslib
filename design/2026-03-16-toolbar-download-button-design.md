# toolbar_download_button() Design Spec

**Date:** 2026-03-16
**Issue:** https://github.com/rstudio/bslib/issues/1292
**Status:** Approved

## Summary

Add `toolbar_download_button()` to bslib's toolbar component family, providing a download button styled consistently with other toolbar inputs for use in card headers, footers, and other toolbar contexts.

## Motivation

Users want an elegant way to add download functionality to card toolbars. Currently, using Shiny's `downloadButton()` in a toolbar requires manual styling workarounds (adding classes, inline styles, and ARIA attributes). A dedicated `toolbar_download_button()` would provide first-class support with proper styling and accessibility out of the box.

## Design

### Function Signature

```r
toolbar_download_button <- function(
  outputId,
  label = "Download",
  icon = shiny::icon("download"),
  show_label = FALSE,
  tooltip = !show_label,
  ...,
  disabled = FALSE,
  border = FALSE
)
```

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `outputId` | character | required | The download output ID (connects to `downloadHandler` in server) |
| `label` | character/tag | `"Download"` | Button label text; used for tooltip when `show_label = FALSE` |
| `icon` | icon | `shiny::icon("download")` | Icon to display; can be overridden with custom icon |
| `show_label` | logical | `FALSE` | Whether to show label text (icon-only by default) |
| `tooltip` | logical/character | `!show_label` | Tooltip behavior; `TRUE` shows label as tooltip, `FALSE` disables, or custom string |
| `...` | | | Additional HTML attributes passed to the `<a>` tag |
| `disabled` | logical | `FALSE` | Initial disabled state. Since `<a>` tags have no native `disabled` attribute, this adds `class="disabled"`, `aria-disabled="true"`, and `tabindex="-1"` |
| `border` | logical | `FALSE` | Show border around button |

#### Return Value

An `<a>` tag suitable for use in a `toolbar()`, styled to match other toolbar components.

### HTML Structure

The generated HTML follows the same accessibility patterns as `toolbar_input_button()`:

```html
<!-- With tooltip (show_label = FALSE) -->
<bslib-tooltip id="dl_btn_tooltip" placement="bottom">
  <template>Download</template>
  <a id="dl_btn"
     class="bslib-toolbar-download-button btn btn-sm shiny-download-link border-0"
     href=""
     target="_blank"
     download
     data-type="icon"
     aria-labelledby="btn-label-1234">
    <span class="action-icon">
      <span class="bslib-toolbar-icon" aria-hidden="true" style="pointer-events: none">
        <i class="fa fa-download" role="presentation" aria-label="download icon"></i>
      </span>
    </span>
    <span class="action-label">
      <span id="btn-label-1234" class="bslib-toolbar-label" hidden>
        Download
      </span>
    </span>
  </a>
</bslib-tooltip>
```

Key structural decisions:
- **Built directly with `tags$a()`** - NOT wrapping `shiny::downloadButton()` or `shiny::actionButton()`. We construct the `<a>` tag from scratch to have full control over structure.
- Uses `bslib-toolbar-download-button` class (new) plus `shiny-download-link` (Shiny's download machinery)
- Nested `span.action-icon > span.bslib-toolbar-icon` and `span.action-label > span.bslib-toolbar-label` - These wrappers are added manually to match the structure that `actionButton()` generates for `toolbar_input_button`, ensuring CSS rules apply consistently to both. The `aria-hidden` and `style` attributes go on the inner `.bslib-toolbar-icon` span, matching the pattern from `toolbar_input_button()` (see R/toolbar.R:430-435).
- Same `data-type` attribute pattern (`"icon"`, `"label"`, `"both"`) for CSS targeting
- `aria-labelledby` points to the label span for screen reader support
- Tooltip wrapper follows same pattern as `toolbar_input_button`

### Update Function

```r
update_toolbar_download_button <- function(
  outputId,
  disabled = NULL,
  session = get_current_session()
)
```

Supports updating only the `disabled` state (not label/icon), as download buttons rarely need dynamic updates beyond enable/disable.

#### Implementation Pattern

Follows the same pattern as `toolbar_input_button` and bslib's tooltip/popover components:

**R side:**
```r
update_toolbar_download_button <- function(
  outputId,
  disabled = NULL,
  session = get_current_session()
) {
  message <- dropNulls(list(disabled = disabled))
  session$sendInputMessage(outputId, message)
}
```

**TypeScript side:** A minimal input binding that handles `receiveMessage`:

```typescript
class BslibToolbarDownloadButtonBinding extends InputBinding {
  find(scope: HTMLElement) {
    return $(scope).find(".bslib-toolbar-download-button");
  }

  getValue(el: HTMLElement) {
    return null; // Not used as input
  }

  receiveMessage(el: HTMLElement, message: { disabled?: boolean }) {
    if (hasDefinedProperty(message, "disabled")) {
      if (message.disabled) {
        el.classList.add("disabled");
        el.setAttribute("aria-disabled", "true");
        el.setAttribute("tabindex", "-1");
      } else {
        el.classList.remove("disabled");
        el.removeAttribute("aria-disabled");
        el.removeAttribute("tabindex");
      }
    }
  }
}

registerBinding(BslibToolbarDownloadButtonBinding, "toolbar-download-button");
```

**Why this works:** This pattern (input binding for a non-input component) is established precedent in bslib. Both `BslibTooltip` and `BslibPopover` set `static isShinyInput = true` to enable `sendInputMessage()` for server-to-client updates, even though they're not traditional inputs. Similarly, `toolbar_input_button` uses a standalone `InputBinding` class (see `toolbarInputButton.ts`). We follow the same standalone binding approach here.

## Usage Example

```r
library(shiny)
library(bslib)

ui <- page_fluid(
  card(
    card_header(
      "Flower Data",
      toolbar(
        align = "right",
        toolbar_download_button("download_data", label = "Download")
      )
    ),
    card_body(
      reactable::reactable(iris)
    )
  )
)

server <- function(input, output, session) {
  output$download_data <- downloadHandler(
    filename = function() {
      paste("iris-", Sys.Date(), ".csv", sep = "")
    },
    content = function(file) {
      write.csv(iris, file, row.names = FALSE)
    }
  )
}

shinyApp(ui, server)
```

## Files to Modify/Create

| File | Action | Description |
|------|--------|-------------|
| `R/toolbar.R` | Modify | Add `toolbar_download_button()` and `update_toolbar_download_button()` |
| `srcts/src/components/toolbarDownloadButton.ts` | Create | New input binding for update handling |
| `inst/components/scss/toolbar.scss` | Modify | Update `data-type` attribute selectors (lines ~71, ~78, ~85) to include `.bslib-toolbar-download-button` alongside `.bslib-toolbar-input-button`. Base button styles use Bootstrap `.btn` classes. |
| `tests/testthat/test-toolbar.R` | Modify | Add tests for new functions |
| `man/toolbar_download_button.Rd` | Generated | Roxygen-generated documentation |
| `NAMESPACE` | Generated | Export new functions |

## Testing Plan

**Unit tests (automated):**
1. **Snapshot test** - Verify HTML structure matches expected output
2. **Parameter validation** - Test that `outputId` is required, label defaults work
3. **Tooltip behavior** - Test tooltip is added when `show_label = FALSE`, not added when `show_label = TRUE`
4. **Border/disabled states** - Test class application
5. **Icon override** - Test custom icon replaces default

**Integration test (manual):**
6. **Download functionality** - Manual verification that download works in a Shiny app. Automated download testing is complex due to browser security restrictions; manual testing via the example app (`shiny::runExample("toolbar", package = "bslib")`) is sufficient.

## Accessibility

- `aria-labelledby` points to label span for screen reader support
- Tooltip provides accessible name when label is visually hidden
- Disabled state uses both `disabled` class and `aria-disabled="true"`
- Icon wrapped with `aria-hidden="true"` to prevent duplicate announcements

## Alternatives Considered

**Custom Download Input Binding:** Create a `<button>` element with a custom TypeScript binding that triggers downloads via JavaScript. Rejected because it reinvents Shiny's download handling and fights the framework (downloads are outputs, not inputs).

**No Update Function:** Skip update functionality entirely. Rejected because controlling enabled/disabled state is useful for download buttons (e.g., disable until data is ready).

## Open Questions

None - design is complete and approved.
