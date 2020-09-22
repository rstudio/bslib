# Turn off the default cache until the calling function exits; when that
# happens, the previous default cache will be restored.
local_disable_cache <- function(env = parent.frame()) {
  old_opts <- options(sass.cache = FALSE)
  withr::defer(
    options(old_opts),
    envir = env
  )
}
