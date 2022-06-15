// 3d arraymatrix_edit
var matrix_store = [[[]], [[]], [[]], [[]], [[]], [[]], [[]], [[]], [[]], [[]]];
var matrix_index = 0;
var matrix_row = 0;
var matrix_column = 0;

var edit_ind_left = true;

function matrix_reset_ind() {
    matrix_row = 0;
    matrix_column = 0;
}

function display_matrix() {
    if (matrix_store[matrix_index][0][0] == undefined) {
        matrix_define(2, 2);
    }
    set_mode("matrix_edit");
    var display_text = "<u>|&nbsp&nbsp&nbsp<b>MATRIX&nbsp&nbsp&nbsp</b>" + matrix_getName(matrix_index) + "&nbsp&nbsp&nbsp&nbsp</u>|<br>";
    for (var row = 0; row < matrix_store[matrix_index][0][1]; row++) {
        for (var col = 1; col < (matrix_store[matrix_index][0][0] + 1); col++) {
            var new_display_text = matrix_pad("---", 3);
            if (matrix_store[matrix_index][col][row] != undefined && matrix_store[matrix_index][col][row].length > 0) {
                new_display_text = matrix_pad(matrix_store[matrix_index][col][row], 3);
            }
            if (col == matrix_column + 1 && row == matrix_row) {
                new_display_text = "<b>" + new_display_text + "</b>";
            }
            display_text += new_display_text;
        }
        display_text += "|<br>";

    }
    document.getElementById("math--screen").innerHTML = display_text;
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
        document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("math--screen").style.display = "block";
}

function matrix_define(col, row) {
    matrix_store[matrix_index] = new Array(col + 1);
    matrix_store[matrix_index][0] = [col, row];
    for (var i = 1; i < col + 1; i++) {
        matrix_store[matrix_index][i] = new Array(row);
    }
}

function matrix_getName(ind) {
    var letter_name = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    var name = "[" + letter_name[ind] + "]";
    if (matrix_store[ind][0][0] == undefined) {
        return name;
    }

    if (matrix_row == -1 && edit_ind_left) {
        name += " <b>" + matrix_store[ind][0][0] + "</b>x" + matrix_store[ind][0][1];
    }
    else if (matrix_row == -1 && !edit_ind_left) {
        name += " " + matrix_store[ind][0][0] + "x<b>" + matrix_store[ind][0][1] + "</b>";
    }
    else {
        name += " " + matrix_store[ind][0][0] + "x" + matrix_store[ind][0][1];
    }

    return name;
}

function matrix_getNameAll(trim) {
    var op = [];
    if (trim) {
        for (var i = 0; i < matrix_store.length; i++) {
            op.push(matrix_getName(i).substring(0, 4));
        }
    }
    else {
        for (var i = 0; i < matrix_store.length; i++) {
            op.push(matrix_getName(i));
        }
    }
    return op;
}


function matrix_pad(num, size) {
    num = num.toString();
    if (num.length > size) {
        num = num.substring(0, size);
    }
    while (num.length < size) {
        num = ":" + num;
    }
    num = num.replaceAll(":", "&nbsp;");
    return "<u>|" + num + "</u>";
}

function matrix_input(e) {
    if (matrix_row == -1 && !isNaN(e)) {
        if (edit_ind_left && e < 8 && e > 0) {
            matrix_store[matrix_index][0][0] = parseInt(e);
            matrix_define(matrix_store[matrix_index][0][0], matrix_store[matrix_index][0][1]);
            matrix_reset_ind();
        }
        else if (!edit_ind_left && e < 10 && e > 0) {
            matrix_store[matrix_index][0][1] = parseInt(e);
            matrix_define(matrix_store[matrix_index][0][0], matrix_store[matrix_index][0][1]);
            matrix_reset_ind();
        }
    }
    else if (!isNaN(e) || ["-", "."].includes(e)) {
        if (matrix_store[matrix_index][matrix_column + 1][matrix_row] != undefined && matrix_store[matrix_index][matrix_column + 1][matrix_row].length < 3) {
            matrix_store[matrix_index][matrix_column + 1][matrix_row] += e;
        }
        else if (matrix_store[matrix_index][matrix_column + 1][matrix_row] == undefined) {
            matrix_store[matrix_index][matrix_column + 1][matrix_row] = e;
        }
    }
    display_matrix();
}

function matrix_backspace(clear) {
    if (matrix_store[matrix_index][matrix_column + 1][matrix_row].length > 0 && !clear) {
        matrix_store[matrix_index][matrix_column + 1][matrix_row] = matrix_store[matrix_index][matrix_column + 1][matrix_row].substring(0, matrix_store[matrix_index][matrix_column + 1][matrix_row].length - 1);
    }
    else {
        matrix_store[matrix_index][matrix_column + 1][matrix_row] = "";
    }
    display_matrix();
}

function set_matrix_by_name(matrix_name) {
    matrix_index = matrix_name.charCodeAt(1) - 65;
    return matrix_index;
}

function matrix_rref(matrix_name) {
    set_matrix_by_name(matrix_name);
    var op = "";
    var line = "";
    var equations = [];
    var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    for (var row = 0; row < matrix_store[matrix_index][0][1]; row++) {
        for (var col = 1; col < (matrix_store[matrix_index][0][0] + 1); col++) {
            if (matrix_store[matrix_index][col][row] == undefined || isNaN(matrix_store[matrix_index][col][row])) {
                return false;
            }
            else if (col == matrix_store[matrix_index][0][0]) {
                line = line.substring(0, line.length - 1);
                line += "=" + matrix_store[matrix_index][col][row];
            }
            else {
                line += "(" + matrix_store[matrix_index][col][row] + ")" + letters[col - 1] + "+";
            }
        }
        equations.push(line);
        line = "";
    }
    op = "[" + nerdamer.solveEquations(equations).toString() + "]";
    return op;
}