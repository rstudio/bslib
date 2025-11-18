# toast() validates position argument

    Code
      toast("Test", position = "invalid")
    Condition
      Error in `normalize_toast_position()`:
      ! Invalid toast position: 'invalid'. Must specify one vertical position (top, middle, bottom) and one horizontal position (left, center, right).

# toast() validates type argument

    Code
      toast("Test", type = "invalid")
    Condition
      Error in `toast()`:
      ! `type` must be one of "primary", "secondary", "success", "info", "warning", "danger", "error", "light", or "dark", not "invalid".

# toast() duration_s throws for invalid values

    Code
      toast("Test", duration_s = -5)
    Condition
      Error in `toast()`:
      ! `duration_s` must be a single non-negative number or NA.
    Code
      toast("Test", duration_s = "invalid")
    Condition
      Error in `toast()`:
      ! `duration_s` must be a single non-negative number or NA.
    Code
      toast("Test", duration_s = c(5, 10))
    Condition
      Error in `toast()`:
      ! `duration_s` must be a single non-negative number or NA.

# as.tags.bslib_toast creates proper HTML structure

    Code
      cat(format(tag))
    Output
      <div id="test-toast" class="toast text-bg-success" role="status" aria-live="polite" aria-atomic="true" body="Test message" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-header">
          <strong class="me-auto">Test</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body"></div>
      </div>

# as.tags.bslib_toast respects accessibility attributes

    Code
      cat(format(as.tags(t_danger)))
    Output
      <div id="danger-toast" class="toast text-bg-danger" role="alert" aria-live="assertive" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-body d-flex gap-2">
          <div class="toast-body-content flex-grow-1">Error message</div>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>

---

    Code
      cat(format(as.tags(t_info)))
    Output
      <div id="info-toast" class="toast text-bg-info" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-body d-flex gap-2">
          <div class="toast-body-content flex-grow-1">Info message</div>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>

---

    Code
      cat(format(as.tags(t_default)))
    Output
      <div id="default-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-body d-flex gap-2">
          <div class="toast-body-content flex-grow-1">Default message</div>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>

# as.tags.bslib_toast includes close button appropriately

    Code
      cat(format(as.tags(t_header)))
    Output
      <div id="header-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-header">
          <strong class="me-auto">Title</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">Message</div>
      </div>

---

    Code
      cat(format(as.tags(t_no_header)))
    Output
      <div id="no-header-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-body d-flex gap-2">
          <div class="toast-body-content flex-grow-1">Message</div>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>

---

    Code
      cat(format(as.tags(t_non_closable)))
    Output
      <div id="non-closable-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-body">Message</div>
      </div>

---

    Code
      cat(format(as.tags(t_manual)))
    Output
      <div id="manual-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-body">Message</div>
      </div>

# toast() icon renders in body without header

    Code
      cat(format(tag))
    Output
      <div id="icon-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-body d-flex gap-2">
          <span class="toast-body-icon">
            <span class="my-icon">&#9733;</span>
          </span>
          <div class="toast-body-content flex-grow-1">You have new messages</div>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>

# toast() icon renders in body with header

    Code
      cat(format(tag))
    Output
      <div id="icon-header-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-header">
          <strong class="me-auto">New Mail</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body d-flex gap-2">
          <span class="toast-body-icon">
            <span class="header-icon">&#9733;</span>
          </span>
          <div class="toast-body-content flex-grow-1">Message content</div>
        </div>
      </div>

# toast() icon works with closable button in body

    Code
      cat(format(tag))
    Output
      <div id="icon-closable-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-body d-flex gap-2">
          <span class="toast-body-icon">
            <span class="alert-icon">&#9733;</span>
          </span>
          <div class="toast-body-content flex-grow-1">Warning message</div>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>

# toast_header() icon renders in header

    Code
      cat(format(tag))
    Output
      <div id="header-icon-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-header">
          <span class="toast-header-icon">
            <span class="header-test-icon">&#9733;</span>
          </span>
          <strong class="me-auto ms-2">Notification</strong>
          <small class="text-muted text-end">now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">Body content</div>
      </div>

# toast_header() icon with status and title

    Code
      cat(format(tag))
    Output
      <div id="full-header-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-header">
          <span class="toast-header-icon">
            <span class="success-icon">✓</span>
          </span>
          <strong class="me-auto ms-2">Success</strong>
          <small class="text-muted text-end">just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">Operation completed</div>
      </div>

# toast with both header icon and body icon

    Code
      cat(format(tag))
    Output
      <div id="dual-icon-toast" class="toast" role="status" aria-live="polite" aria-atomic="true" data-require-bs-version="5" data-require-bs-caller="">
        <div class="toast-header">
          <span class="toast-header-icon">
            <span class="h-icon">H</span>
          </span>
          <strong class="me-auto ms-2">Title</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body d-flex gap-2">
          <span class="toast-body-icon">
            <span class="b-icon">B</span>
          </span>
          <div class="toast-body-content flex-grow-1">Message content</div>
        </div>
      </div>

# normalize_toast_position() errors on invalid input

    Code
      normalize_toast_position("top")
    Condition
      Error in `normalize_toast_position()`:
      ! Invalid toast position: 'top'. Must specify one vertical position (top, middle, bottom) and one horizontal position (left, center, right).
    Code
      normalize_toast_position("left")
    Condition
      Error in `normalize_toast_position()`:
      ! Invalid toast position: 'left'. Must specify one vertical position (top, middle, bottom) and one horizontal position (left, center, right).
    Code
      normalize_toast_position("top bottom left")
    Condition
      Error in `normalize_toast_position()`:
      ! Invalid toast position: 'top bottom left'. Must specify one vertical position (top, middle, bottom) and one horizontal position (left, center, right).
    Code
      normalize_toast_position(c("top", "bottom", "left"))
    Condition
      Error in `normalize_toast_position()`:
      ! Invalid toast position: 'top bottom left'. Must specify one vertical position (top, middle, bottom) and one horizontal position (left, center, right).
    Code
      normalize_toast_position("top invalid")
    Condition
      Error in `normalize_toast_position()`:
      ! Invalid toast position: 'top invalid'. Must specify one vertical position (top, middle, bottom) and one horizontal position (left, center, right).
    Code
      normalize_toast_position("foo bar")
    Condition
      Error in `normalize_toast_position()`:
      ! Invalid toast position: 'foo bar'. Must specify one vertical position (top, middle, bottom) and one horizontal position (left, center, right).

# show_toast() and hide_toast() warn if nothing to show/hide

    Code
      hide_toast(show_toast(toast(), session = session), session = session)
    Condition
      Warning:
      `toast` has no content; no toast to show.
      Warning:
      `id` is NULL; no toast to hide.

# hide_toast() works

    Code
      hide_toast(toast())
    Condition
      Error in `hide_toast()`:
      ! Cannot hide a toast without an ID. Provide the toast ID.

