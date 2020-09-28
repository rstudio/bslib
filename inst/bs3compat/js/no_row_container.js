// BS4 cols need their parent container to be a flex container
// in order to render properly
$(function() {
  let el = $("[class*='col-sm-']").parent();
  if (el.length === 0) return;
  if (!el.hasClass("row")) {
    el.addClass("row").addClass("no-row-container-bs3compat");
  }
});
