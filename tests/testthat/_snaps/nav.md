# navs_[tab/pill]_card() basically works

    Code
      renderTags(x)$html
    Output
      <div class="container-fluid">
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs" data-tabsetid="4785">
              <li class="nav-item">
                <a href="#tab-4785-1" data-toggle="tab" data-bs-toggle="tab" data-value="a" class="nav-link active">a</a>
              </li>
              <li class="nav-item">
                <a href="#tab-4785-2" data-toggle="tab" data-bs-toggle="tab" data-value="b" class="nav-link">b</a>
              </li>
              <li class="bslib-nav-item nav-item form-inline">
                <a href="https://github.com/rstudio/shiny" target="_blank">
                  <i class="fab fa-github" role="presentation" aria-label="github icon"></i>
                  Shiny
                </a>
              </li>
              <div class="bslib-nav-spacer"></div>
              <li class="dropdown nav-item">
                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" data-bs-toggle="dropdown" data-value="Other links">
                  Other links
                  <b class="caret"></b>
                </a>
                <ul class="dropdown-menu dropdown-menu-right" data-tabsetid="1502">
                  <li>
                    <a href="#tab-1502-1" data-toggle="tab" data-bs-toggle="tab" data-value="c" class="dropdown-item">c</a>
                  </li>
                  <li class="bslib-nav-item form-inline">
                    <a href="https://rstudio.com" target="_blank">
                      <i class="fab fa-r-project" role="presentation" aria-label="r-project icon"></i>
                      RStudio
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" data-tabsetid="4785">
              <div class="tab-pane active" data-value="a" id="tab-4785-1">tab a</div>
              <div class="tab-pane" data-value="b" id="tab-4785-2">tab b</div>
              <div class="tab-pane" data-value="c" id="tab-1502-1">tab c</div>
            </div>
          </div>
        </div>
      </div>

---

    Code
      renderTags(x)$html
    Output
      <div class="container-fluid">
        <div class="card">
          <div class="card-header">
            <ul class="nav nav-pills card-header-pills" data-tabsetid="4785">
              <li class="nav-item">
                <a href="#tab-4785-1" data-toggle="tab" data-bs-toggle="tab" data-value="a" class="nav-link active">a</a>
              </li>
              <li class="nav-item">
                <a href="#tab-4785-2" data-toggle="tab" data-bs-toggle="tab" data-value="b" class="nav-link">b</a>
              </li>
              <li class="bslib-nav-item nav-item form-inline">
                <a href="https://github.com/rstudio/shiny" target="_blank">
                  <i class="fab fa-github" role="presentation" aria-label="github icon"></i>
                  Shiny
                </a>
              </li>
              <div class="bslib-nav-spacer"></div>
              <li class="dropdown nav-item">
                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" data-bs-toggle="dropdown" data-value="Other links">
                  Other links
                  <b class="caret"></b>
                </a>
                <ul class="dropdown-menu dropdown-menu-right" data-tabsetid="1502">
                  <li>
                    <a href="#tab-1502-1" data-toggle="tab" data-bs-toggle="tab" data-value="c" class="dropdown-item">c</a>
                  </li>
                  <li class="bslib-nav-item form-inline">
                    <a href="https://rstudio.com" target="_blank">
                      <i class="fab fa-r-project" role="presentation" aria-label="r-project icon"></i>
                      RStudio
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content" data-tabsetid="4785">
              <div class="tab-pane active" data-value="a" id="tab-4785-1">tab a</div>
              <div class="tab-pane" data-value="b" id="tab-4785-2">tab b</div>
              <div class="tab-pane" data-value="c" id="tab-1502-1">tab c</div>
            </div>
          </div>
        </div>
      </div>

# Generic nav items aren't marked active

    Code
      renderTags(x)$html
    Output
      <div class="container-fluid">
        <div class="tabbable">
          <ul class="nav nav-tabs" data-tabsetid="4785">
            <div class="bslib-nav-spacer"></div>
            <li class="nav-item">
              <a href="#tab-4785-2" data-toggle="tab" data-bs-toggle="tab" data-value="A" class="nav-link active">A</a>
            </li>
            <li class="nav-item">
              <a href="#tab-4785-3" data-toggle="tab" data-bs-toggle="tab" data-value="B" class="nav-link">B</a>
            </li>
          </ul>
          <div class="tab-content" data-tabsetid="4785">
            <div class="tab-pane active" data-value="A" id="tab-4785-2">a</div>
            <div class="tab-pane" data-value="B" id="tab-4785-3">b</div>
          </div>
        </div>
      </div>

---

    Code
      renderTags(x)$html
    Output
      <div class="container-fluid">
        <div class="tabbable">
          <ul class="nav nav-tabs" data-tabsetid="4785">
            <li class="bslib-nav-item nav-item form-inline">
              <a href="https://google.com">Foo</a>
            </li>
            <li class="nav-item">
              <a href="#tab-4785-2" data-toggle="tab" data-bs-toggle="tab" data-value="A" class="nav-link active">A</a>
            </li>
            <li class="nav-item">
              <a href="#tab-4785-3" data-toggle="tab" data-bs-toggle="tab" data-value="B" class="nav-link">B</a>
            </li>
          </ul>
          <div class="tab-content" data-tabsetid="4785">
            <div class="tab-pane active" data-value="A" id="tab-4785-2">a</div>
            <div class="tab-pane" data-value="B" id="tab-4785-3">b</div>
          </div>
        </div>
      </div>

