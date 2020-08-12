## Pull Request

Before you submit a pull request, please ensure you've completed the following checklist

- [ ] Ensure there is an already open and relevant [GitHub issue](https://github.com/rstudio/thematic/issues/new) describing the problem in detail and you've already received some indication from the maintainers that they are welcome to a contribution to fix the problem. This helps us to prevent wasting anyone's time. 

- [ ] Ensure that you have signed the [individual](https://rstudioblog.files.wordpress.com/2017/05/rstudio_individual_contributor_agreement.pdf) or [corporate](https://rstudioblog.files.wordpress.com/2017/05/rstudio_corporate_contributor_agreement.pdf) contributor agreement as appropriate. You can send the signed copy to jj@rstudio.com.

- [ ] Add unit tests in the tests/testthat directory.

- [ ] This project uses [roxygen2 for documentation](http://r-pkgs.had.co.nz/man.html). If you've made changes to documentation, run `devtools::document()`.

- [ ] Run `devtools::check()` (or, equivalently, click on Build->Check Package in the RStudio IDE) to make sure your change did not add any messages, warnings, or errors.
    * Note there is a decent chance that some tests were already failing before your changes. Just make sure you haven't introduced any new ones.
    
- [ ] Ensure your code changes follow the style outlined in http://r-pkgs.had.co.nz/style.html

- [ ] Add an entry to NEWS.md concisely describing what you changed.
