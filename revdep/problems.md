# OmopViewer (0.6.0)

* GitHub: <https://github.com/ohdsi/OmopViewer>
* Email: <mailto:marti.catalasabate@ndorms.ox.ac.uk>
* GitHub mirror: <https://github.com/cran/OmopViewer>

Run `revdepcheck::cloud_details(, "OmopViewer")` for more info

## Newly broken

*   checking tests ... ERROR
     ```
     ...
       [ FAIL 1 | WARN 0 | SKIP 6 | PASS 65 ]
       
       ══ Skipped tests (6) ═══════════════════════════════════════════════════════════
       • On CRAN (5): 'test-packagesSupported.R:2:3', 'test-appStatic.R:1:1',
         'test-appStatic.R:37:1', 'test-appStatic.R:51:1', 'test-appStatic.R:71:3'
       • manual test (1): 'test-functions.R:3:3'
       
       ══ Failed tests ════════════════════════════════════════════════════════════════
       ── Error ('test-appStatic.R:183:3'): theme ─────────────────────────────────────
       <rlib_error_package_not_found/rlang_error/error/condition>
       Error in `brand_resolve(brand)`: The package "brand.yml" is required.
       Backtrace:
           ▆
        1. ├─testthat::expect_identical(...) at test-appStatic.R:183:3
        2. │ └─testthat::quasi_label(enquo(object), label)
        3. │   └─rlang::eval_bare(expr, quo_get_env(quo))
        4. └─bslib::bs_theme(brand = validateTheme(NULL))
        5.   ├─bslib:::brand_resolve(brand)
        6.   └─bslib:::brand_resolve.list(brand)
        7.     └─rlang::check_installed("brand.yml")
       
       [ FAIL 1 | WARN 0 | SKIP 6 | PASS 65 ]
       Error:
       ! Test failures.
       Execution halted
     ```

# qrlabelr (0.2.0)

* GitHub: <https://github.com/awkena/qrlabelr>
* Email: <mailto:alex.kena24@gmail.com>
* GitHub mirror: <https://github.com/cran/qrlabelr>

Run `revdepcheck::cloud_details(, "qrlabelr")` for more info

## Newly broken

*   checking whether package ‘qrlabelr’ can be installed ... WARNING
     ```
     Found the following significant warnings:
       Warning: replacing previous import ‘bslib::show_toast’ by ‘shinyWidgets::show_toast’ when loading ‘qrlabelr’
     See ‘/tmp/workdir/qrlabelr/new/qrlabelr.Rcheck/00install.out’ for details.
     ```

## In both

*   checking DESCRIPTION meta-information ... NOTE
     ```
       Missing dependency on R >= 4.2.0 because package code uses the pipe
       placeholder syntax added in R 4.2.0.
       File(s) using such syntax:
         ‘all_new_functions.R’
     ```

# tfrmtbuilder (0.1.0)

* GitHub: <https://github.com/GSK-Biostatistics/tfrmtbuilder>
* Email: <mailto:becca.z.krouse@gsk.com>
* GitHub mirror: <https://github.com/cran/tfrmtbuilder>

Run `revdepcheck::cloud_details(, "tfrmtbuilder")` for more info

## Newly broken

*   checking whether package ‘tfrmtbuilder’ can be installed ... WARNING
     ```
     Found the following significant warnings:
       Warning: replacing previous import ‘bslib::show_toast’ by ‘shinyWidgets::show_toast’ when loading ‘tfrmtbuilder’
     See ‘/tmp/workdir/tfrmtbuilder/new/tfrmtbuilder.Rcheck/00install.out’ for details.
     ```

