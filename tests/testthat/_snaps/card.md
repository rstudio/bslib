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

