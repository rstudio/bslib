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

