
# bootscss

Tools for obtaining bootstrap CSS and customizing it via SASS.

## Installation

bootscss isn’t yet available from CRAN, but you can install with:

``` r
remotes::install_github("rstudio/bootscss")
```

## Get started

See the following help page:

``` r
library(bootscss)
?bs4_sass
```

## Development

Bootswatch themes import google font urls by default. There is a script
to download all these fonts and ship them with the package

``` shell
Rscript tools/bootswatch_fonts.R
```

Each bootswatch theme also ships with full
bootstrap.css/bootstrap.min.css. So to keep the size of the package
down, we do:

``` shell
Rscript tools/bootswatch_downsize.R
```
