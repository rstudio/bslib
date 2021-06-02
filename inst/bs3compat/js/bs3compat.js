// Inform the world that we have the ability to use BS3 nav/navbar markup in BS4
window.BS3_COMPAT = true;

(function($) {

  // We always bundle Bootstrap 3's tab plugin (after the main Bootstrap JS bundle),
  // so this should (in theory) always be true at this point
  if (!$.fn.tab.Constructor.VERSION.match(/^3\./)) {
    (console.warn || console.error || console.log)("bs3compat.js couldn't find bs3 tab impl; bs3 tabs will not be properly supported");
    return;
  }
  var bs3TabPlugin = $.fn.tab.noConflict();

  // Bootstrap 5 removed jQuery and thus has removed the plugin
  var bs4TabPlugin = null;
  if ($.fn.tab && $.fn.tab.noConflict) {
    bs4TabPlugin = $.fn.tab.noConflict();
  }

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
    } else if (bs4TabPlugin) {
      // Bootstrap 4 tabs detected
      bs4TabPlugin.call($(this), config);
    } else {
      // In the Bootstrap 5+ case, do nothing since the data-bs-toggle namespace
      // will trigger it's own events
    }
  }

  // Register our plugin shim
  var noconflict = $.fn.tab;
  $.fn.tab = TabPlugin;

  // TODO: do we need to do this for BS5?
  if (bs4TabPlugin) {
    $.fn.tab.Constructor = bs4TabPlugin.Constructor;
    $.fn.tab.noConflict = function() {
      $.fn.tab = noconflict;
      return TabPlugin;
    };
  }

})(jQuery);

// bs3 navs: li.active > a
// bs4 navs: li > a.active
