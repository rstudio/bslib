# PKbioanalysis (0.5.0)

* GitHub: <https://github.com/OmarAshkar/PKbioanalysis>
* Email: <mailto:omar.i.elashkar@gmail.com>
* GitHub mirror: <https://github.com/cran/PKbioanalysis>

Run `revdepcheck::revdep_details(, "PKbioanalysis")` for more info

## Newly broken

*   checking tests ...
     ```
       Running ‘testthat.R’
      ERROR
     Running the tests in ‘tests/testthat.R’ failed.
     Last 13 lines of output:
        25. │                                   │ ├─base::tryCatch(...)
        26. │                                   │ │ └─base (local) tryCatchList(expr, classes, parentenv, handlers)
        27. │                                   │ │   └─base (local) tryCatchOne(expr, names, parentenv, handlers[[1L]])
        28. │                                   │ │     └─base (local) doTryCatch(return(expr), name, parentenv, handler)
        29. │                                   │ └─base::withCallingHandlers(...)
        30. │                                   └─duckdb:::rapi_startup(dbdir, readonly, configsexp, environment_scan)
        31. ├─duckdb (local) `<fn>`("rapi_startup", "{\"exception_type\":\"IO\",\"exception_message\":\"Could not set lock on file \\\"/Users/elizabethnelson/Library/Application Support/org.R-project.R/R/PKbioanalysis/samples.db\\\": Conflicting lock is held in /Library/Frameworks/R.framework/Versions/4.5-arm64/Resources/bin/exec/R (PID 65088) by user elizabethnelson. See also https://duckdb.org/docs/stable/connect/concurrency\",\"errno\":\"35\"}")
        32. │ └─rlang::abort(error_parts, class = "duckdb_error", !!!fields)
        33. │   └─rlang:::signal_abort(cnd, .file)
        34. │     └─base::signalCondition(cnd)
        35. └─rlang (local) `<fn>`(`<dckdb_rr>`)
        36.   └─handlers[[1L]](cnd)
        37.     └─duckdb:::rethrow_error_from_rapi(e, call)
        38.       └─rlang::abort(msg, call = call)
       Execution halted
     ```

## In both

*   checking dependencies in R code ... NOTE
     ```
     Namespace in Imports field not imported from: ‘htmlwidgets’
       All declared Imports should be used.
     ```

