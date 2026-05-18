# aifeducation (1.1.5)

* GitHub: <https://github.com/FBerding/aifeducation>
* Email: <mailto:florian.berding@uni-hamburg.de>
* GitHub mirror: <https://github.com/cran/aifeducation>

Run `revdepcheck::revdep_details(, "aifeducation")` for more info

## In both

*   checking whether package ‘aifeducation’ can be installed ... ERROR
     ```
     Installation failed.
     See ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/aifeducation/new/aifeducation.Rcheck/00install.out’ for details.
     ```

## Installation

### Devel

```
* installing *source* package ‘aifeducation’ ...
** this is package ‘aifeducation’ version ‘1.1.5’
** package ‘aifeducation’ successfully unpacked and MD5 sums checked
** using staged installation
** libs
using C++ compiler: ‘Apple clang version 17.0.0 (clang-1700.6.4.2)’
using SDK: ‘MacOSX26.2.sdk’
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c KNNOR.cpp -o KNNOR.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c RcppExports.cpp -o RcppExports.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c aux_fcts.cpp -o aux_fcts.o
clang++ -arch arm64 -std=gnu++17 -dynamiclib -Wl,-headerpad_max_install_names -undefined dynamic_lookup -L/Library/Frameworks/R.framework/Resources/lib -L/opt/R/arm64/lib -o aifeducation.so KNNOR.o RcppExports.o aux_fcts.o -L/Library/Frameworks/R.framework/Resources/lib -lRlapack -L/Library/Frameworks/R.framework/Resources/lib -lRblas -L/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0 -L/opt/gfortran/lib -lemutls_w -lheapt_w -lgfortran -lquadmath -F/Library/Frameworks/R.framework/.. -framework R
ld: warning: search path '/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0' not found
ld: warning: search path '/opt/gfortran/lib' not found
ld: library 'emutls_w' not found
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [aifeducation.so] Error 1
ERROR: compilation failed for package ‘aifeducation’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/aifeducation/new/aifeducation.Rcheck/aifeducation’


```
### CRAN

```
* installing *source* package ‘aifeducation’ ...
** this is package ‘aifeducation’ version ‘1.1.5’
** package ‘aifeducation’ successfully unpacked and MD5 sums checked
** using staged installation
** libs
using C++ compiler: ‘Apple clang version 17.0.0 (clang-1700.6.4.2)’
using SDK: ‘MacOSX26.2.sdk’
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c KNNOR.cpp -o KNNOR.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c RcppExports.cpp -o RcppExports.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/aifeducation/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c aux_fcts.cpp -o aux_fcts.o
clang++ -arch arm64 -std=gnu++17 -dynamiclib -Wl,-headerpad_max_install_names -undefined dynamic_lookup -L/Library/Frameworks/R.framework/Resources/lib -L/opt/R/arm64/lib -o aifeducation.so KNNOR.o RcppExports.o aux_fcts.o -L/Library/Frameworks/R.framework/Resources/lib -lRlapack -L/Library/Frameworks/R.framework/Resources/lib -lRblas -L/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0 -L/opt/gfortran/lib -lemutls_w -lheapt_w -lgfortran -lquadmath -F/Library/Frameworks/R.framework/.. -framework R
ld: warning: search path '/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0' not found
ld: warning: search path '/opt/gfortran/lib' not found
ld: library 'emutls_w' not found
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [aifeducation.so] Error 1
ERROR: compilation failed for package ‘aifeducation’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/aifeducation/old/aifeducation.Rcheck/aifeducation’


```
# DT2 (0.1.1)

* GitHub: <https://github.com/StrategicProjects/DT2>
* Email: <mailto:leite@castlab.org>
* GitHub mirror: <https://github.com/cran/DT2>

Run `revdepcheck::revdep_details(, "DT2")` for more info

## In both

*   R CMD check timed out


# esquisse (2.1.0)

* GitHub: <https://github.com/dreamRs/esquisse>
* Email: <mailto:victor.perrier@dreamrs.fr>
* GitHub mirror: <https://github.com/cran/esquisse>

Run `revdepcheck::revdep_details(, "esquisse")` for more info

## In both

*   R CMD check timed out


# geocmeans (0.3.4)

* GitHub: <https://github.com/JeremyGelb/geocmeans>
* Email: <mailto:jeremy.gelb@ucs.inrs.ca>
* GitHub mirror: <https://github.com/cran/geocmeans>

Run `revdepcheck::revdep_details(, "geocmeans")` for more info

## In both

*   checking whether package ‘geocmeans’ can be installed ... ERROR
     ```
     Installation failed.
     See ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/geocmeans/new/geocmeans.Rcheck/00install.out’ for details.
     ```

## Installation

### Devel

```
* installing *source* package ‘geocmeans’ ...
** this is package ‘geocmeans’ version ‘0.3.4’
** package ‘geocmeans’ successfully unpacked and MD5 sums checked
** using staged installation
** libs
using C++ compiler: ‘Apple clang version 17.0.0 (clang-1700.6.4.2)’
using C++17
using SDK: ‘MacOSX26.2.sdk’
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geocmeans/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geocmeans/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c FCM_functions.cpp -o FCM_functions.o
FCM_functions.cpp:211:9: warning: unused variable 'k' [-Wunused-variable]
...
14 warnings generated.
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geocmeans/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geocmeans/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c shared_functions.cpp -o shared_functions.o
clang++ -arch arm64 -std=gnu++17 -dynamiclib -Wl,-headerpad_max_install_names -undefined dynamic_lookup -L/Library/Frameworks/R.framework/Resources/lib -L/opt/R/arm64/lib -o geocmeans.so FCM_functions.o GFCM_functions.o RcppExports.o focal_cpp.o jaccard_idx.o moran_for_rasters.o shared_functions.o -L/Library/Frameworks/R.framework/Resources/lib -lRlapack -L/Library/Frameworks/R.framework/Resources/lib -lRblas -L/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0 -L/opt/gfortran/lib -lemutls_w -lheapt_w -lgfortran -lquadmath -F/Library/Frameworks/R.framework/.. -framework R
ld: warning: search path '/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0' not found
ld: warning: search path '/opt/gfortran/lib' not found
ld: library 'emutls_w' not found
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [geocmeans.so] Error 1
ERROR: compilation failed for package ‘geocmeans’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/geocmeans/new/geocmeans.Rcheck/geocmeans’


```
### CRAN

```
* installing *source* package ‘geocmeans’ ...
** this is package ‘geocmeans’ version ‘0.3.4’
** package ‘geocmeans’ successfully unpacked and MD5 sums checked
** using staged installation
** libs
using C++ compiler: ‘Apple clang version 17.0.0 (clang-1700.6.4.2)’
using C++17
using SDK: ‘MacOSX26.2.sdk’
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geocmeans/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geocmeans/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c FCM_functions.cpp -o FCM_functions.o
FCM_functions.cpp:211:9: warning: unused variable 'k' [-Wunused-variable]
...
14 warnings generated.
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geocmeans/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geocmeans/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c shared_functions.cpp -o shared_functions.o
clang++ -arch arm64 -std=gnu++17 -dynamiclib -Wl,-headerpad_max_install_names -undefined dynamic_lookup -L/Library/Frameworks/R.framework/Resources/lib -L/opt/R/arm64/lib -o geocmeans.so FCM_functions.o GFCM_functions.o RcppExports.o focal_cpp.o jaccard_idx.o moran_for_rasters.o shared_functions.o -L/Library/Frameworks/R.framework/Resources/lib -lRlapack -L/Library/Frameworks/R.framework/Resources/lib -lRblas -L/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0 -L/opt/gfortran/lib -lemutls_w -lheapt_w -lgfortran -lquadmath -F/Library/Frameworks/R.framework/.. -framework R
ld: warning: search path '/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0' not found
ld: warning: search path '/opt/gfortran/lib' not found
ld: library 'emutls_w' not found
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [geocmeans.so] Error 1
ERROR: compilation failed for package ‘geocmeans’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/geocmeans/old/geocmeans.Rcheck/geocmeans’


```
# geommc (1.3.2)

* GitHub: <https://github.com/vroys/geommc>
* Email: <mailto:vroy@iastate.edu>
* GitHub mirror: <https://github.com/cran/geommc>

Run `revdepcheck::revdep_details(, "geommc")` for more info

## In both

*   checking whether package ‘geommc’ can be installed ... ERROR
     ```
     Installation failed.
     See ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/geommc/new/geommc.Rcheck/00install.out’ for details.
     ```

## Installation

### Devel

```
* installing *source* package ‘geommc’ ...
** this is package ‘geommc’ version ‘1.3.2’
** package ‘geommc’ successfully unpacked and MD5 sums checked
** using staged installation
** libs
using C++ compiler: ‘Apple clang version 17.0.0 (clang-1700.6.4.2)’
using SDK: ‘MacOSX26.2.sdk’
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c RcppExports.cpp -o RcppExports.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c armanormauxfns.cpp -o armanormauxfns.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c logp_vs_in.cpp -o logp_vs_in.o
...
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c matrix_manip.cpp -o matrix_manip.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c rw_mc.cpp -o rw_mc.o
clang++ -arch arm64 -std=gnu++17 -dynamiclib -Wl,-headerpad_max_install_names -undefined dynamic_lookup -L/Library/Frameworks/R.framework/Resources/lib -L/opt/R/arm64/lib -o geommc.so RcppExports.o armanormauxfns.o logp_vs_in.o matrix_manip.o rw_mc.o -L/Library/Frameworks/R.framework/Resources/lib -lRlapack -L/Library/Frameworks/R.framework/Resources/lib -lRblas -L/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0 -L/opt/gfortran/lib -lemutls_w -lheapt_w -lgfortran -lquadmath -F/Library/Frameworks/R.framework/.. -framework R
ld: warning: search path '/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0' not found
ld: warning: search path '/opt/gfortran/lib' not found
ld: library 'emutls_w' not found
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [geommc.so] Error 1
ERROR: compilation failed for package ‘geommc’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/geommc/new/geommc.Rcheck/geommc’


```
### CRAN

```
* installing *source* package ‘geommc’ ...
** this is package ‘geommc’ version ‘1.3.2’
** package ‘geommc’ successfully unpacked and MD5 sums checked
** using staged installation
** libs
using C++ compiler: ‘Apple clang version 17.0.0 (clang-1700.6.4.2)’
using SDK: ‘MacOSX26.2.sdk’
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c RcppExports.cpp -o RcppExports.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c armanormauxfns.cpp -o armanormauxfns.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c logp_vs_in.cpp -o logp_vs_in.o
...
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c matrix_manip.cpp -o matrix_manip.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/geommc/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c rw_mc.cpp -o rw_mc.o
clang++ -arch arm64 -std=gnu++17 -dynamiclib -Wl,-headerpad_max_install_names -undefined dynamic_lookup -L/Library/Frameworks/R.framework/Resources/lib -L/opt/R/arm64/lib -o geommc.so RcppExports.o armanormauxfns.o logp_vs_in.o matrix_manip.o rw_mc.o -L/Library/Frameworks/R.framework/Resources/lib -lRlapack -L/Library/Frameworks/R.framework/Resources/lib -lRblas -L/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0 -L/opt/gfortran/lib -lemutls_w -lheapt_w -lgfortran -lquadmath -F/Library/Frameworks/R.framework/.. -framework R
ld: warning: search path '/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0' not found
ld: warning: search path '/opt/gfortran/lib' not found
ld: library 'emutls_w' not found
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [geommc.so] Error 1
ERROR: compilation failed for package ‘geommc’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/geommc/old/geommc.Rcheck/geommc’


```
# ISAnalytics (1.20.1)

* GitHub: <https://github.com/calabrialab/ISAnalytics>
* Email: <mailto:gazzo.francesco@hsr.it>

Run `revdepcheck::revdep_details(, "ISAnalytics")` for more info

## In both

*   R CMD check timed out


# kgraph (1.2.0)

* Email: <mailto:charlon@protonmail.com>
* GitHub mirror: <https://github.com/cran/kgraph>

Run `revdepcheck::revdep_details(, "kgraph")` for more info

## In both

*   R CMD check timed out


# kuzco (0.1.0)

* GitHub: <https://github.com/frankiethull/kuzco>
* Email: <mailto:frankiethull@gmail.com>
* GitHub mirror: <https://github.com/cran/kuzco>

Run `revdepcheck::revdep_details(, "kuzco")` for more info

## In both

*   checking whether package ‘kuzco’ can be installed ... ERROR
     ```
     Installation failed.
     See ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/kuzco/new/kuzco.Rcheck/00install.out’ for details.
     ```

## Installation

### Devel

```
* installing *source* package ‘kuzco’ ...
** this is package ‘kuzco’ version ‘0.1.0’
** package ‘kuzco’ successfully unpacked and MD5 sums checked
** using staged installation
** R
** inst
** byte-compile and prepare package for lazy loading
Error in dyn.load(file, DLLpath = DLLpath, ...) : 
  unable to load shared object '/Users/elizabethnelson/repos/bslib/revdep/library.noindex/kuzco/imager/libs/imager.so':
  dlopen(/Users/elizabethnelson/repos/bslib/revdep/library.noindex/kuzco/imager/libs/imager.so, 0x0006): Library not loaded: /opt/X11/lib/libX11.6.dylib
  Referenced from: <999B5DAC-9F0C-3A99-9E95-70D3ACDFEE77> /Users/elizabethnelson/repos/bslib/revdep/library.noindex/kuzco/imager/libs/imager.so
  Reason: tried: '/opt/X11/lib/libX11.6.dylib' (no such file), '/System/Volumes/Preboot/Cryptexes/OS/opt/X11/lib/libX11.6.dylib' (no such file), '/opt/X11/lib/libX11.6.dylib' (no such file), '/Library/Frameworks/R.framework/Resources/lib/libX11.6.dylib' (no such file), '/Library/Java/JavaVirtualMachines/jdk-11.0.18+10/Contents/Home/lib/server/libX11.6.dylib' (no such file)
Calls: <Anonymous> ... asNamespace -> loadNamespace -> library.dynam -> dyn.load
Execution halted
ERROR: lazy loading failed for package ‘kuzco’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/kuzco/new/kuzco.Rcheck/kuzco’


```
### CRAN

```
* installing *source* package ‘kuzco’ ...
** this is package ‘kuzco’ version ‘0.1.0’
** package ‘kuzco’ successfully unpacked and MD5 sums checked
** using staged installation
** R
** inst
** byte-compile and prepare package for lazy loading
Error in dyn.load(file, DLLpath = DLLpath, ...) : 
  unable to load shared object '/Users/elizabethnelson/repos/bslib/revdep/library.noindex/kuzco/imager/libs/imager.so':
  dlopen(/Users/elizabethnelson/repos/bslib/revdep/library.noindex/kuzco/imager/libs/imager.so, 0x0006): Library not loaded: /opt/X11/lib/libX11.6.dylib
  Referenced from: <999B5DAC-9F0C-3A99-9E95-70D3ACDFEE77> /Users/elizabethnelson/repos/bslib/revdep/library.noindex/kuzco/imager/libs/imager.so
  Reason: tried: '/opt/X11/lib/libX11.6.dylib' (no such file), '/System/Volumes/Preboot/Cryptexes/OS/opt/X11/lib/libX11.6.dylib' (no such file), '/opt/X11/lib/libX11.6.dylib' (no such file), '/Library/Frameworks/R.framework/Resources/lib/libX11.6.dylib' (no such file), '/Library/Java/JavaVirtualMachines/jdk-11.0.18+10/Contents/Home/lib/server/libX11.6.dylib' (no such file)
Calls: <Anonymous> ... asNamespace -> loadNamespace -> library.dynam -> dyn.load
Execution halted
ERROR: lazy loading failed for package ‘kuzco’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/kuzco/old/kuzco.Rcheck/kuzco’


```
# lakhesis (1.1)

* Email: <mailto:sce@utk.edu>
* GitHub mirror: <https://github.com/cran/lakhesis>

Run `revdepcheck::revdep_details(, "lakhesis")` for more info

## In both

*   checking whether package ‘lakhesis’ can be installed ... ERROR
     ```
     Installation failed.
     See ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/lakhesis/new/lakhesis.Rcheck/00install.out’ for details.
     ```

## Installation

### Devel

```
* installing *source* package ‘lakhesis’ ...
** this is package ‘lakhesis’ version ‘1.1’
** package ‘lakhesis’ successfully unpacked and MD5 sums checked
** using staged installation
** libs
using C++ compiler: ‘Apple clang version 17.0.0 (clang-1700.6.4.2)’
using C++17
using SDK: ‘MacOSX26.2.sdk’
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/lakhesis/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/lakhesis/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c RcppExports.cpp -o RcppExports.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/lakhesis/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/lakhesis/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c lakhesis.cpp -o lakhesis.o
clang++ -arch arm64 -std=gnu++17 -dynamiclib -Wl,-headerpad_max_install_names -undefined dynamic_lookup -L/Library/Frameworks/R.framework/Resources/lib -L/opt/R/arm64/lib -o lakhesis.so RcppExports.o lakhesis.o -L/Library/Frameworks/R.framework/Resources/lib -lRlapack -L/Library/Frameworks/R.framework/Resources/lib -lRblas -L/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0 -L/opt/gfortran/lib -lemutls_w -lheapt_w -lgfortran -lquadmath -F/Library/Frameworks/R.framework/.. -framework R
ld: warning: search path '/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0' not found
ld: warning: search path '/opt/gfortran/lib' not found
ld: library 'emutls_w' not found
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [lakhesis.so] Error 1
ERROR: compilation failed for package ‘lakhesis’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/lakhesis/new/lakhesis.Rcheck/lakhesis’


```
### CRAN

```
* installing *source* package ‘lakhesis’ ...
** this is package ‘lakhesis’ version ‘1.1’
** package ‘lakhesis’ successfully unpacked and MD5 sums checked
** using staged installation
** libs
using C++ compiler: ‘Apple clang version 17.0.0 (clang-1700.6.4.2)’
using C++17
using SDK: ‘MacOSX26.2.sdk’
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/lakhesis/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/lakhesis/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c RcppExports.cpp -o RcppExports.o
clang++ -arch arm64 -std=gnu++17 -I"/Library/Frameworks/R.framework/Resources/include" -DNDEBUG  -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/lakhesis/Rcpp/include' -I'/Users/elizabethnelson/repos/bslib/revdep/library.noindex/lakhesis/RcppArmadillo/include' -I/opt/R/arm64/include    -fPIC  -falign-functions=64 -Wall -g -O2   -c lakhesis.cpp -o lakhesis.o
clang++ -arch arm64 -std=gnu++17 -dynamiclib -Wl,-headerpad_max_install_names -undefined dynamic_lookup -L/Library/Frameworks/R.framework/Resources/lib -L/opt/R/arm64/lib -o lakhesis.so RcppExports.o lakhesis.o -L/Library/Frameworks/R.framework/Resources/lib -lRlapack -L/Library/Frameworks/R.framework/Resources/lib -lRblas -L/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0 -L/opt/gfortran/lib -lemutls_w -lheapt_w -lgfortran -lquadmath -F/Library/Frameworks/R.framework/.. -framework R
ld: warning: search path '/opt/gfortran/lib/gcc/aarch64-apple-darwin20.0/14.2.0' not found
ld: warning: search path '/opt/gfortran/lib' not found
ld: library 'emutls_w' not found
clang++: error: linker command failed with exit code 1 (use -v to see invocation)
make: *** [lakhesis.so] Error 1
ERROR: compilation failed for package ‘lakhesis’
* removing ‘/Users/elizabethnelson/repos/bslib/revdep/checks.noindex/lakhesis/old/lakhesis.Rcheck/lakhesis’


```
# linkeR (0.1.3)

* GitHub: <https://github.com/EpiForeSITE/linkeR>
* Email: <mailto:jakew@sci.utah.edu>
* GitHub mirror: <https://github.com/cran/linkeR>

Run `revdepcheck::revdep_details(, "linkeR")` for more info

## In both

*   R CMD check timed out


# metasurvey (0.0.21)

* GitHub: <https://github.com/metasurveyr/metasurvey>
* Email: <mailto:mauro.loprete@icloud.com>
* GitHub mirror: <https://github.com/cran/metasurvey>

Run `revdepcheck::revdep_details(, "metasurvey")` for more info

## In both

*   R CMD check timed out


# querychat (0.2.0)

* GitHub: <https://github.com/posit-dev/querychat>
* Email: <mailto:garrick@posit.co>
* GitHub mirror: <https://github.com/cran/querychat>

Run `revdepcheck::revdep_details(, "querychat")` for more info

## In both

*   R CMD check timed out


# scRNAseqApp (1.10.0)

* GitHub: <https://github.com/jianhong/scRNAseqApp>
* Email: <mailto:jou@morgridge.org>

Run `revdepcheck::revdep_details(, "scRNAseqApp")` for more info

## In both

*   R CMD check timed out


# shiny.destroy (0.1.0)

* Email: <mailto:arbaldry91@gmail.com>
* GitHub mirror: <https://github.com/cran/shiny.destroy>

Run `revdepcheck::revdep_details(, "shiny.destroy")` for more info

## In both

*   R CMD check timed out


*   checking DESCRIPTION meta-information ... NOTE
     ```
       Missing dependency on R >= 4.1.0 because package code uses the pipe
       |> or function shorthand \(...) syntax added in R 4.1.0.
       File(s) using such syntax:
         ‘destroyModule.R’ ‘makeModule.R’
     ```

# stepssurvey (0.1.0)

* GitHub: <https://github.com/drpakhare/stepssurvey>
* Email: <mailto:abhijit.cfm@aiimsbhopal.edu.in>
* GitHub mirror: <https://github.com/cran/stepssurvey>

Run `revdepcheck::revdep_details(, "stepssurvey")` for more info

## In both

*   R CMD check timed out


