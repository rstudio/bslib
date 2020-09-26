## Upgrade Everything

Rather than individually run each update script and worry about the correct order, use the `tools/update_all.R` script:

``` shell
Rscript tools update_all.R
```


## Upgrading HTML dependencies

To upgrade or install the HTML dependencies that ship with this package, use the `tools/yarn_install.R` script:

``` shell
Rscript tools/yarn_install.R
```

**Warning:** Upgrading to a new major version of Bootstrap won't be as simple as running this R script. We'll cross that bridge when we get there.

## Local fonts

Bootswatch themes import remote google font urls by default. There is a script
to download all these fonts and ship them with the package...this script be run after the `yarn_install.R` script

``` shell
Rscript tools/fonts.R
```
