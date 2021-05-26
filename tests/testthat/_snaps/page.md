# page_navbar()

    Code
      renderTags(page_navbar(title = div(h1("foo"), h2("bar"))))$head
    Output
        <title>foo bar</title>

---

    Code
      renderTags(page_navbar(title = "foo", window_title = "bar"))$head
    Output
        <title>bar</title>

---

    Code
      renderTags(page_navbar2(bg = "red", nav("a", "A")))$html
    Output
      <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation" style="background-color:#FF0000 !important;">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1502">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <span class="navbar-brand"></span>
          </div>
          <div class="navbar-collapse collapse" id="navbar-collapse-1502">
            <ul class="nav navbar-nav" data-tabsetid="4785">
              <li class="active">
                <a href="#tab-4785-1" data-toggle="tab" data-value="a">a</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container-fluid">
        <div class="tab-content" data-tabsetid="4785">
          <div class="tab-pane active" data-value="a" id="tab-4785-1">A</div>
        </div>
      </div>

