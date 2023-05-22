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
        <style>html { height: 100%; }</style>

---

    Code
      renderTags(page_sidebar(title = "foo", window_title = "bar"))$head
    Output
        <title>bar</title>
        <style>html { height: 100%; }</style>

