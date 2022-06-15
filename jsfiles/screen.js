var row = [];

var row_index = 0;
var col_index = 0;

var order_list = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function reset_screen_index() {
  row_index = 0;
  col_index = 0;
}

function get_order_list() {
  return order_list;
}


function display_screen(screen) {
  if (is_on()) {
    return_default_buttons();
    if (screen == "math") {
      row = [["MATH", ">Frac", ">Dec", "^3", "^(1/3)", "^(1/X", "<i>fMin(</i>", "<i>fMax(</i>", "nDeriv(", "fnInt(", "Summation E(", "logBASE(", "Numeric Solver...", "integrate(", "diff(", "factor("]
        , ["NUM", "abs(", "round(", "<i>iPart(</i>", "<i>fPart</i>", "int(", "min(", "max(", "lcm(", "gcd(", "<i>remainder(</i>", "<i>>n/d<>Un/d</i>", "<i>>F<>D</i>", "<i>Un/d</i>", "<i>n/d</i>"]
        , ["CMX", "<i>conj(</i>", "<i>real(</i>", "<i>imag(</i>", "<i>angle(</i>", "<i>abs(</i>", "<i>>Rect</i>", "<i>>Polar</i>"]
        , ["PRB", "rand", "<i>nPr</i>", "<i>nCr</i>", "!", "<i>randInt(</i>", "<i>randNorm(</i>", "<i>randBin(</i>", "<i>randIntNoRep(</i>"]
        , ["FRC", "<i>n/d</i>", "<i>Un/d</i>", "<i>>F<>D</i>", "<i>>n/d<>Un/d</i>"]];
    }
    else if (screen == "apps") {
      row = [["No applications :(", "2nd > quit"]];
    }
    else if (screen == "prgm") {
      row = [["No programs :(", "2nd > quit"]];
    }
    else if (screen == "vars") {
      row = [["VARS", "<i>Window...</i>", "<i>Zoom...</i>", "<i>GDB...</i>", "<i>Picture + Bckgrnd...</i>", "<i>Statistics...</i>", "<i>Table...</i>", "<i>String..."]
        , ["Y-VARS", "Function...", "<i>Parametric...</i>", "<i>Polar...</i>", "<i>On/Off..."]
        , ["COLOR", "<i>BLUE</i>", "<i>RED</i>", "<i>BLACK</i>", "<i>MAGENTA</i>", "<i>GREEN</i>", "<i>ORANGE</i>", "<i>BROWN</i>", "<i>NAVY</i>", "<i>LTBLUE</i>", "<i>YELLOW</i>", "<i>WHITE</i>", "<i>LTGRAY</i>", "<i>MEDGRAY</i>", "<i>GRAY</i>", "<i>DARKGRAY"]];
    }
    else if (screen == "stat") {
      row = [["EDIT", "Edit...", "SortA(", "SortD(", "ClrList", "<i>SetUpEditor</i>"]
        , ["CALC", "1-Var Stats", "2-Var Stats", "<i>Med-Med", "<i>LinReg(ax+b)", "<i>QuadReg</i>", "<i>CubicReg</i>", "<i>QuartReg</i>", "<i>LinReg(a+bx)</i>", "<i>LnReg</i>", "<i>ExpReg</i>", "<i>PwrReg</i>", "<i>Logistic</i>", "<i>SinReg</i>", "<i>Mnl-Fit Y=mX+b</i>", "<i>QckPlt&FitEQ</i>"]
        , ["TESTS", "<i>Z-Test...</i>", "<i>T-Test...</i>", "<i>2-SampZTest...</i>", "<i>2-SampTTest...</i>", "<i>1-PropZTest...</i>", "<i>2-PropZTest...</i>", "<i>ZInterval...</i>", "<i>TInterval...</i>", "<i>2-SampZInt...</i>", "<i>2-SampTInt...</i>", "<i>1-PropZInt...</i>", "<i>2-PropZInt...</i>", "<i>X^2-Test...</i>", "<i>X^2GOF-Test...</i>", "<i>2-SampFTest...</i>", "<i>LinRegTTest...</i>", "<i>LinRegTInt...</i>", "<i>ANOVA(</i>"]];
    }
    else if (screen == "zoom") {
      if (game_on) {
        equation_skipped();
        return;
      }
      row = [["ZOOM", "ZBox", "Zoom In", "Zoom Out", "ZDecimal", "ZSquare", "ZStandard", "<i>ZTrig</i>", "<i>ZInteger</i>", "<i>ZoomStat</i>", "<i>ZoomFit</i>", "ZQuadrant1", "ZFrac1/2", "ZFrac1/3", "ZFrac1/4", "ZFrac1/5", "ZFrac1/8", "ZFrac1/10"]
        , ["MEMORY", "ZPrevious", "<i>ZoomSto</i>", "<i>ZoomRcl</i>", "<i>SetFactors...</i>"]];
    }
    else if (screen == "test") {
      row = [["TEST", "<i>=</i>", "<i>&#8800;</i>", "<i>></i>", "<i>>=</i>", "<i><</i>", "<i><=</i>"]
        , ["LOGIC", "<i>and</i>", "<i>or</i>", "<i>xor</i>", "<i>not(</i>"]];
    }
    else if (screen == "link") {
      row = [["SEND", "<i>All+...</i>", "<i>All-...</i>", "<i>Prgm...</i>", "<i>List...</i>", "<i>GDB...</i>", "<i>Pic&Img...</i>", "<i>Matrix...</i>", "<i>Real...</i>", "<i>Complex...</i>", "Y-Vars...", "<i>String...</i>", "<i>Apps...</i>", "<i>AppVars...</i>", "<i>Group...</i>", "<i>SendOS"]
        , ["RECEIVE", "<i>Receive</i>"]]
    }
    else if (screen == "list") {
      row = [["NAMES", "L1", "L2", "L3", "L4", "L5", "L6", "<i>CNTRB</i>", "<i>QPX</i>", "<i>QPY</i>"]
        , ["OPS", "SortA(", "SortD(", "<i>dim(</i>", "<i>Fill(</i>", "<i>seq(</i>", "cumSum(", "<i>List(</i>", "<i>Select(</i>", "<i>augment(</i>", "<i>List>matr(</i>", "<i>Matr>list(</i>", "<i>L</i>"]
        , ["MATH", "min(", "max(", "mean(", "median(", "sum(", "prod(", "stdDev(", "variance("]]
    }
    else if (screen == "angle") {
      row = [["ANGLE", "<i>o</i>", "<i>'</i>", "<i>r</i>", "<i>>DMS</i>", "<i>R>Pr(</i>", "<i>R>P0(</i>", "<i>P>Rx(</i>", "<i>P>Ry</i>"]]
    }
    else if (screen == "draw") {
      row = [["DRAW", "<i>ClrDraw</i>", "<i>Line(</i>", "<i>Horizontal</i>", "<i>Vertical</i>", "<i>Tangent(</i>", "<i>DrawF</i>", "<i>Shade(</i>", "<i>DrawInv</i>", "<i>Circle(</i>", "<i>Test(</i>", "<i>Pen</i>"]
        , ["PNTS", "<i>Pt-On(</i>", "<i>Pt-Off(</i>", "<i>Pt-Change(</i>", "<i>Pxl-On(</i>", "<i>Pxl-Off(</i>", "<i>Pxl-Change(</i>", "<i>pxl-Test(</i>"]
        , ["STO", "<i>StorePic</i>", "<i>RecallPic</i>", "<i>StoreGDB</i>", "<i>RecallGDB</i>"]
        , ["BCKGRND", "<i>BackgroundOn</i>", "<i>BackgroundOff</i>"]]
    }
    else if (screen == "distr") {
      row = [["DISTR", "<i>normalpdf(</i>", "<i>normalcdf(</i>", "<i>invNorm(</i>", "<i>invT(</i>", "<i>tpdf(</i>", "<i>tcdf(</i>", "<i>X^2pdf(</i>", "<i>X^2cdf(</i>", "<i>Fpdf(</i>", "<i>Fcdf(</i>", "<i>binompdf(</i>", "<i>binomcdf(</i>", "<i>invBinom(</i>", "<i>poissonpdf(</i>", "<i>poissoncdf(</i>", "<i>geometpdf(</i>", "<i>geometcdf(</i>"]
        , ["DRAW", "<i>ShadeNorm(</i>", "<i>Shade-t(</i>", "<i>ShadeX^2(</i>", "<i>ShadeF(</i>"]]
    }
    else if (screen == "matrix") {
      row = [["NAMES"].concat(matrix_getNameAll())
        , ["MATH", "<i>det(</i>", "<i>T</i>", "<i>dim(</i>", "<i>Fill(</i>", "<i>identity(</i>", "<i>randM(</i>", "<i>augment(</i>", "<i>Matr>list(</i>", "<i>List>matr(</i>", "<i>cumSum(</i>", "<i>ref(</i>", "rref(", "<i>rowSwap(</i>", "<i>row+(</i>", "<i>*row(</i>", "<i>*row+(</i>"]
        , ["EDIT"].concat(matrix_getNameAll())]
    }
    else if (screen == "calc") {
      row = [["CALCULATE", "value", "zero", "minimum", "maximum", "intersect", "dy/dx", "integral f(x)dx"]];
    }
    else if (screen == "mem") {
      row = [["MEMORY", "<i>About</i>", "<i>Mem Mngmnt/Dlt...</i>", "Clear Entries", "ClrAllLists", "<i>Archive</i>", "<i>UnArchive</i>", "Reset...", "<i>Group...</i>"]]
    }
    else if (screen == "st plot") {
      row = [["STAT PLOTS", "Plot...", "PlotOff", "PlotOn"]];
    }
    else if (screen == "function") {
      row = [["FUCNTION", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y0"]];
    }
    else if (screen == "catalog") {
      row = [["ALL CATALOG", "math...", "apps...", "prgm...", "vars...", "stat...", "zoom...", "test...", "link...", "list...", "angle...", "draw...", "distr...", "matrix...", "calc...", "mem...", "st plot...", "function...", "mode..."].sort()]
    }
    else if (screen == "mode") {
      row = [["MODE (modified)", "Radian Mode: " + is_rad_bool(), "Degree Mode: " + is_deg_bool()]]
    }
    else if (screen == "format") {
      row = [["FORMAT (none)", "2nd > quit"]]
    }
    else if (screen == "bl") {
      row = [[]
        , []]
    }
    reset_screen_index();
    display_col();
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
      document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("math--screen").style.display = "block";
    set_mode(screen);
  }
}

var rad_bool = true;
var deg_bool = false;
function is_rad_bool()
{
  if(rad_bool)
  {
    return "ON";
  }
  else
  {
    return "OFF";
  }
}
function is_deg_bool()
{
  if(deg_bool)
  {
    return "ON";
  }
  else
  {
    return "OFF";
  }
}


function display_col() {
  var op = "";
  for (var i = 0; i < row.length; i++) {
    if (row_index == i) {
      op += "<b>" + row[i][0] + "</b> ";
    }
    else {
      op += row[i][0] + " ";
    }
  }
  for (var i = col_index; i < row[row_index].length - 1 && i < 12 + col_index; i++) {
    if (col_index == i) {
      op += "<b><br>" + order_list[i] + ":" + row[row_index][i + 1] + "</b>";
    }
    else {
      op += "<br>" + order_list[i] + ":" + row[row_index][i + 1];
    }
  }
  document.getElementById("math--screen").innerHTML = op;
}

function uses_arrow_functions() {
  return ["math", "mode", "vars", "stat", "zoom", "test", "link", "list", "angle", "draw", "distr", "matrix", "mem", "calc", "st plot", "value", "dydx", "inte", "function", "intersect", "zero", "minimum", "maximum", "list_edit", "catalog"].includes(get_mode());
}

function arrow_down() {
  if (get_mode() == "main" && inputs_list.length > 0) {
    if (inputs_list_index >= inputs_list.length - 1) {
      inputs_list_index = inputs_list.length - 2;
    }
    inputs_list_index++;

    if (inputs_list[inputs_list_index] == "ERR") {
      arrow_up();
    }
    calc_input = [inputs_list[inputs_list_index]];
    update_screen();
  }
  else if (get_mode() == "graph") {
    trace("down");
  }
  else if (uses_arrow_functions() && !["value", "dydx", "inte", "intersect", "plot", "zero", "minimum", "maximum", "list_edit", "matrix_edit"].includes(get_mode())) {
    if (col_index < row[row_index].length - 2) {
      col_index++;
    }
    else {
      col_index = 0;
    }
    display_col();
  }
  else if (["y=", "table", "window", "tblset", "value", "dydx", "inte", "intersect", "plot", "zero", "minimum", "maximum", "list_edit", "matrix_edit"].includes(get_mode())) {
    ind_shift("down");
  }
}
function arrow_up() {
  if (get_mode() == "main" && inputs_list.length > 0) {
    if (inputs_list_index == 0) {
      inputs_list_index = inputs_list.length;
    }
    inputs_list_index--;

    if (inputs_list[inputs_list_index] == "ERR") {
      arrow_up();
    }
    calc_input = [inputs_list[inputs_list_index]];
    update_screen();
  }
  else if (get_mode() == "graph") {
    trace("up");
  }
  else if (uses_arrow_functions() && !["value", "dydx", "inte", "intersect", "plot", "zero", "minimum", "maximum", "list_edit", "matrix_edit"].includes(get_mode())) {
    if (col_index > 0) {
      col_index--;
    }
    else {
      col_index = row[row_index].length - 2;
    }
    display_col();
  }
  else if (["y=", "table", "window", "tblset", "value", "dydx", "inte", "intersect", "plot", "zero", "minimum", "maximum", "list_edit", "matrix_edit"].includes(get_mode())) {
    ind_shift("up");
  }
}
function arrow_right() {
  if (get_mode() == "main") {
    insert_cursor("right");
  }
  else if (uses_arrow_functions() && !["value", "dydx", "inte", "intersect", "zero", "minimum", "maximum", "list_edit", "matrix_edit"].includes(get_mode())) {
    if (row_index < row.length - 1) {
      row_index++;
    }
    else {
      row_index = 0;
    }
    col_index = 0;
    display_col();
  }
  else if (get_mode() == "graph") {
    trace("right");
  }
  else if (["table", "list_edit", "matrix_edit"].includes(get_mode())) {
    ind_shift("right");
  }
}
function arrow_left() {
  if (get_mode() == "main") {
    insert_cursor("left");
  }
  else if (uses_arrow_functions() && !["value", "dydx", "inte", "intersect", "zero", "minimum", "maximum", "list_edit", "matrix_edit"].includes(get_mode())) {
    if (row_index > 0) {
      row_index--;
    }
    else {
      row_index = row.length - 1;
    }
    col_index = 0;
    display_col();
  }
  else if (get_mode() == "graph") {
    trace("left");
  }
  else if (["table", "list_edit", "matrix_edit"].includes(get_mode())) {
    ind_shift("left");
  }
}

function set_screen_col(c) {
  if (c - 1 < row[row_index].length) {
    col_index = c - 1;
  }
}

function enter_screen_mode() {
  var last_mode = get_mode();
  var index_mode = row[row_index][col_index + 1];
  if (row[row_index][col_index + 1] == "dy/dx") {
    index_mode = "dydx";
  }
  else if (row[row_index][col_index + 1] == "integral f(x)dx") {
    index_mode = "inte";
  }
  display_main_screen();
  if ([">Frac", ">Dec", "abs(", "lcm(", "gcd(", "round(", "int(", "rand", "!", "fnInt(", "integrate(", "diff(", "=", "<", ">", "<=", ">=", "&#8800;", "nDeriv(", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y0", "L1", "L2", "L3", "L4", "L5", "L6", "min(", "max(", "mean(", "median(", "sum(", "prod(", "stdDev(", "variance(", "SortA(", "SortD(", "cumSum(", "rref(", "factor("].includes(index_mode)) {
    input(index_mode);
  }
  else if (index_mode == "^3") {
    input("^"); input("3");
  }
  else if (index_mode == "^(1/3)") {
    input("^"); input("(1/3)");
  }
  else if (index_mode == "^(1/X") {
    input("^"); input("(1/");
  }
  else if (index_mode == "logBASE(") {
    input("log");
  }
  else if (index_mode == "Summation E(") {
    input("sum(");
  }
  else if (["Zoom In", "Zoom Out", "ZStandard", "ZSquare", "ZQuadrant1", "ZBox", "ZPrevious"].includes(index_mode) || index_mode.includes("ZFrac")) {
    zoomGraphDimensions(index_mode);
    redrawGraph('simple_graph_gui', 'graph');
  }
  if (["value", "dydx", "inte", "intersect", "zero", "minimum", "maximum"].includes(last_mode)) {
    display_calc_op(last_mode);
  }
  else if (["value", "zero", "minimum", "maximum", "intersect", "dydx", "inte", "zero", "minimum", "maximum"].includes(index_mode)) {
    reset_ind_y();
    reset_all_val();
    display_calc(index_mode);
  }
  else if (index_mode == "Function...") {
    display_screen("function");
  }
  else if (index_mode == "Numeric Solver...") {
    display_calc("intersect");
  }
  else if (index_mode == "Edit...") {
    display_list();
  }
  else if (["1-Var Stats", "2-Var Stats", "ClrList"].includes(index_mode)) {
    input(index_mode + "(");
  }
  else if (matrix_getNameAll().includes(index_mode) && row_index == 0) {
    input(index_mode.substring(0, 4));
  }
  else if (matrix_getNameAll().includes(index_mode) && row_index == 2) {
    matrix_reset_ind();
    matrix_index = col_index;
    display_matrix();
  }
  else if (index_mode == "Plot...") {
    display_plot();
  }
  else if (index_mode == "PlotOff") {
    plotOff();
    redrawGraph('simple_graph_gui', 'graph');
  }
  else if (index_mode == "PlotOn") {
    plotOn();
    redrawGraph('simple_graph_gui', 'graph');
  }
  else if (index_mode == "Reset...") {
    resetData();
  }
  else if (index_mode == "ClrAllLists") {
    list_store = [["L1"], ["L2"], ["L3"], ["L4"], ["L5"], ["L6"], [""], [""]];
  }
  else if (index_mode == "Clear Entries") {
    calc_input = [];
    inputs_list = [];
    last_input_store = [];
    update_screen();
  }
  else if (["math...", "apps...", "prgm...", "vars...", "stat...", "zoom...", "test...", "link...", "list...", "angle...", "draw...", "distr...", "matrix...", "calc...", "mem...", "st plot...", "function..."].includes(index_mode)) {
    display_screen(index_mode.substring(0, index_mode.length - 3));
  }
  else if(index_mode.includes("Radian Mode: "))
  {
    rad_bool = true;
    deg_bool = false;
  }
  else if(index_mode.includes("Degree Mode: "))
  {
    rad_bool = false;
    deg_bool = true;
  }
}