var alpha_store = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var previous_output_store = "0";
var last_equation_store = ["0"];


function solve(input) {
  var integrate_bool = false;
  if (input[0] == "integrate(") {
    integrate_bool = true;
    input.shift();
    if (input[input.length - 1] == ")") {
      input.pop();
    }
  }
  var solvefor_bool = false;
  if (input[0] == "solveFor(") {
    if (!(input.length > 1 && input[1].length > 1)) {
      input.push("()");
    }
    else {
      solvefor_bool = true;
      input[1] = compile_y_functions()[parseInt(input[1].charAt(1)) - 1];
    }
  }
  for (var i = 0; i < input.length; i++) {
    if (["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y0"].includes(input[i]) && !["intersect(", "zero(", "min(", "max("].includes(input[0]) && !input.includes("->")) {
      if(input[i] == "Y0")
      {
        input[i] = compile_y_functions()[9];
      }
      else
      {
        input[i] = compile_y_functions()[parseInt(input[i].charAt(1)) - 1];
      }
    }
  }
  if (is_ok(input)) {
    // STORE FUNCTION - shouldnt check stuff here, should already be good to go
    if (input.includes("->")) {
      // split calc_input over &#10145; and store left in right
      var new_input = [];
      for (var i = 0; i < input.length - 2; i++) {
        if (input[i] == "Ans") {
          input[i] = '(' + previous_output_store + ')';
        }
        new_input.push(input[i]);
      }
      if (["Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y0"].includes(input[input.length - 1])) {
        for (var i = 0; i < new_input.length; i++) {
          y_functions[parseInt(input[input.length - 1].charAt(1)) - 1].push(new_input[i]);
        }
        return solve(["solveFor(", "Y" + input[input.length - 1].charAt(1), ",", "0", ")"]);
      }
      else {
        alpha_store[input[input.length - 1].charCodeAt(0) - 65] = solve(new_input);
        return solve(new_input);
      }
    }
    else {
      var output_value = "";
      var convert_decimal = false;
      var convert_fraction = false;
      var derive_bool = false;
      var nderive_bool = false;
      var intersect_bool = false;
      var zero_bool = false;
      var min_max_bool = false;
      var rref_bool = false;
      // get compiled input
      var compiled_input = "";
      var list_bool = false;
      for (var i = 0; i < input.length; i++) {
        if (input[i] == "mean(") {
          output_value = list_mean(input[i + 1]).toString();
        }
        else if (input[i] == "rref(") {
          rref_bool = true;
        }
        else if (input[i] == "median(") {
          output_value = list_median(input[i + 1]).toString();
        }
        else if (input[i] == "ClrList(") {
          output_value = list_clear_whole(input[i + 1]).toString();
        }
        else if (input[i] == "sum(") {
          output_value = list_sum(input[i + 1]).toString();
        }
        else if (input[i] == "stdDev(") {
          output_value = list_stddev(input[i + 1]).toString();
        }
        else if (input[i] == "variance(") {
          output_value = list_variance(input[i + 1]).toString();
        }
        else if (input[i] == "SortA(") {
          output_value = list_SortA(input[i + 1]).toString();
        }
        else if (input[i] == "SortD(") {
          output_value = list_SortD(input[i + 1]).toString();
        }
        else if (input[i] == "cumSum(") {
          output_value = list_cumSum(input[i + 1]).toString();
        }
        else if (["L1", "L2", "L3", "L4", "L5", "L6"].includes(input[i]) && output_value.length == 0) {
          input[i] = list_retrieve(input[i]);
          list_bool = true;
        }
        else if (matrix_getNameAll(true).includes(input[i]) && !rref_bool) {
          set_matrix_by_name(input[i]);
          if (matrix_store[matrix_index].toString().length > 0) {
            output_value = "[" + matrix_store[matrix_index].toString() + "]";
          }
          else {
            output_value = "[]";
          }
        }
        else if (input[i] == "e") {
          input[i] = "(e)";
        }
        else if (input[i] == "min(" || input[i] == "max(") {
          min_max_bool = true;
        }
        else if (input[i] == "intersect(") {
          intersect_bool = true;
        }
        else if (input[i] == "zero(") {
          zero_bool = true;
        }
        else if (input[i] == "diff(" || input[i] == "factor(") {
          derive_bool = true;
        }
        else if (input[i] == "nDeriv(") {
          nderive_bool = true;
          input[i] = "diff(";
        }
        else if (input[i] == "!") {
          input[i] = "(factorial(";
          input.push("))");
        }
        else if (input[i] == "fnInt(") {
          input[i] = "defint(";
        }
        else if (input[i] == "." && (i == 0 || isNaN(input[i - 1]))) {
          input[i] = 0 + input[i];
        }
        else if (input[i] == "int(") {
          input[i] = "round(";
        }
        else if (input[i] == "rand") {
          input[i] = Math.random() + "";
        }
        // convert to decimal
        else if (input[i] == ">Dec") {
          convert_decimal = true;
          input[i] = "(1)";
        }
        // convert to fraction
        else if (input[i] == ">Frac") {
          convert_fraction = true;
          input[i] = "(1)";
          if (i == 0) {
            input[i] = "NaN";
          }
        }
        else if (input[i] == "log" && !isNaN(input[i + 1])) {
          var base = input[i + 1];
          input.splice(i + 1, 1);
          for (var j = i; j < input.length; j++) {
            if (input[j] == ")") {
              input.splice(j + 1, 0, "/log(" + base + ")")
            }
          }
        }
        else if ((input[i] + "").includes("Ans")) {
          input[i] = input[i].replaceAll("Ans", '(' + previous_output_store + ')');
        }
        else if (input[i] == "e+") {
          input[i] = 'e+0';
        }
        else if (["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].includes(input[i])) {
          input[i] = '(' + alpha_store[input[i].charCodeAt(0) - 65] + ')';
        }
        // make inverse sin,cos,tan useable
        else if (["sin^-1", "cos^-1", "tan^-1"].includes(input[i])) {
          input[i] = input[i].slice(0, -3);
          var index_l = 0;
          for (var j = i; j < input.length; j++) {
            if ((input[j] + "") == "(") {
              index_l++;
            }
            if ((input[j] + "") == ")") {
              index_l--;
              if (index_l == 0) {
                input[j] = ")^(-1)";
              }
            }
          }
        }
        else if (input[i] == "√") {
          input[i] = "(1)";
          var index_l = 0;
          for (var j = i; j < input.length; j++) {
            if ((input[j] + "") == "(") {
              index_l++;
            }
            if ((input[j] + "") == ")") {
              index_l--;
              if (index_l == 0) {
                input[j] = ")^(1/2)";
              }
            }
          }
        }
        compiled_input += input[i];
      }
      if (get_mode() == "y=" || get_mode() == "table" || get_mode() == "graph") {
        return compiled_input;
      }
      var output = "";
      // change output to ERR if NaN, only store if not ERR
      // try and catch now, errors will all be ERR
      try {
        if (convert_fraction) {
          output = nerdamer(compiled_input).text('fractions');
        }
        else if (output_value.length > 0) {
          output = output_value;
          output_value = "";
        }
        else if (list_bool) {
          compiled_input = compiled_input.replace("((", "(");
          compiled_input = compiled_input.replace("))", ")");
          output = nerdamer(compiled_input);
        }
        else if (integrate_bool) {
          output = nerdamer.integrate(compiled_input.toString()).text('fractions');
        }
        else if (derive_bool) {
          output = nerdamer(compiled_input).text('fractions');
        }
        else if (rref_bool) {
          output = matrix_rref(input[1]);
        }
        else if (nderive_bool) {
          var compiled_input2 = compiled_input.substring(compiled_input.indexOf(","), compiled_input.length);
          var xval = compiled_input2.substring(compiled_input2.indexOf(",") + 1, compiled_input2.indexOf(")"));
          compiled_input = compiled_input.substring(0, compiled_input.indexOf(",")) + ")";
          output = nerdamer(nerdamer(compiled_input), { x: xval }).evaluate().text('decimals', 7);
        }
        else if (solvefor_bool) {
          var compiled_input2 = compiled_input.substring(compiled_input.indexOf(","), compiled_input.length);
          var xval = compiled_input2.substring(compiled_input2.indexOf(",") + 1, compiled_input2.indexOf(")"));
          compiled_input = input[1];
          output = nerdamer(compiled_input).evaluate({ x: xval }).text('decimals', 7);
        }
        else if (intersect_bool) {
          output = nerdamer.solveEquations("(" + compile_y_functions()[parseInt(input[1].charAt(1)) - 1] + ")=(" + compile_y_functions()[parseInt(input[3].charAt(1)) - 1] + ")", 'x');
        }
        else if (zero_bool) {
          output = nerdamer.solveEquations("(" + compile_y_functions()[parseInt(input[1].charAt(1)) - 1] + ")=(0)", 'x');
        }
        else if (min_max_bool) {
          var f = compile_y_functions()[parseInt(input[1].charAt(1)) - 1];
          var deriv_f = nerdamer('diff(' + f + ', x)');
          var critical_val = "A";
          if (deriv_f.contains("x")) {
            critical_val = nerdamer.solveEquations("(" + deriv_f + ")=(0)", 'x');
          }
          if (critical_val != "A" && critical_val > input[3] && critical_val < input[5]) {
            output = nerdamer(input[0] + critical_val + ',' + nerdamer(f).evaluate({ x: input[3] }) + ',' + nerdamer(f).evaluate({ x: input[5] }) + ')').evaluate().text('decimals', 7);
          }
          else {
            output = nerdamer(input[0] + nerdamer(f).evaluate({ x: input[3] }) + ',' + nerdamer(f).evaluate({ x: input[5] }) + ')').evaluate().text('decimals', 7);
          }
        }
        //last
        if (output.length == 0) {
          output = Math.round(nerdamer(compiled_input).evaluate() * 100000000) / 100000000;
        }
      } catch (error) {
        output = "ERR";
      }
      if ((output + "") == "NaN") {
        output = "ERR";
      }
      else {
        if (convert_decimal) {
          convert_decimal = !convert_decimal;
          output = nerdamer(compiled_input).evaluate().text('decimals', 7);
        }
        if (convert_fraction) {
          convert_fraction = !convert_fraction;
          // not finished
        }
        previous_output_store = output;
      }
      return output;
    }
  }
  else {
    return "ERR";
  }

}

function is_ok(input) {
  //if there's more ( than ), it's ok
  var lr_parenth = parenth_count(input);
  if (lr_parenth[0] < lr_parenth[1]) {
    return false;
  }
  if (input.includes("2-Var Stats(") || input.includes("1-Var Stats(")) {
    return false;
  }
  if (lr_parenth[0] > lr_parenth[1]) {
    for (var i = 0; i < lr_parenth[0] - lr_parenth[1]; i++) {
      input.push(")");
    }
  }
  if (input.includes("nDeriv(") && lr_parenth[0] != lr_parenth[1]) {
    return false;
  }
  var compiled_input = "";
  for (var i = 0; i < input.length; i++) {
    compiled_input += input[i];
  }
  //false for empty ()
  if (compiled_input.includes("()")) {
    return false;
  }
  // if equation ends in ( or / * ^ etc, no good
  if (['/', '*', '^', '+', '-', '(', '->', '!'].includes(input[input.length - 1])) {
    return false;
  }
  if (['/', '*', '^', '+', ')', '->', '=', '<', '>', ',', ']', '}'].includes(input[0])) {
    return false;
  }
  // if there's two / * ^ + etc back to back, no good
  // if not &#10145; to a letter to store, bad
  var arrow_count = 0;
  if (input.includes('->') && !["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y0"].includes(input[input.length - 1])) {
    return false;
  }
  for (var i = 0; i < input.length - 1; i++) {
    if (input[i] == "log" && isNaN(input[i + 1]) && input[i + 1] != "(") {
      return false;
    }
    if ((input[i] == ">Frac" || input[i] == ">Dec") && (i != (input.length - 1) || i == 0)) {
      return false;
    }
    if (['/', '*', '^', '+', '-', '!', '√', '=', '>', '<'].includes(input[i]) && ['/', '*', '^', '+', '-', '!', '√', '=', '>', '<'].includes(input[i + 1])) {
      return false;
    }
    if (input[i] == '->') {
      arrow_count++;
    }
    if (arrow_count > 1) {
      return false;
    }
  }
  return true;
}


function parenth_count(input) {
  var left = 0, right = 0;
  var cmple = "";
  for (var x = 0; x < input.length; x++) {
    cmple += input[x];
  }
  left = cmple.split('(').length - 1;
  right = cmple.split(')').length - 1;
  return [left, right];
}

var opacity_ = 1;
function update_screen_opacity()
{
  document.getElementById("main--screen").style.opacity = opacity_;
  document.getElementById("math--screen").style.opacity = opacity_;

}
function increase_screen_opacity()
{
  if(opacity_ < 1)
  {
    opacity_+=.05;
  }
  update_screen_opacity();
}
function decrease_screen_opacity()
{
  if(opacity_ > .05)
  {
    opacity_-=.05;
  }
  update_screen_opacity();
}

function implementTrig()
{
  nerdamer.replaceFunction('sin', function(sin, core)
    {
      return function(x)
      {
        if(deg_bool && get_mode() == "main")
        {
          x = nerdamer(x.toString()).evaluate();
          var y = x * (Math.PI / 180);
          return new core.Symbol(Math.sin(y));
        }
        return sin(x);
      }
    });
    nerdamer.replaceFunction('cos', function(cos, core)
    {
      return function(x)
      {
        if(deg_bool && get_mode() == "main")
        {
          x = nerdamer(x.toString()).evaluate();
          var y = x * (Math.PI / 180);
          return new core.Symbol(Math.cos(y));
        }
        return cos(x);
      }
    });
    nerdamer.replaceFunction('tan', function(tan, core)
    {
      return function(x)
      {
        if(deg_bool && get_mode() == "main")
        {
          x = nerdamer(x.toString()).evaluate();
          var y = x * (Math.PI / 180);
          return new core.Symbol(Math.tan(y));
        }
        return tan(x);
      }
    });
}