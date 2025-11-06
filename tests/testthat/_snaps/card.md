# card_image()

    Code
      show_raw_html(card(card_image("https://example.com/image.jpg"), card_body(
        "image cap on top of card")))
    Output
      <div class="card bslib-card bslib-mb-spacing html-fill-item html-fill-container" data-bslib-card-init data-require-bs-caller="card()" data-require-bs-version="5">
        <img alt="" class="img-fluid card-img-top" src="https://example.com/image.jpg"/>
        <div class="card-body bslib-gap-spacing html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">image cap on top of card</div>
        <script data-bslib-card-init>bslib.Card.initializeAllCards();</script>
      </div>

---

    Code
      show_raw_html(card(card_body("image cap on bottom of card"), card_image(
        "https://example.com/image.jpg")))
    Output
      <div class="card bslib-card bslib-mb-spacing html-fill-item html-fill-container" data-bslib-card-init data-require-bs-caller="card()" data-require-bs-version="5">
        <div class="card-body bslib-gap-spacing html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">image cap on bottom of card</div>
        <img alt="" class="img-fluid card-img-bottom" src="https://example.com/image.jpg"/>
        <script data-bslib-card-init>bslib.Card.initializeAllCards();</script>
      </div>

---

    Code
      show_raw_html(card(card_header("header"), card_image(
        "https://example.com/image.jpg"), card_body("image not a cap")))
    Output
      <div class="card bslib-card bslib-mb-spacing html-fill-item html-fill-container" data-bslib-card-init data-require-bs-caller="card()" data-require-bs-version="5">
        <div class="card-header">header</div>
        <img src="https://example.com/image.jpg" alt="" class="img-fluid"/>
        <div class="card-body bslib-gap-spacing html-fill-item html-fill-container" style="margin-top:auto;margin-bottom:auto;flex:1 1 auto;">image not a cap</div>
        <script data-bslib-card-init>bslib.Card.initializeAllCards();</script>
      </div>

---

    Code
      show_raw_html(card(card_image("https://example.com/image.jpg", alt = "card-img")))
    Output
      <div class="card bslib-card bslib-mb-spacing html-fill-item html-fill-container" data-bslib-card-init data-require-bs-caller="card()" data-require-bs-version="5">
        <img alt="card-img" class="img-fluid card-img" src="https://example.com/image.jpg"/>
        <script data-bslib-card-init>bslib.Card.initializeAllCards();</script>
      </div>

# card_image() input validation

    Code
      card_image("cat.jpg")
    Condition
      Error in `card_image()`:
      ! `file` does not exist: cat.jpg
      i If `file` is a remote file or will be served by the Shiny app, use a URL or set `src = "cat.jpg"`.

---

    Code
      card_image("foo", "bar")
    Condition
      Error in `card_image()`:
      ! Unnamed arguments were included in `...`.
      i All additional arguments to `card_image()` in `...` should be named attributes for the `<img>` tag.

---

    Code
      card_image("foo", border_radius = "guess")
    Condition
      Error in `card_image()`:
      ! `border_radius` must be one of "auto", "top", "bottom", "all", or "none", not "guess".

