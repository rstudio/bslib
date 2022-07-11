// Enable tooltips since the .bslib-full-screen-enter icon wants them
$(function() { new bootstrap.Tooltip('[data-bs-toggle="tooltip"]') });

$(document).on('click', '.bslib-full-screen-enter', function(e) {
  const card = $(e.target).parents('.card')[0];
  enterFullScreen(card);
});

$(document).on('click', '.bslib-full-screen-exit', function(e) {
  exitFullScreen();
});

document.addEventListener('keyup', function(e) {
  if (e.key === 'Escape') exitFullScreen();
}, false);


function enterFullScreen(card) {

  // If bindings are in a "stretchy" container, when they exit full screen,
  // they won't be smart enough to shrink back to their original height
  // (because the stretchy container has now stretched to their "full" size).
  // To work around this, we temporarily hide any binding's containing element
  // and "mock" that container element (just to see what the computed size
  // should be) and relay that to the resize method
  // TODO: Handle inputs and static render?
  const bindings = card.querySelectorAll('.shiny-bound-output');
  bindings.forEach(function(x) {
    const binding = $(x).data("shiny-output-binding");
    if (binding && binding.binding && binding.binding.resize) {
      const resizeFunc = binding.binding.resize;
      binding.binding.resize = function(el, width, height) {
        if (!$(el).parents(".card").hasClass("bslib-full-screen")) {
          var div = document.createElement("div");
          // TODO: should probably copy over classes, too
          el.style.forEach(function(x) {
            div.style[x] = el.style[x];
          });
          const display = el.style.display;
          el.style.display = "none";
          el.insertAdjacentElement("beforebegin", div);
          width = div.offsetWidth;
          height = div.offsetHeight;
          div.remove();
          el.style.display = display;
          // Shouldn't the image binding's resize be doing this?
          Shiny.setInputValue(".clientdata_output_" + el.id + "_width", width);
          Shiny.setInputValue(".clientdata_output_" + el.id + "_height", height);
        }
        resizeFunc(el, width, height);
      };
    }
  });

  // The next time the card is resized (i.e., when the
  // .bslib-full-screen class is added), trigger window resize
  // (so htmlwidgets/plots get the new size)
  // TODO: this could probably go away if Shiny used ResizeObserver()
  // const ro = new ResizeObserver(function(entries, observer) {
  //   observer.disconnect();
  //   $(window).trigger('resize');
  // });
  // ro.observe(card);

  card.classList.add('bslib-full-screen');

  // Add an overlay behind the card
  // (assumes the fontawesome dependency is already available)
  const overlay = $("<div id='bslib-full-screen-overlay'><a class='bslib-full-screen-exit'>Close<i class='fa fa-window-close'></i></a></div>");
  $('body').first().append(overlay);
}

function exitFullScreen() {
  const card = document.querySelector('.bslib-full-screen');
  if (card) {
    card.classList.remove('bslib-full-screen');
    $('#bslib-full-screen-overlay').remove();
  }
}
