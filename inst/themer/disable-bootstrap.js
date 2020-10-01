// Try our best to find and disable bootstrap CSS.
// This is needed, because although
Shiny.addCustomMessageHandler("bootstraplib-themer-disable-bootstrap", function(msg) {
  var sheets = document.styleSheets;
  for (i = 0; i < sheets.length; i++) {
    var href = sheets[i].href || "";
    var href_parts = href.split("/");
    var basename = href_parts[href_parts.length - 1];
    if (basename.match(/^bs_dependencies(-custom)?(.min)?.css$/)) {
      sheets[i].disabled = true;
    }
  }
});
