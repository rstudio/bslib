## Upgrading HTML dependencies

To upgrade or install the HTML dependencies that ship with this package, use the `tools/yarn_install.R` script:

``` shell
Rscript tools/yarn_install.R
```

**Warning:** Upgrading to a new major version of Bootstrap won't be as simple as running this R script. We'll cross that bridge when we get there.
Note that after upgrading Bootstrap, you should generate the precompiled CSS files by running the precompile-css.R script in this directory. (Eventually this step should be added to the Bootstrap upgrade script.)

## Local fonts

Bootswatch themes import remote google font urls by default. There is a script
to download all these fonts and ship them with the package...this script be run after the `yarn_install.R` script

``` shell
Rscript tools/fonts.R
```
