// Enable tooltips since the .bslib-full-screen-enter icon wants them
$(function() {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function(x) {
    return new bootstrap.Tooltip(x);
  });

});

$(document).on('click', '.bslib-full-screen-enter', function(e) {
  const card = $(e.target).parents('.card').last()[0];
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
        const el_card = $(el).parents(".card").last();
        if (!el_card.hasClass("bslib-full-screen")) {
          var div = document.createElement("div");
          el.style.forEach(function(x) {
            div.style[x] = el.style[x];
          });
          el.classList.forEach(function(x) {
            div.classList.add(x);
          });
          const el_bindings = el_card.find('.shiny-bound-output');
          const displays = el_bindings.map(function(x) {
            return $(this).css("display");
          });
          el_bindings.each(function(i) {
            $(this).css("display", "none");
          });
          el.insertAdjacentElement("beforebegin", div);
          width = div.offsetWidth;
          height = div.offsetHeight;
          div.remove();
          el_bindings.each(function(i) {
            $(this).css("display", displays[i]);
          });
          // Shouldn't the image binding's resize be doing this?
          Shiny.setInputValue(".clientdata_output_" + el.id + "_width", width);
          Shiny.setInputValue(".clientdata_output_" + el.id + "_height", height);
        } else {
          Shiny.setInputValue(".clientdata_output_" + el.id + "_width", width);
          Shiny.setInputValue(".clientdata_output_" + el.id + "_height", height);
        }
        resizeFunc(el, width, height);
      };
    }
  });

  card.classList.add('bslib-full-screen');

  // Add an overlay behind the card
  // (assumes the fontawesome dependency is already available)
  const overlay = $("<div id='bslib-full-screen-overlay'><a class='bslib-full-screen-exit'>Close <svg width:'20' height='20' fill='currentColor' class='bi bi-x-lg' viewBox='0 0 16 16'><path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z'/></svg></a></div>");
  card.insertAdjacentElement("beforebegin", overlay[0]);
}

function exitFullScreen() {
  const card = document.querySelector('.bslib-full-screen');
  if (card) {
    card.classList.remove('bslib-full-screen');
    $('#bslib-full-screen-overlay').remove();
  }
}
