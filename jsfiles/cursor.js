function insert_cursor(direction) {
    if (calc_input.length > 0) {
        var no_cursor = true;
        if (direction == "left") {
            for (var i = 0; i < calc_input.length; i++) {
                if ((calc_input[i] + "").includes("<u>")) {
                    if (i > 0) {
                        calc_input[i] = calc_input[i].replace("<u>", "");
                        calc_input[i] = calc_input[i].replace("</u>", "");
                        calc_input[i - 1] = "<u>" + calc_input[i - 1] + "</u>";
                    }
                    no_cursor = false;
                }
            }
        }
        else if (direction == "right") {
            for (var i = 0; i < calc_input.length; i++) {
                if ((calc_input[i] + "").includes("<u>")) {
                    if (i >= 0 && i < calc_input.length - 1) {
                        calc_input[i] = calc_input[i].replace("<u>", "");
                        calc_input[i] = calc_input[i].replace("</u>", "");
                        calc_input[i + 1] = "<u>" + calc_input[i + 1] + "</u>";
                        i = 99999;
                    }
                    no_cursor = false;
                }
            }
        }
        if (no_cursor) {
            calc_input[calc_input.length - 1] = "<u>" + calc_input[calc_input.length - 1] + "</u>";
        }
        update_screen();
    }
}

function contains_cursor() {

    for (var i = 0; i < calc_input.length; i++) {
        if ((calc_input[i] + "").includes("<u>")) {
            return true;
        }
    }
    return false;
}

function cursor_replace(e) {
    for (var i = 0; i < calc_input.length; i++) {
        if ((calc_input[i] + "").includes("<u>")) {
            if (ins_bool) {
                calc_input[i] = calc_input[i].replace("<u>", "");
                calc_input[i] = calc_input[i].replace("</u>", "");
                calc_input.splice(i + 1, 0, "<u>" + e + "</u>");
                i++;
            }
            else {
                if (e.length < 1) {
                    calc_input.splice(i, 1);
                }
                else {
                    calc_input[i] = e;
                }
            }
        }
    }
    update_screen();
}

function cursor_index() {
    for (var i = 0; i < calc_input.length; i++) {
        if ((calc_input[i] + "").includes("<u>")) {
            return i;
        }
    }
    return -1;
}

var ins_bool = false;
function toggle_ins() {
    ins_bool = !ins_bool;
    if (ins_bool) {
        insert_cursor("right");
    }
    else {
        cursor_replace("");
    }
}

function insOff() {
    ins_bool = false;
}

function remove_cursor() {
    for (var i = 0; i < calc_input.length; i++) {
        if ((calc_input[i] + "").includes("<u>")) {
            calc_input[i] = calc_input[i].replace("<u>", "");
            calc_input[i] = calc_input[i].replace("</u>", "");
        }
    }
}
