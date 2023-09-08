shuffleButton <- function(id, label, class = "btn-outline-secondary") {
  tags$button(
    id = id,
    class = "btn action-button shuffle-button",
    class = class,
    bsicons::bs_icon("shuffle", title = "Random"),
    label
  )
}
