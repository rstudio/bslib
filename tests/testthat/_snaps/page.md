# page_navbar()

    Code
      renderTags(page_navbar(title = div(h1("foo"), h2("bar"))))$head
    Output
        <title>foo bar</title>
        <style>html { height: 100%; }</style>

---

    Code
      renderTags(page_navbar(title = "foo", window_title = "bar"))$head
    Output
        <title>bar</title>
        <style>html { height: 100%; }</style>

---

    Code
      renderTags(page_sidebar(title = "foo"))$head
    Output
        <title>foo</title>
        <style>html { height: 100%; }</style>

# page_sidebar()

    Code
      renderTags(page_sidebar(title = "foo", window_title = "bar"))$head
    Output
        <title>bar</title>
        <style>html { height: 100%; }</style>

---

    Code
      renderTags(page_sidebar("main", title = "Title", sidebar = sidebar(open = "always")))$
        html
    Output
      <body class="bslib-page-fill bslib-gap-spacing bslib-flow-mobile bslib-page-sidebar html-fill-container" style="padding:0px;gap:0px;">
        <div class="bslib-page-title navbar navbar-static-top">
          <div class="container-fluid">
            <h1 class="navbar-brand">Title</h1>
          </div>
        </div>
        <div class="bslib-sidebar-layout bslib-mb-spacing html-fill-item" data-bslib-sidebar-border="false" data-bslib-sidebar-border-radius="false" data-bslib-sidebar-init="TRUE" data-collapsible-desktop="false" data-collapsible-mobile="false" data-open-desktop="always" data-open-mobile="always" data-require-bs-caller="layout_sidebar()" data-require-bs-version="5" style="--_sidebar-width:250px;">
          <div class="main bslib-gap-spacing html-fill-container">main</div>
          <aside class="sidebar">
            <div class="sidebar-content bslib-gap-spacing"></div>
          </aside>
          <button class="collapse-toggle" type="button" title="Toggle sidebar" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bi bi-chevron-left collapse-icon" style="height:;width:;fill:currentColor;vertical-align:-0.125em;" aria-hidden="true" role="img" ><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path></svg></button>
          <script data-bslib-sidebar-init>bslib.Sidebar.initCollapsibleAll()</script>
        </div>
      </body>

---

    Code
      renderTags(page_sidebar("main", title = "Title", sidebar = "side"))$html
    Output
      <body class="bslib-page-fill bslib-gap-spacing bslib-flow-mobile bslib-page-sidebar html-fill-container" style="padding:0px;gap:0px;">
        <div class="bslib-page-title navbar navbar-static-top">
          <div class="container-fluid">
            <h1 class="navbar-brand">Title</h1>
          </div>
        </div>
        <div class="bslib-sidebar-layout bslib-mb-spacing html-fill-item" data-bslib-sidebar-border="false" data-bslib-sidebar-border-radius="false" data-bslib-sidebar-init="TRUE" data-collapsible-desktop="true" data-collapsible-mobile="false" data-open-desktop="open" data-open-mobile="always" data-require-bs-caller="layout_sidebar()" data-require-bs-version="5" style="--_sidebar-width:250px;">
          <div class="main bslib-gap-spacing html-fill-container">main</div>
          <aside id="bslib-sidebar-4785" class="sidebar" hidden>
            <div class="sidebar-content bslib-gap-spacing">side</div>
          </aside>
          <button class="collapse-toggle" type="button" title="Toggle sidebar" aria-expanded="true" aria-controls="bslib-sidebar-4785"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="bi bi-chevron-left collapse-icon" style="height:;width:;fill:currentColor;vertical-align:-0.125em;" aria-hidden="true" role="img" ><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path></svg></button>
          <script data-bslib-sidebar-init>bslib.Sidebar.initCollapsibleAll()</script>
        </div>
      </body>

