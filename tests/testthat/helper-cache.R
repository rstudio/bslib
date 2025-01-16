# Turn off the default cache until the calling function exits; when that
# happens, the previous default cache will be restored.
local_disable_cache <- function(env = parent.frame()) {
  withr::local_options(
    list(sass.cache = FALSE),
    .local_envir = env
  )
}
