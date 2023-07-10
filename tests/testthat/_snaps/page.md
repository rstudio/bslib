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
      renderTags(page_sidebar(title = "foo"))$head
    Output
        <title>foo</title>

# page_sidebar()

    Code
      renderTags(page_sidebar(title = "foo", window_title = "bar"))$head
    Output
        <title>bar</title>

---

    Code
      renderTags(page_sidebar("main", title = "Title", sidebar = sidebar(open = "always")))$
        html
    Output
      <body class="bslib-page-fillable bslib-gap-spacing html-fill-container" style="padding:0px;gap:0px;--bslib-page-fill-mobile-height:auto;">
        <h1 class="bslib-page-title">Title</h1>
        <div class="bslib-sidebar-layout html-fill-item" data-bslib-sidebar-border="false" data-bslib-sidebar-border-radius="false" data-bslib-sidebar-open="always" data-require-bs-caller="layout_sidebar()" data-require-bs-version="5" style="--bslib-sidebar-width:250px;--bslib-sidebar-max-height-mobile:250px;">
          <div class="main bslib-gap-spacing html-fill-container" role="main">main</div>
          <div role="complementary" class="sidebar">
            <div class="sidebar-content"></div>
          </div>
          <script data-bslib-sidebar-init>bslib.Sidebar.initCollapsibleAll()</script>
        </div>
      </body>

---

    Code
      renderTags(page_sidebar("main", title = "Title", sidebar = "side"))$html
    Output
      <body class="bslib-page-fill bslib-gap-spacing html-fill-container" style="padding:0px;gap:0px;--bslib-page-fill-mobile-height:auto;">
        <h1 class="bslib-page-title">Title</h1>
        <div class="bslib-sidebar-layout html-fill-item" data-bslib-sidebar-border="false" data-bslib-sidebar-border-radius="false" data-bslib-sidebar-init="TRUE" data-bslib-sidebar-open="desktop" data-require-bs-caller="layout_sidebar()" data-require-bs-version="5" style="--bslib-sidebar-width:250px;--bslib-sidebar-max-height-mobile:250px;">
          <div class="main bslib-gap-spacing html-fill-container" role="main">main</div>
          <div id="bslib-sidebar-4785" role="complementary" class="sidebar">
            <div class="sidebar-content">side</div>
          </div>
          <button class="collapse-toggle" type="button" title="Toggle sidebar" aria-expanded="true" aria-controls="bslib-sidebar-4785"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bi bi-chevron-down collapse-icon" style="height:;width:;fill:currentColor;" aria-hidden="true" role="img" ><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"></path></svg></button>
          <script data-bslib-sidebar-init>bslib.Sidebar.initCollapsibleAll()</script>
        </div>
      </body>

