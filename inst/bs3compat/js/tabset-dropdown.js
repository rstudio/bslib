// Translate rmarkdown's .tabset-dropdown to a suitable BS4 equivalent
// https://github.com/rstudio/rmarkdown/pull/1405
$(function() {

  // Give rmarkdown's navigation JS a chance to run and generate the nav's HTML
  setTimeout(function() {

    var dropdown_old = $(".tabset-dropdown > .nav");
    if (dropdown_old.length === 0) return;

    // Wrap the nav items into a dropdown-menu
    var dropdown_menu = $("<ul class='dropdown-menu'></ul>");
    dropdown_menu.append(dropdown_old.children());

    // Wrap the dropdown-menu in a dropdown
    var dropdown_nav = $("<li class='dropdown'></li>")
      .append("<a class='dropdown-toggle' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'></a>")
      .append(dropdown_menu);

    // Insert the dropdown nav
    var nav = $("<ul class='nav nav-pills'></ul>");
    nav.append(dropdown_nav);
    nav.insertBefore(".tabset-dropdown > .nav");

    // Update the dropdown toggle's text label
    $(".tabset-dropdown > .nav").on("click", "li", function() {
      var label = $(this).children("a").text();
      $(this).parents(".tabset-dropdown").find('a.dropdown-toggle').text(label);
    });

    // Make the toggle display the active label on load
    var active = $(".tabset-dropdown > .nav li.active");
    active.removeClass("active");
    active.trigger("click");

  }, 1);

});
