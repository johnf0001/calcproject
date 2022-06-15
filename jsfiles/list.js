var list_store = [["L1"], ["L2"], ["L3"], ["L4"], ["L5"], ["L6"], [""], [""]];
var col_ind_list = 0;
var row_ind_list = 0;

function display_list() {
    set_mode("list_edit");
    var display_text = "";
    var max_index = 0;
    for (var col = col_ind_list; col < col_ind_list + 3; col++) {
        if (list_store[col][list_store[col].length - 1] != "---") {
            list_store[col].push("---");
        }
        if (list_store[col].length > max_index) {
            max_index = list_store[col].length;
        }
    }
    for (var row = row_ind_list; row < row_ind_list + 10; row++) {
        for (var col = col_ind_list; col < col_ind_list + 3; col++) {
            if (col == col_ind_list && row == row_ind_list) {
                if (list_store[col][row] == undefined) {
                    display_text += "<b>" + pad("", 7) + "|</b>";
                }
                else {
                    display_text += "<b>" + pad(list_store[col][row], 7) + "|</b>";
                }
            }
            else {
                if (list_store[col][row] == undefined) {
                    display_text += pad("", 7) + "|";
                }
                else {
                    display_text += pad(list_store[col][row], 7) + "|";
                }
            }
        }
        display_text += "<br>";
    }
    display_text = "<u>" + display_text + "</u>";
    if (row_ind_list == 0) {
        var temp_list = "";
        for (var i = 1; i < list_store[col_ind_list].length; i++) {
            if (list_store[col_ind_list][i] == "---") {
                temp_list = temp_list.substring(0, temp_list.length - 1);
            }
            else {
                temp_list += list_store[col_ind_list][i] + ",";
            }
        }
        if (temp_list.length > 20) {
            temp_list = temp_list.substring(0, 17) + "...";
        }
        display_text += list_store[col_ind_list][0] + "={" + temp_list + "}";
    }
    else {
        display_text += list_store[col_ind_list][0] + "(" + row_ind_list + ")=" + list_store[col_ind_list][row_ind_list];
    }
    document.getElementById("math--screen").innerHTML = display_text;
    for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
        document.getElementsByClassName("screen")[i].style.display = "none";
    }
    document.getElementById("math--screen").style.display = "block";
}

function list_input(e) {
    if ((!isNaN(e) || [".", "-", "^"].includes(e)) && row_ind_list > 0) {
        if (list_store[col_ind_list].length - 1 == row_ind_list) {
            list_store[col_ind_list][row_ind_list] = e;
        }
        else if (list_store[col_ind_list][row_ind_list].length < 7) {
            list_store[col_ind_list][row_ind_list] += e;
        }
    }
    else if (row_ind_list == 0) {
        row_ind_list = list_store[col_ind_list].length - 1;
        input(e);
    }
    display_list();
}
function list_clear() {
    if (row_ind_list > 0 && list_store[col_ind_list].length - 1 > row_ind_list) {
        list_store[col_ind_list].splice(row_ind_list, 1);
    }
    else if (row_ind_list == 0) {
        list_clear_whole();
    }
    display_list();
}
function list_del() {
    if (row_ind_list > 0 && list_store[col_ind_list].length - 1 > row_ind_list && list_store[col_ind_list][row_ind_list].length > 1) {
        list_store[col_ind_list][row_ind_list] = list_store[col_ind_list][row_ind_list].substring(0, list_store[col_ind_list][row_ind_list].length - 1);
        display_list();
    }
    else if (list_store[col_ind_list][row_ind_list].length <= 1) {
        list_clear();
    }
}
function list_clear_whole(list_name) {
    if (list_name == undefined) {
        var name = list_store[col_ind_list][0];
        list_store[col_ind_list] = [name, "---"];
    }
    else {
        for (var i = 0; i < list_store.length; i++) {
            if (list_name == list_store[i][0]) {
                list_store[i] = [list_name, "---"];
            }
        }
        return "Done";
    }
}


function get_list_by_name(list_name) {
    display_list();
    display_main_screen();
    var list_in_use = [];
    // locate list based on name  (ex "L1")
    for (var i = 0; i < list_store.length; i++) {
        if (list_name == list_store[i][0]) {
            list_in_use = list_store[i];
        }
    }
    return list_in_use;
}
function list_retrieve(list_name) {
    var op = "(";
    var list_in_use = get_list_by_name(list_name);
    if (list_in_use.length > 2) {
        // add values to output (op) string
        for (var i = 1; i < list_in_use.length - 1; i++) {
            op += list_in_use[i] + ",";
        }
        op = op.substring(0, op.length - 1);
        op += ")";
        return op;
    }
    return "()";
}

function list_sum(list_name) {
    var sum = 0;
    var list_in_use = get_list_by_name(list_name);
    for (var i = 1; i < list_in_use.length - 1; i++) {
        sum += Number(list_in_use[i]);
    }
    return sum;
}
function list_mean(list_name) {
    var sum = list_sum(list_name);
    var list_in_use = get_list_by_name(list_name);
    return sum / (list_in_use.length - 2);

}
function list_median(list_name) {
    var median = 0;
    var list_in_use = get_list_by_name(list_name);
    var length = list_in_use.length;
    if (list_in_use.length % 2 == 0) {
        median = (Number(list_in_use[Math.round(list_in_use.length / 2) - 1]) + Number(list_in_use[Math.round(list_in_use.length / 2)])) / 2;
    }
    else {
        median = (list_in_use[Math.round(list_in_use.length / 2) - 1]);
    }
    return median;
}
function list_variance(list_name) {
    var variance = 0;
    var list_in_use = get_list_by_name(list_name);
    var mean = list_mean(list_name);
    var total = list_in_use.length - 3;
    for (var i = 1; i < list_in_use.length - 1; i++) {
        variance += Math.pow(Number(list_in_use[i]) - Number(mean), 2);
    }
    variance = variance / total;
    return variance;
}
function list_stddev(list_name) {
    return Math.sqrt(Number(list_variance(list_name)));
}
function list_prod(list_name) {
    var prod = 1;
    var list_in_use = get_list_by_name(list_name);
    for (var i = 1; i < list_in_use.length - 1; i++) {
        prod *= Number(list_in_use[i]);
    }
    return prod;
}
function list_SortA(list_name) {
    var list_in_use = get_list_by_name(list_name);
    if (list_in_use.length > 2) {
        list_in_use = list_in_use.sort();
        list_in_use[0] = list_name;
        list_in_use[list_in_use.length - 1] = "---";
    }
    return list_retrieve(list_name);
}
function list_SortD(list_name) {
    var list_in_use = get_list_by_name(list_name);
    if (list_in_use.length > 2) {
        list_in_use = list_in_use.sort().reverse();
        list_in_use[0] = list_name;
        list_in_use[list_in_use.length - 1] = "---";
    }
    return list_retrieve(list_name);
}
function list_cumSum(list_name) {
    var sum = 0;
    var sum_arr = [];
    var list_in_use = get_list_by_name(list_name);
    if (list_in_use.length > 2) {
        for (var i = 1; i < list_in_use.length - 1; i++) {
            sum += Number(list_in_use[i]);
            sum_arr.push(sum);
        }

        var op = "(";
        // add values to output (op) string
        for (var i = 0; i < sum_arr.length; i++) {
            op += sum_arr[i] + ", ";
        }
        op = op.substring(0, op.length - 2);
        op += ")";
        return op;
    }
    return "()";
}

function list_1varstat(list_name) {
    try {
        var list_in_use = get_list_by_name(list_name);
        if (list_in_use.length > 2) {
            set_mode("varstat");
            var display_text = "<b>1-Var Stats " + list_name + "</b><br><br>";
            display_text += "&nbsp;mean=" + list_mean(list_name) + "<br><br>";
            display_text += "&nbsp;sum=" + list_sum(list_name) + "<br><br>";
            display_text += "&nbsp;stddev=" + list_stddev(list_name) + "<br><br>";
            display_text += "&nbsp;variance=" + list_variance(list_name) + "<br><br>";
            display_text += "&nbsp;n=" + (list_in_use.length - 2) + "<br><br>";
            display_text += "&nbsp;min=" + nerdamer("min" + list_retrieve(list_name)) + "<br><br>";
            display_text += "&nbsp;Med=" + list_median(list_name) + "<br><br>";
            display_text += "&nbsp;max=" + nerdamer("max" + list_retrieve(list_name)) + "<br><br>";
            display_text = display_text.toString().replace("NaN", "");
            display_text = display_text.toString().replace("NaN", "");
            document.getElementById("math--screen").innerHTML = display_text;
            for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
                document.getElementsByClassName("screen")[i].style.display = "none";
            }
            document.getElementById("math--screen").style.display = "block";
            return 1;
        }
        else {
            return 0;
        }
    } catch (error) {
        return 0;
    }
}

function list_2varstat(list_name, list_name2) {
    try {
        if (list_name2 == undefined) {
            return 0;
        }
        var list_in_use = get_list_by_name(list_name);
        var list_in_use2 = get_list_by_name(list_name2);
        if (list_in_use.length > 2 && list_in_use2.length > 2 && list_name != undefined && list_name2 != undefined) {
            set_mode("varstat");
            var display_text = "<b>2-Var Stats " + list_name + ", " + list_name2 + "</b><br><br>";
            var display_text_arr = [];
            display_text_arr.push("mean=" + list_mean(list_name));
            display_text_arr.push("mean=" + list_mean(list_name2));
            display_text_arr.push("sum=" + list_sum(list_name));
            display_text_arr.push("sum=" + list_sum(list_name2));
            display_text_arr.push("stdv=" + Math.round(list_stddev(list_name) * 1000) / 1000);
            display_text_arr.push("stdv=" + Math.round(list_stddev(list_name2) * 1000) / 1000);
            display_text_arr.push("var=" + Math.round(list_variance(list_name) * 1000) / 1000);
            display_text_arr.push("var=" + Math.round(list_variance(list_name2) * 1000) / 1000);
            display_text_arr.push("n=" + (list_in_use.length - 2));
            display_text_arr.push("n=" + (list_in_use2.length - 2));
            display_text_arr.push("min=" + nerdamer("min" + list_retrieve(list_name)));
            display_text_arr.push("min=" + nerdamer("min" + list_retrieve(list_name2)));
            display_text_arr.push("Med=" + list_median(list_name));
            display_text_arr.push("Med=" + list_median(list_name2));
            display_text_arr.push("max=" + nerdamer("max" + list_retrieve(list_name)));
            display_text_arr.push("max=" + nerdamer("max" + list_retrieve(list_name2)));
            for (var i = 0; i < display_text_arr.length; i++) {
                if (i % 2 == 0) {
                    display_text += "&nbsp;" + padright(display_text_arr[i], 11);
                }
                else {
                    display_text += "&nbsp;" + display_text_arr[i] + "<br>";
                }
            }
            display_text = display_text.toString().replaceAll("NaN", "&nbsp;&nbsp;&nbsp;");
            document.getElementById("math--screen").innerHTML = display_text;
            for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
                document.getElementsByClassName("screen")[i].style.display = "none";
            }
            document.getElementById("math--screen").style.display = "block";
            return 1;
        }
        else {
            return 0;
        }
    } catch (error) {
        return 0;
    }
}
function padright(num, size) {
    num = num.toString();
    if (num.length > size) {
        num = num.substring(0, size);
    }
    while (num.length < size) {
        num += ":";
    }
    num = num.replaceAll(":", "&nbsp;");
    return num;
}


var plot_val = [1, 2, ""];
var plot_on = false;

function plot_input(e) {
    if (get_mode() == "plot") {
        if (!isNaN(e) && parseInt(e) < 7 && parseInt(e) > 0 && row_ind < plot_val.length - 1) {
            plot_val[row_ind] = parseInt(e);
        }
        display_plot();
    }
}

function display_plot() {
    plotOn();
    ops = ["X: L", "Y: L", "<br><br>&nbsp;GRAPH"];
    val2 = plot_val;
    set_mode("plot");
    var display_text = "<b>PLOT</b><br><br><br><br>";
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

function plotOn() {
    return plot_on = true;
}
function plotOff() {
    return plot_on = false;
}
function is_plot_on() {
    return plot_on;
}
function plotToggle() {
    return plot_on = !plot_on;
}