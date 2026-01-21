## revdepcheck results

We checked 141 reverse dependencies, comparing R CMD check results across CRAN and dev versions of this package.

 * We saw 3 new problems
 * We failed to check 0 packages

Issues with CRAN packages are summarised below.

### New problems

This version of bslib introduces a new function `show_toast()`, which conflicts with a function of the same name in the shinyWidgets package. Several packages on CRAN fully import both the bslib and shinyWidgets namespaces, leading to warnings during installation about the function name conflict.

* PKbioanalysis: emailed maintainer Omar Ashkar on 2025-12-19, maintainer confirmed awareness and willingness to address in a future release on the same day.

* qrlabelr: Submitted a patch to fix this on 2025-12-19, awaiting maintainer response. https://github.com/awkena/qrlabelr/pull/4

* tfrmtbuilder: Submitted a patch to fix this on 2025-12-19, awaiting maintainer response. https://github.com/GSK-Biostatistics/tfrmtbuilder/pull/91

