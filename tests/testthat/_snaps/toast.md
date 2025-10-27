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

