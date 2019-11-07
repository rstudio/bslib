(function($) {
  if ($.fn.tab.Constructor.VERSION !== "3.4.1") {
    (console.warn || console.error || console.log)("bs3compat.js couldn't find bs3 tab impl; bs3 tabs will not be properly supported");
    return;
  }

  var bs3TabPlugin = $.fn.tab.noConflict();

  var EVENT_KEY = "click.bs.tab.data-api";
  var SELECTOR = '[data-toggle="tab"], [data-toggle="pill"]';

  $(document).off(EVENT_KEY);
  $(document).on(EVENT_KEY, SELECTOR, function(event) {
    event.preventDefault();

    var previous = $(this).closest(".nav").find(".active");
    if (previous[0] && previous[0].nodeName === "LI") {
      // Bootstrap 3 tabs detected
      bs3TabPlugin.call($(this), "show");
    } else {
      // Bootstrap 4 tabs detected
      $(this).tab("show");
    }
  });

})(jQuery);

// bs3 navbar: li.active > a
// bs4 navbar: li > a.active
// bs3 tabset: li.active > a
// bs4 tabset: li > a.active
