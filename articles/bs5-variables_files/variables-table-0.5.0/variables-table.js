function find_and_select_variable(table, desired_var, update_page) {
  var row_index = table
    .column(1, { order: "current" })
    .data()
    .indexOf(desired_var);
  if (row_index !== -1) {
    table.rows({ selected: true }).deselect();
    table.row(row_index).select();
    location.hash = "#" + desired_var;

    if (update_page) {
      table.row(row_index).scrollTo();
    }
  }
}

function go_to_current_hash(table) {
  var desired_var = location.hash.replace("#", "");
  find_and_select_variable(table, desired_var, true);
}
