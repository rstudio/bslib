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
  // TODO: Handle inputs and static render?
  const outputs = card.querySelectorAll('.shiny-bound-output');

  // Before entering full-screen mode, capture the current size of each output
  // so that on the next resize (which occurs outside of full screen mode)
  // we know what size to return to. The reason we need this hack is because
  // the output container might stretch according to it's child's size (so
  // when they've stretched to full screen, they won't know how to shrink
  // back to the original size)
  outputs.forEach(function(el) {
    const b = $(el).data("shiny-output-binding");
    if (!b || !b.onResize) {
      return;
    }
    if (!b.binding || !b.binding.resize) {
      return;
    }

    // Note the similarity to
    // https://github.com/rstudio/shiny/blob/c21ba0ba/srcts/src/utils/index.ts#L102-L132
    // https://github.com/rstudio/shiny/blob/c21ba0ba/srcts/src/bindings/outputAdapter.ts#L21-L27
    let lastSize = {};
    const elCard = $(el).parents(".card").last();

    b.onResize = function() {
      let size = { w: el.offsetWidth, h: el.offsetHeight };

      if (!elCard.hasClass("bslib-full-screen")) {
        size = inferSize(el, elCard);
      }

      if (size.w === 0 && size.h === 0) return;
      if (size.w === lastSize.w && size.h === lastSize.h) return;

      lastSize = size;
      b.binding.resize(el, size.w, size.h);
      // Technically we're not done exiting until all the output bindings
      // in this card have resized, but this seems fine for now
      card.classList.remove('bslib-full-screen-exiting');
    };

  });

  card.classList.add('bslib-full-screen');

  // Add an overlay behind the card
  // (assumes the fontawesome dependency is already available)
  const overlay = $("<div id='bslib-full-screen-overlay'><a class='bslib-full-screen-exit'>Close <svg width:'20' height='20' fill='currentColor' class='bi bi-x-lg' viewBox='0 0 16 16'><path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z'/></svg></a></div>");
  card.insertAdjacentElement("beforebegin", overlay[0]);
}

function exitFullScreen() {
  const card = document.querySelector('.bslib-full-screen');
  if (!card) {
    return;
  }
  // Before re-sizing/positioning the card, temporarily hide it so that we don't get
  // a "flash of un-resized output"
  card.classList.add('bslib-full-screen-exiting');
  card.classList.remove('bslib-full-screen');
  $('#bslib-full-screen-overlay').remove();
}


function inferSize(el, card) {
  var div = document.createElement("div");
  el.style.forEach(function(x) {
    div.style[x] = el.style[x];
  });
  el.classList.forEach(function(x) {
    div.classList.add(x);
  });
  const el_bindings = $(card).find('.shiny-bound-output');
  const displays = el_bindings.map(function(x) {
    return $(this).css("display");
  });
  el_bindings.each(function(i) {
    $(this).css("display", "none");
  });
  el.insertAdjacentElement("beforebegin", div);
  const width = div.offsetWidth;
  const height = div.offsetHeight;
  div.remove();
  el_bindings.each(function(i) {
    $(this).css("display", displays[i]);
  });
  return {w: width, h: height};
}
