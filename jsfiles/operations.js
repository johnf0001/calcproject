var calc_input = [];
var inputs_list = [];

var inputs_list_index = inputs_list.length;

var last_input_store = [];
var input_bool = false;
function enter_return() {
  insOff();
  if (contains_cursor()) {
    remove_cursor();
  }
  var passstat = 0;
  if (get_mode() == "y=" && row_ind == -1) {
    plotToggle();
    display_y_functions();
  }
  if (get_mode() == "plot") {
    redrawGraph('simple_graph_gui', 'graph');
    set_mode("graph");
  }
  if (calc_input[0] == "1-Var Stats(") {
    passstat = list_1varstat(calc_input[1]);
  }
  if (calc_input[0] == "2-Var Stats(") {
    passstat = list_2varstat(calc_input[1], calc_input[3]);
  }
  if (passstat == 1) {
    inputs_list.push(input_compiler());
    inputs_list.push("Done");
    calc_input = [];
    update_screen();
    set_mode("varstat");
  }
  else if (get_mode() == "varstat") {
    display_main_screen();
    return_default_buttons();
  }
  else if (uses_arrow_functions()) {
    enter_screen_mode();
  }
  else if (["apps", "prgm", "format"].includes(get_mode())) {
    // equivilant of quit button, no apps rn
    display_main_screen();
    return_default_buttons();
  }
  else if (get_mode() == "prgm") {
    // equivilant of quit button, no programs rn
    display_main_screen();
    return_default_buttons();
  }
  else if (get_mode() == "main") {
    if (calc_input.length == 0 && last_input_store.length != 0) {
      calc_input = Array.from(last_input_store);
    }
    else if (calc_input.length == 0 && last_input_store.length == 0) {
      return false;
    }
    else {
      input_bool = true;
      inputs_list.push(input_compiler());
      inputs_list.push(solve(calc_input));
      calc_input = [];
    }
    if (game_on && inputs_list[inputs_list.length - 1] == (math_equation[math_equation.length - 1] + "")) {
      equation_solved(inputs_list[inputs_list.length - 2].length);
    }
    else if(game_on && !(inputs_list[inputs_list.length - 1] == (math_equation[math_equation.length - 1] + "")))
    {
      
    }
    inputs_list_index = inputs_list.length;
    update_screen();
  }
}

function input(e) {
  if (contains_cursor()) {
    cursor_replace(e);
    return;
  }
  if (is_on() && document.getElementById("main--screen").style.display == "block") {
    if (game_on && !get_raw_options().includes(e)) {
      return;
    }
    if (calc_input[0] == "ERR") {
      calc_input = [];
    }
    if (calc_input.length == 0 && ['+', '-', '*', '^', '/', '->', '>Frac', '>Dec'].includes(e)) {
      input('Ans');
    }
    if (last_input_store.length > 0 && input_bool) {
      last_input_store = [];
      input_bool = false;
    }
    last_input_store.push(e);
    calc_input.push(e);
    if (calc_input[calc_input.length - 2] == "log") {
      calc_input.push("(");
    }
    update_screen();
  }
  else if (document.getElementById("math--screen").style.display == "block" && get_order_list().includes(e.toString()) && !(["y=", "window", "tblset", "value", "dydx", "inte", "intersect", "plot", "zero", "minimum", "maximum", "list_edit", "matrix_edit"].includes(get_mode()))) {
    var index = 0;
    var order_list = get_order_list();
    for (var i = 0; i < get_order_list().length; i++) {
      if ((order_list[i] + "") == (e + "")) {
        index = i + 1;
      }
    }
    set_screen_col(index);
    enter_screen_mode();
  }
  else if (["y=", "window", "tblset", "value", "dydx", "inte", "intersect", "zero", "minimum", "maximum"].includes(get_mode())) {
    graph_input(e);
  }
  else if (get_mode() == "plot") {
    plot_input(e);
  }
  else if (["list_edit"].includes(get_mode())) {
    list_input(e);
  }
  else if (["matrix_edit"].includes(get_mode())) {
    matrix_input(e);
  }
  return_default_buttons();
}

function clear_input() {
  if (is_on()) {
    insOff();
    if (get_mode() == "main") {
      if (calc_input.length > 0) {
        calc_input = [];
      }
      else {
        inputs_list = [];
      }
      update_screen();
    }
    else if (["y=", "window", "tblset", "value", "dydx", "inte", "intersect", "minimum", "maximum"].includes(get_mode())) {
      clear_graph();
    }
    else if (["list_edit"].includes(get_mode())) {
      list_clear();
    }
    else if (["matrix_edit"].includes(get_mode())) {
      matrix_backspace(true);
    }

    if (game_on) {
      inputs_list.push(" ");
      inputs_list.push(" ");
      display_main_screen();
    }
  }
}
function backspace() {
  if (is_on()) {
    if (get_mode() == "main") {
      insOff();
      if (contains_cursor()) {
        cursor_replace("");
      }
      else {
        if (calc_input.length > 0) {
          calc_input.pop();
        }
        // after removing, if theres a cos, sin, tan etc without a (, delete that too
        if (calc_input.length > 0 && ["cos", "sin", "tan", "√", "sin^-1", "cos^-1", "tan^-1"].includes(calc_input[calc_input.length - 1])) {
          calc_input.pop();
        }
      }
      update_screen();
    }
    else if (["y=", "window", "tblset", "value", "dydx", "inte", "intersect", "minimum", "maximum"].includes(get_mode())) {
      backspace_graph();
    }
    else if (["list_edit"].includes(get_mode())) {
      list_del();
    }
    else if (["matrix_edit"].includes(get_mode())) {
      matrix_backspace(false);
    }
  }
}

function update_screen() {
  var compiled_input = input_compiler();
  var output = "";
  // start index to limit lines on screen
  index = 0;
  if (inputs_list.length > 13) {
    index = inputs_list.length - 12;
  }
  var ans_bool = true;
  for (var i = index; i < inputs_list.length; i++) {
    var output_line = inputs_list[i];
    if (output_line.length > 24) {
      output_line = inputs_list[i].substring(0, 24);
    }
    // shift answer to right side of calculator
    ans_bool = !ans_bool;
    if (ans_bool) {
      var index2 = (output_line + "").length;
      while (index2 < 25) {
        index2++;
        output_line = "&nbsp;" + output_line;
      }
    }
    output += output_line + "<br>";
  }
  output += compiled_input;
  document.getElementById("main--screen").innerHTML = output;
}

function input_compiler() {
  var compiled_input = "";
  for (var i = 0; i < calc_input.length; i++) {
    if (calc_input[i] == "log10(") {
      compiled_input += "log(";
    }
    else if (calc_input[i] == "log(") {
      compiled_input += "ln(";
    }
    else {
      compiled_input += calc_input[i];
    }
  }
  if (compiled_input.length > 24) {
    if (contains_cursor()) {
      var right = 0;
      if (cursor_index() < 24) {
        right = 23 - cursor_index();
      }
      compiled_input = compiled_input.substring(cursor_index() - 23, cursor_index() + 9 + right);
    }
    else {
      compiled_input = compiled_input.substring(compiled_input.length - 24, compiled_input.length);
    }
  }
  return compiled_input;
}

var dark_mode_bool = false;
function toggle_screen_color() {
  dark_mode_bool = !dark_mode_bool;
  set_screen_color();
}

function get_dark_mode_bool() {
  return dark_mode_bool;
}

function set_screen_color() {
  if (dark_mode_bool) {
    document.body.style.backgroundColor = "#262c43";
    document.getElementById("background--id").style.backgroundColor = "#262c43";
    document.getElementById("darkmode--label--id").style.backgroundColor = "#e8e8ea";
    document.getElementById("darkmode--label--id").style.borderColor = "#5d6baa";
    if (is_on()) {
      for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
        document.getElementsByClassName("screen")[i].style.backgroundColor = "darkslategray";
        document.getElementsByClassName("screen")[i].style.color = "white";
        if (get_mode() == "graph") {
          redrawGraph('simple_graph_gui', 'graph');
        }
      }
    }
  }
  else {
    document.body.style.backgroundColor = "#c2e9f6";
    document.getElementById("background--id").style.backgroundColor = "#c2e9f6";
    document.getElementById("darkmode--label--id").style.backgroundColor = "#eee259";
    document.getElementById("darkmode--label--id").style.borderColor = "#72cce3";
    if (is_on()) {
      for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
        document.getElementsByClassName("screen")[i].style.backgroundColor = "white";
        document.getElementsByClassName("screen")[i].style.color = "black";
        if (get_mode() == "graph") {
          redrawGraph('simple_graph_gui', 'graph');
        }
      }
    }
  }
}

function turnon() {
  if (!is_on()) {
    on_bool = true;
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
      document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("main--screen").style.display = "block";
    set_screen_color();
    return_default_buttons();
    update_screen_opacity();
    set_mode("main");
    update_screen();
  }
}
function turnoff() {
  if (is_on()) {
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
      document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("main--screen").style.display = "block";
    document.getElementById("main--screen").style.backgroundColor = "black";
    document.getElementById("main--screen").style.color = document.getElementById("main--screen").style.backgroundColor;
    return_default_buttons();
    on_bool = false;
    set_mode("main");
  }
}

function toggle_2nd() {
  alpha_locked = false;
  if (is_on()) {
    if (document.getElementById("default").style.display == 'table') {
      document.getElementById("default").style.display = 'none';
      document.getElementById("second").style.display = 'table';
      return;
    }
    else if (document.getElementById("alpha").style.display == 'table') {
      document.getElementById("alpha").style.display = 'none';
      document.getElementById("second").style.display = 'table';
      return;
    }
    else {
      document.getElementById("default").style.display = 'table';
      document.getElementById("second").style.display = 'none';
      return;
    }
  }
}
function toggle_alpha() {
  if (is_on()) {
    if (document.getElementById("default").style.display == 'table') {
      document.getElementById("default").style.display = 'none';
      document.getElementById("alpha").style.display = 'table';
      return;
    }
    else if (document.getElementById("alpha").style.display == 'table') {
      document.getElementById("alpha").style.display = 'none';
      document.getElementById("default").style.display = 'table';
      return;
    }
    else {
      document.getElementById("default").style.display = 'table';
      document.getElementById("second").style.display = 'none';
      return;
    }
  }
}

var on_bool = false;
function is_on() {
  return on_bool;
}

function return_default_buttons() {
  if (!alpha_locked) {
    if (document.getElementById("second").style.display == 'table') {
      document.getElementById("default").style.display = 'table';
      document.getElementById("second").style.display = 'none';
    }
    if (document.getElementById("alpha").style.display == 'table') {
      document.getElementById("alpha").style.display = 'none';
      document.getElementById("default").style.display = 'table';
    }
  }
}

var alpha_locked = false;
function alpha_lock() {
  if (!alpha_locked) {
    alpha_locked = true;
    document.getElementById("second").style.display = 'none';
    document.getElementById("default").style.display = 'none';
    document.getElementById("alpha").style.display = 'table';
  }
}

function alpha_return() {
  if (!alpha_locked) {
    return_default_buttons();
  }
}

function display_main_screen() {
  for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
    document.getElementsByClassName("screen")[i].style.display = "none";
  }
  document.getElementById("main--screen").style.display = "block";
  set_mode("main");
}