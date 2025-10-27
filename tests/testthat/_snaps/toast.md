# toast() autohide_s throws for invalid values

    Code
      toast("Test", autohide_s = -5)
    Condition
      Error in `toast()`:
      ! `autohide_s` must be a single non-negative number or NA.
    Code
      toast("Test", autohide_s = "invalid")
    Condition
      Error in `toast()`:
      ! `autohide_s` must be a single non-negative number or NA.
    Code
      toast("Test", autohide_s = c(5, 10))
    Condition
      Error in `toast()`:
      ! `autohide_s` must be a single non-negative number or NA.

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

