// Inform the world that we have the ability to use BS3 nav/navbar markup in BS4
window.BS3_COMPAT = true;

(function($) {
  // For Bootstrap 5+, we don't need to overwrite the Tab constructor
  // (BS3 markup 'just works' since tabs.js is sourced and the
  //  BS5 logic will only be triggered by data-bs-toggle='tab')
  if (window.bootstrap && window.bootstrap.Tab) {
    return;
  }

  if (!$.fn.tab.Constructor.VERSION.match(/^3\./)) {
    (console.warn || console.error || console.log)("bs3compat.js couldn't find bs3 tab impl; bs3 tabs will not be properly supported");
    return;
  }
  var bs3TabPlugin = $.fn.tab.noConflict();

  if (!$.fn.tab.Constructor.VERSION.match(/^4\./)) {
    (console.warn || console.error || console.log)("bs3compat.js couldn't find bs4 tab impl; bs3 tabs will not be properly supported");
    return;
  }
  var bs4TabPlugin = $.fn.tab.noConflict();

  var EVENT_KEY = "click.bs.tab.data-api";
  var SELECTOR = '[data-toggle="tab"], [data-toggle="pill"]';

  $(document).off(EVENT_KEY);
  $(document).on(EVENT_KEY, SELECTOR, function(event) {
    event.preventDefault();
    $(this).tab("show");
  });

  function TabPlugin(config) {
    if ($(this).closest(".nav").find(".nav-item, .nav-link").length === 0) {
      // Bootstrap 3 tabs detected
      bs3TabPlugin.call($(this), config);
    } else {
      // Bootstrap 4 tabs detected
      bs4TabPlugin.call($(this), config);
    }
  }

  var noconflict = $.fn.tab;
  $.fn.tab = TabPlugin;
  $.fn.tab.Constructor = bs4TabPlugin.Constructor;
  $.fn.tab.noConflict = function() {
    $.fn.tab = noconflict;
    return TabPlugin;
  };

})(jQuery);

// bs3 navs: li.active > a
// bs4 navs: li > a.active
