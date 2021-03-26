# bslib 0.2.4.9000

* Closed #231: Upgraded from Bootstrap 4.5.3 to 4.6.0 (#254).
* Closed #251: Added new BS4 Sass variables, `$navbar-light-bg` and `$navbar-dark-bg`, for more easily customizing the navbar's background color (#253)
* Closed #256 and #282: Font importing helpers (`font_google()`, `font_link()`, and `font_face()`) are now re-exported from the `{sass}` package (as well as a new `font_collection()` function for a more convenient way to specify font fallbacks). As a result, these functions can now be used with any Sass variable as any Sass variable (see #282 for example usage) as well as inside Rmd yaml without `!expr` (see #256 for example usage). (#291)
* Closed #236, #230, #242, #187, #215, #250: Addressed various cosmetic issues with CSS (#249). 
* Closed #227: bs_themer() now overlays a spinner during Sass compilation (#243).
* Closed #289: collapsed navbar toggle now correctly floats to the right (#290) 
* Closed rstudio/flexdashboard#316: fixed an issue with navbar nav spacing/alignment (#286).

# bslib 0.2.4

* Initial release of the package, see https://rstudio.github.io/bslib/
