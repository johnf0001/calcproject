var y_functions = [[""], [""], [""], [""], [""], [""], [""], [""], [""], [""]];
var func_ph = ["Y1=", "Y2=", "Y3=", "Y4=", "Y5=", "Y6=", "Y7=", "Y8=", "Y9=", "Y0="];

var window_ops = ["&nbsp;Xmin=", "&nbsp;Xmax=", "&nbsp;Ymin=", "&nbsp;Ymax="];
var window_val = [["-", "1", "0"], ["1", "0"], ["-", "1", "0"], ["1", "0"]];

var tblset_ops = [["&nbsp;TblStart="], ["&nbsp;StepSize="]]
var tblset_val = [["0"], ["1"]];

var row_ind = 0;

function get_raw_functions() {
  return y_functions;
}

function updateGraphDimensions() {
  isTrace = false;
  var compiled_settings = compile_w_settings();
  if (isNaN(compiled_settings[0]) || isNaN(compiled_settings[1]) || isNaN(compiled_settings[2]) || isNaN(compiled_settings[3]) ||
    compiled_settings[0] >= compiled_settings[1] || compiled_settings[2] >= compiled_settings[3] ||
    compiled_settings[0].length == 0 || compiled_settings[1].length == 0 || compiled_settings[2].length == 0 || compiled_settings[3].length == 0) {
    window_val = [["-", "1", "0"], ["1", "0"], ["-", "1", "0"], ["1", "0"]];
    compiled_settings = compile_w_settings();
  }
  document.getElementsByName("x-min")[0].value = compiled_settings[0];
  document.getElementsByName("x-max")[0].value = compiled_settings[1];
  document.getElementsByName("y-min")[0].value = compiled_settings[2];
  document.getElementsByName("y-max")[0].value = compiled_settings[3];
}

var zoomPreviousLast = "ZStandard";
function zoomGraphDimensions(option) {
  var compiled_settings = compile_w_settings();
  if (option == "Zoom In") {
    for (var i = 0; i < window_val.length; i++) {
      window_val[i] = [compiled_settings[i] / 1.5];
    }
  }
  else if (option == "Zoom Out") {
    for (var i = 0; i < window_val.length; i++) {
      window_val[i] = [compiled_settings[i] * 1.5];
    }
  }
  else if (option == "ZStandard" || option == "ZSquare" || option == "ZBox") {
    window_val = [["-", "1", "0"], ["1", "0"], ["-", "1", "0"], ["1", "0"]];
  }
  else if (option.includes("ZFrac1")) {
    var divide_by = parseInt(option.slice(-1));
    window_val[0] = [-66 / divide_by];
    window_val[1] = [66 / divide_by];
    window_val[2] = [-41 / divide_by];
    window_val[3] = [41 / divide_by];
  }
  else if (option == "ZQuadrant1") {
    window_val[0] = [-1];
    window_val[2] = [-1];
  }
  else if (option == "ZPrevious") {
    zoomGraphDimensions(zoomPreviousLast);
  }
  if (option != "ZPrevious") {
    zoomPreviousLast = option;
  }
  updateGraphDimensions();
  redrawGraph('simple_graph_gui', 'graph');
}


function reset_ind_y() {
  row_ind = 0;
}

function display_y_functions() {
  if (game_on) {
    equation_skipped();
    return;
  }
  if (is_on()) {
    if (is_plot_on()) {
      var display_text = "plot on [X: L" + plot_val[0] + ", Y: L" + plot_val[1] + "]<br><br>";
    }
    else {
      var display_text = "plot off<br><br>";
    }
    if (row_ind == -1) {
      display_text = "<b>" + display_text + "</b>";
    }
    var compiled_functions = compile_y_functions();

    for (var i = 0; i < func_ph.length; i++) {
      if (i == row_ind) {
        display_text += "<b>" + func_ph[i] + "</b>" + compiled_functions[i] + "<br>";
      }
      else {
        display_text += func_ph[i] + compiled_functions[i] + "<br>";
      }
    }
    document.getElementById("math--screen").innerHTML = display_text;
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
      document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("math--screen").style.display = "block";

    set_mode("y=");
  }
}

function display_graph_window() {
  if (game_on) {
    equation_skipped();
    return;
  }
  if (is_on()) {
    var display_text = "<b>WINDOW</b><br><br>";
    var compiled_settings = compile_w_settings();
    for (var i = 0; i < window_ops.length; i++) {
      if (i == row_ind) {
        display_text += "<b>" + window_ops[i] + "</b>" + compiled_settings[i] + "<br><br>";
      }
      else {
        display_text += window_ops[i] + compiled_settings[i] + "<br><br>";
      }
    }
    document.getElementById("math--screen").innerHTML = display_text;
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
      document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("math--screen").style.display = "block";

    set_mode("window");
  }
}

function display_tblset() {
  if (is_on()) {
    set_mode("tblset");
    var display_text = "<b>TABLE SET UP</b><br><br>";
    var compiled_tbl = compile_tblset();
    for (var i = 0; i < tblset_ops.length; i++) {
      if (i == row_ind) {
        display_text += "<b>" + tblset_ops[i] + "</b>" + compiled_tbl[i] + "<br><br>";
      }
      else {
        display_text += tblset_ops[i] + compiled_tbl[i] + "<br><br>";
      }
    }
    document.getElementById("math--screen").innerHTML = display_text;
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
      document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("math--screen").style.display = "block";

  }
}

function compile_tblset() {
  var compiled_tblset = [];
  for (var i = 0; i < tblset_val.length; i++) {
    var comp_func = "";
    var start_index = 0;
    if (tblset_val[i].length > 21) {
      start_index = tblset_val[i].length - 21;
    }
    for (var j = start_index; j < tblset_val[i].length; j++) {
      comp_func += tblset_val[i][j];
    }
    if (isNaN(parseInt(comp_func)) || comp_func.includes(".")) {
      compiled_tblset.push(comp_func);
    }
    else {
      compiled_tblset.push(parseInt(comp_func));
    }
  }
  return compiled_tblset;
}

function compile_y_functions() {
  var compiled_functions = [];
  for (var i = 0; i < y_functions.length; i++) {
    var comp_func = "";
    var start_index = 0;
    if (y_functions[i].length > 21) {
      start_index = y_functions[i].length - 21;
    }
    for (var j = start_index; j < y_functions[i].length; j++) {
      comp_func += y_functions[i][j];
    }
    compiled_functions.push(comp_func);
  }
  return compiled_functions;
}

function compile_w_settings() {
  var compiled_setting = [];
  for (var i = 0; i < window_val.length; i++) {
    var comp_func = "";
    var start_index = 0;
    if (window_val[i].length > 21) {
      start_index = window_val[i].length - 21;
    }
    for (var j = start_index; j < window_val[i].length; j++) {
      comp_func += window_val[i][j];
    }
    compiled_setting.push(comp_func);
  }
  return compiled_setting;
}

function graph_input(e) {
  if (get_mode() == "y=") {
    if (e == "log10(") {
      y_functions[row_ind].push("log(");
    }
    else {
      y_functions[row_ind].push(e);
    }
    display_y_functions();
  }
  else if (get_mode() == "window" && window_val[row_ind].length < 6) {
    if (e == "-" || e == "." || !isNaN(e)) {
      window_val[row_ind].push(e);
    }
    display_graph_window();
  }
  else if (get_mode() == "tblset" && tblset_val[row_ind].length < 6) {
    if (e == "-" || e == "." || !isNaN(e)) {
      tblset_val[row_ind].push(e);
    }
    display_tblset();
  }
  else if (get_mode() == "value") {
    if (e == "-" || e == "." || !isNaN(e)) {
      if (row_ind == 0 && !isNaN(e) && parseInt(e) < func_ph.length + 1) {
        value_val[row_ind] = parseInt(e);
      }
      else if (row_ind == 1 && value_val[row_ind].length < 6) {
        value_val[row_ind].push(e);
      }
    }
    display_calc(get_mode());
  }
  else if (get_mode() == "dydx") {
    if (e == "-" || e == "." || !isNaN(e)) {
      if (row_ind == 0 && !isNaN(e) && parseInt(e) < func_ph.length + 1) {
        dydx_val[row_ind] = parseInt(e);
      }
      else if (row_ind == 1 && dydx_val[row_ind].length < 6) {
        dydx_val[row_ind].push(e);
      }
    }
    display_calc(get_mode());
  }
  else if (get_mode() == "intersect") {
    if (e == "-" || e == "." || !isNaN(e)) {
      if (row_ind == 0 && !isNaN(e) && parseInt(e) < func_ph.length + 1) {
        intersect_val[row_ind] = parseInt(e);
      }
      else if (row_ind == 1 && !isNaN(e) && parseInt(e) < func_ph.length + 1) {
        intersect_val[row_ind] = parseInt(e);
      }
    }
    display_calc(get_mode());
  }
  else if (["inte", "minimum", "maximum"].includes(get_mode())) {
    if (e == "-" || e == "." || !isNaN(e)) {
      if (row_ind == 0 && !isNaN(e) && parseInt(e) < func_ph.length + 1) {
        inte_val[row_ind] = parseInt(e);
      }
      else if (row_ind == 1 && inte_val[row_ind].length < 6) {
        inte_val[row_ind].push(e);
      }
      else if (row_ind == 2 && inte_val[row_ind].length < 6) {
        inte_val[row_ind].push(e);
      }
    }
    display_calc(get_mode());
  }
  else if (get_mode() == "zero") {
    if (row_ind == 0 && !isNaN(e) && parseInt(e) < func_ph.length + 1) {
      zero_val[row_ind] = parseInt(e);
    }
    display_calc(get_mode());
  }
}


function clear_graph() {
  if (get_mode() == "y=") {
    y_functions[row_ind] = [""];
    display_y_functions();
  }
  else if (get_mode() == "window") {
    window_val[row_ind] = [""];
    display_graph_window();
  }
  else if (get_mode() == "tblset") {
    tblset_val[row_ind] = [""];
    display_tblset();
  }
  else if (get_mode() == "value") {
    value_val[row_ind] = ["0"];
    display_calc(get_mode());
  }
  else if (get_mode() == "dydx") {
    dydx_val[row_ind] = ["0"];
    display_calc(get_mode());
  }
  else if (["inte", "minimum", "maximum"].includes(get_mode())) {
    inte_val[row_ind] = ["0"];
    display_calc(get_mode());
  }
}
function backspace_graph() {
  if (get_mode() == "y=") {
    y_functions[row_ind].pop();
    if (y_functions[row_ind].length > 0 && ["cos", "sin", "tan", "√", "sin^-1", "cos^-1", "tan^-1"].includes(y_functions[row_ind][y_functions[row_ind].length - 1])) {
      y_functions[row_ind].pop();
    }
    display_y_functions();
  }
  else if (get_mode() == "window" && window_val[row_ind].length > 0) {
    window_val[row_ind].pop();
    display_graph_window();
  }
  else if (get_mode() == "tblset" && tblset_val[row_ind].length > 0) {
    tblset_val[row_ind].pop();
    display_tblset();
  }
  else if (get_mode() == "value" && value_val[row_ind].length > 0) {
    value_val[row_ind].pop();
    if (value_val[row_ind].length == 0) {
      clear_graph();
    }
    display_calc(get_mode());
  }
  else if (get_mode() == "dydx" && dydx_val[row_ind].length > 0) {
    dydx_val[row_ind].pop();
    display_calc(get_mode());
  }
  else if (["inte", "minimum", "maximum"].includes(get_mode()) && inte_val[row_ind].length > 0) {
    inte_val[row_ind].pop();
    display_calc(get_mode());
  }
}
var col_ind_tbl = 0;

function reset_ind_tbl() {
  row_ind = 0;
  col_ind_tbl = 0;
}

function display_table() {
  if (is_on()) {
    set_mode("table");
    if (calc_input.length > 0 && ["cos", "sin", "tan", "√", "sin^-1", "cos^-1", "tan^-1"].includes(calc_input[calc_input.length - 1])) {
      calc_input.pop();
    }
    var tblvals = compile_tblset();
    if (isNaN(Number(tblvals[0].toString())) || isNaN(Number(tblvals[1].toString())) || Number(tblvals[1].toString()) <= 0) {
      tblset_val = [[0], [1]];
      tblvals = compile_tblset();
    }
    var tblvals = [Number(tblvals[0].toString()), Number(tblvals[1].toString())]
    var compiled_function = solve(y_functions[col_ind_tbl]);
    var display_text = "<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>X</b>&nbsp;&nbsp;&nbsp;&nbsp;|</u>";
    var display_nmb = col_ind_tbl + 1;
    if(display_nmb == 10)
    {
      display_nmb = 0;
    }
    display_text += "<u>&nbsp;&nbsp;&nbsp;&nbsp;<b>Y" + display_nmb + "</b>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;>></u><br><br>";
    for (var i = row_ind * tblvals[1] + tblvals[0]; i <= (9 * tblvals[1]) + (row_ind * tblvals[1]) + tblvals[0]; i = i + tblvals[1]) {
      display_text += "<u>" + pad(i, 10) + "|</u>";
      try {
        display_text += "<u>" + pad(nerdamer(compiled_function, { x: i }).evaluate().text('decimals', 7), 10) + "|&nbsp;&nbsp;&nbsp;&nbsp;</u><br>";
      } catch (error) {
        display_text += "<u>" + pad("UNDEFINED", 10) + "|</u><br>";
      }
    }
    document.getElementById("math--screen").innerHTML = display_text;
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
      document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("math--screen").style.display = "block";
  }
}


function ind_shift(direction) {
  if (direction == "right") {
    if (get_mode() == "table") {
      if (col_ind_tbl < y_functions.length - 1) {
        col_ind_tbl++;
      }
      else {
        col_ind_tbl = 0;
      }
    }
    else if (get_mode() == "list_edit") {
      if (col_ind_list < list_store.length - 3) {
        col_ind_list++;
      }
      else {
        col_ind_list = 0;
      }
      if (list_store[col_ind_list][row_ind_list] == undefined) {
        row_ind_list = list_store[col_ind_list].length - 1;
      }
    }
    else if (["matrix_edit"].includes(get_mode())) {
      if (matrix_row != -1) {
        if (matrix_column == matrix_store[matrix_index][0][0] - 1) {
          matrix_column = 0;
        }
        else {
          matrix_column++;
        }
      }
      else {
        edit_ind_left = !edit_ind_left;
      }
    }
  }
  else if (direction == "left") {
    if (get_mode() == "table") {
      if (col_ind_tbl > 0) {
        col_ind_tbl--;
      }
      else {
        col_ind_tbl = y_functions.length - 1;
      }
    }
    else if (get_mode() == "list_edit") {
      if (col_ind_list > 0) {
        col_ind_list--;
      }
      else {
        col_ind_list = list_store.length - 3;
      }
      if (list_store[col_ind_list][row_ind_list] == undefined) {
        row_ind_list = list_store[col_ind_list].length - 1;
      }
    }
    else if (["matrix_edit"].includes(get_mode())) {
      if (matrix_row != -1) {
        if (matrix_column == 0) {
          matrix_column = matrix_store[matrix_index][0][0] - 1;
        }
        else {
          matrix_column--;
        }
      }
      else {
        edit_ind_left = !edit_ind_left;
      }
    }
  }
  else if (direction == "down") {
    if (get_mode() == "table") {
      row_ind++;
    }
    else if (get_mode() == "y=") {
      if (row_ind == y_functions.length - 1) {
        row_ind = 0;
      }
      else if (row_ind == -1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (get_mode() == "window") {
      if (row_ind == window_ops.length - 1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (get_mode() == "tblset") {
      if (row_ind == tblset_ops.length - 1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (get_mode() == "list_edit") {
      if (row_ind_list == list_store[col_ind_list].length - 1) {
        row_ind_list = 0;
      }
      else {
        row_ind_list++;
      }
    }
    else if (get_mode() == "value") {
      if (row_ind == value_ops.length - 1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (get_mode() == "dydx") {
      if (row_ind == dydx_ops.length - 1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (get_mode() == "plot") {
      if (row_ind == intersect_ops.length - 1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (get_mode() == "intersect") {
      if (row_ind == intersect_ops.length - 1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (["inte", "minimum", "maximum"].includes(get_mode())) {
      if (row_ind == inte_ops.length - 1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (["zero"].includes(get_mode())) {
      if (row_ind == zero_ops.length - 1) {
        row_ind = 0;
      }
      else {
        row_ind++;
      }
    }
    else if (["matrix_edit"].includes(get_mode())) {
      if (matrix_row == matrix_store[matrix_index][0][1] - 1) {
        matrix_row = 0;
      }
      else {
        matrix_row++;
      }
    }
  }
  else if (direction == "up") {
    if (get_mode() == "table") {
      row_ind--;
    }
    else if (get_mode() == "y=") {
      if (row_ind == -1) {
        row_ind = y_functions.length - 1;
      }
      else if (row_ind == 0) {
        row_ind = -1;
      }
      else {
        row_ind--;
      }
    }
    else if (get_mode() == "window") {
      if (row_ind == 0) {
        row_ind = window_ops.length - 1;
      }
      else {
        row_ind--;
      }
    }
    else if (get_mode() == "tblset") {
      if (row_ind == 0) {
        row_ind = tblset_ops.length - 1;
      }
      else {
        row_ind--;
      }
    }
    else if (get_mode() == "list_edit") {
      if (row_ind_list == 0) {
        row_ind_list = list_store[col_ind_list].length - 1;
      }
      else {
        row_ind_list--;
      }
    }
    else if (get_mode() == "value") {
      if (row_ind == 0) {
        row_ind = value_ops.length - 1;
      }
      else {
        row_ind--;
      }
    }
    else if (get_mode() == "dydx") {
      if (row_ind == 0) {
        row_ind = dydx_ops.length - 1;
      }
      else {
        row_ind--;
      }
    }
    else if (get_mode() == "intersect") {
      if (row_ind == 0) {
        row_ind = intersect_ops.length - 1;
      }
      else {
        row_ind--;
      }
    }
    else if (get_mode() == "plot") {
      if (row_ind == 0) {
        row_ind = intersect_ops.length - 1;
      }
      else {
        row_ind--;
      }
    }
    else if (["inte", "minimum", "maximum"].includes(get_mode())) {
      if (row_ind == 0) {
        row_ind = inte_ops.length - 1;
      }
      else {
        row_ind--;
      }
    }
    else if (["zero"].includes(get_mode())) {
      if (row_ind == 0) {
        row_ind = zero_ops.length - 1;
      }
      else {
        row_ind--;
      }
    }
    else if (["matrix_edit"].includes(get_mode())) {
      if (matrix_row == -1) {
        matrix_row = matrix_store[matrix_index][0][1] - 1;
      }
      else {
        matrix_row--;
      }
    }
  }
  if (get_mode() == "table") {
    display_table();
  }
  else if (get_mode() == "y=") {
    display_y_functions();
  }
  else if (get_mode() == "window") {
    display_graph_window();
  }
  else if (get_mode() == "tblset") {
    display_tblset();
  }
  else if (get_mode() == "list_edit") {
    display_list();
  }
  else if (["value", "dydx", "inte", "intersect", "zero", "minimum", "maximum"].includes(get_mode())) {
    display_calc(get_mode());
  }
  else if (get_mode() == "matrix_edit") {
    display_matrix();
  }
  else if (get_mode() == "plot") {
    display_plot();
  }
}



// https://stackoverflow.com/questions/2998784/how-to-output-numbers-with-leading-zeros-in-javascript
// edit of ^
function pad(num, size) {
  num = num.toString();
  if (num.length > size) {
    num = num.substring(0, size);
  }
  while (num.length < size) {
    num = ":" + num;
  }
  num = num.replaceAll(":", "&nbsp;");
  return num;
}

function get_y_functions() {
  var compiled_functions = compile_y_functions();
  return compiled_functions;
}


var value_ops = ["FUNCTION: Y", "X-VALUE: ", "ENTER"];
var value_val = [1, ["0"], ""];

var dydx_ops = ["FUNCTION: Y", "X-VALUE: ", "ENTER"];
var dydx_val = [1, ["0"], ""];

var inte_ops = ["FUNCTION: Y", "LEFT-X-BOUND: ", "RIGHT-X-BOUND: ", "ENTER"];
var inte_val = [1, ["0"], ["0"], ""];

var zero_ops = ["FUNCTION: Y", "ENTER"];
var zero_val = [1, ""];

var intersect_ops = ["FUNCTION-1: Y", "FUNCTION-1: Y", "ENTER"];
var intersect_val = [1, 2, ""];

function reset_all_val() {
  value_val = [1, ["0"], ""];
  dydx_val = [1, ["0"], ""];
  inte_val = [1, ["-1"], ["1"], ""];
  zero_val = [1, ""];
  intersect_val = [1, 2, ""];
}

var val = [];
var ops = [];

function display_calc(option) {
  updateGraphDimensions(); redrawGraph('simple_graph_gui', 'graph');
  set_mode(option);
  if (option == "value") {
    ops = value_ops;
    val = value_val;
  }
  else if (option == "dydx") {
    ops = dydx_ops;
    val = dydx_val;
  }
  else if (["inte", "minimum", "maximum"].includes(option)) {
    ops = inte_ops;
    val = inte_val;
  }
  else if (option == "zero") {
    ops = zero_ops;
    val = zero_val;
  }
  else if (option == "intersect") {
    ops = intersect_ops;
    val = intersect_val;
  }
  var val2 = [];
  val2.push(val[0]);
  if (option == "intersect") {
    val2.push(val[1]);
  }
  if (["inte", "dydx", "value", "minimum", "maximum"].includes(option)) {
    val2.push(compiled_value());
  }
  if (["inte", "minimum", "maximum"].includes(option)) {
    val2.push(compiled_value2());
  }
  val2.push("");
  var display_text = "<b>CALCULATE > " + option + "</b><br><br><br><br>";
  for (var i = 0; i < ops.length; i++) {
    if (i == row_ind) {
      display_text += "<b>&nbsp;" + ops[i] + "</b><u>" + val2[i] + "</u>" + "<br><br>";
    }
    else {
      display_text += "&nbsp;" + ops[i] + "<u>" + val2[i] + "</u>" + "<br><br>";
    }
  }
  document.getElementById("math--screen").innerHTML = display_text;
  for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
    document.getElementsByClassName("screen")[i].style.display = "none";
  }
  document.getElementById("math--screen").style.display = "block";
}

function compiled_value() {
  var op = "";
  for (var i = 0; i < val[1].length; i++) {
    op += val[1][i];
  }
  return op;
}
function compiled_value2() {
  var op = "";
  for (var i = 0; i < val[2].length; i++) {
    op += val[2][i];
  }
  return op;
}

function display_calc_op(option) {
  if (["inte", "maximum", "minimum"].includes(option)) {
    if (isNaN(Number(compiled_value())) || isNaN(Number(compiled_value2())) || Number(compiled_value()) >= Number(compiled_value2())) {
      val = [1, ["0"], ["0"], ""];
    }
  }
  else if (option == "intersect") {
    if (val[0] == val[1]) {
      val = [1, 2, ""];
    }
  }
  else {
    if (isNaN(Number(compiled_value()))) {
      val = [1, ["0"], ""];
    }
  }
  if (option == "value") {
    input("solveFor(");
  }
  else if (option == "dydx") {
    input("nDeriv(");
  }
  else if (option == "inte") {
    input("fnInt(");
  }
  else if (option == "minimum") {
    input("min(");
  }
  else if (option == "maximum") {
    input("max(");
  }
  else if (option == "zero") {
    input("zero(");
  }
  else if (option == "intersect") {
    input("intersect(");
  }
  input("Y" + val[0]);
  input(",");
  if (["zero"].includes(option)) {
    backspace();
  }
  if (["inte", "dydx", "value", "minimum", "maximum"].includes(option)) {
    input(Number(compiled_value()));
  }
  if (["inte", "minimum", "maximum"].includes(option)) {
    input(",");
    input(Number(compiled_value2()));
  }
  if (option == "intersect") {
    input("Y" + val[1]);
  }
  input(")");
}



var trace_x = 10000.1
var trace_y = 0;
var isTrace = false;
var traceIndex = 0;

function graph_trace() {
  if (game_on) {
    equation_skipped();
    return;
  }
  else {
    isTrace = true;
    for (var i = y_functions.length - 1; i >= 0; i--) {
      if (solve(y_functions[i]).length > 0) {
        traceIndex = i;
      }
    }
    var compiled_function = solve(y_functions[traceIndex]);
    trace_x = 0;
    trace_y = Number(nerdamer(compiled_function, { x: trace_x }).evaluate());
    redrawGraph('simple_graph_gui', 'graph');
  }
}
function trace(direction) {
  if (isTrace) {
    if (direction == "left") {
      trace_x -= .5;
    }
    else if (direction == "right") {
      trace_x += .5;
    }
    else if (direction == "up") {
      traceIndex++;
      if (traceIndex == y_functions.length) {
        traceIndex = 0;
      }
      if (solve(y_functions[traceIndex]).length == 0) {
        trace("up");
        return;
      }
    }
    else if (direction == "down") {
      traceIndex--;
      if (traceIndex == -1) {
        traceIndex = y_functions.length - 1;
      }
      if (solve(y_functions[traceIndex]).length == 0) {
        trace("down");
        return;
      }
    }
    var compiled_function = solve(y_functions[traceIndex]);
    trace_y = Number(nerdamer(compiled_function, { x: trace_x }).evaluate());
  }
  else if (trace_x == 10000.1) {
    trace_x = 0;
  }
  else {
    if (direction == "left") {
      trace_x -= .5;
    }
    else if (direction == "right") {
      trace_x += .5;
    }
    else if (direction == "down") {
      trace_y -= .5;
    }
    else if (direction == "up") {
      trace_y += .5;
    }
  }
  redrawGraph('simple_graph_gui', 'graph');
}

function getTraceCoord() {
  if (isTrace || !(trace_x == 10000.1)) {
    return "(" + trace_x + ", " + Math.round(trace_y * 10000) / 10000 + ")";
  }
  else {
    return "";
  }
}