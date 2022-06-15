function saveData() {

    // calculator color
    localStorage.setItem("calc_background--backgroundColor", document.getElementById("calc_background").style.backgroundColor);
    localStorage.setItem("calc_background--borderColor", document.getElementById("calc_background").style.borderColor);
    localStorage.setItem("colorchangeid--backgroundColor", document.getElementById("colorchangeid").style.backgroundColor);
    localStorage.setItem("colorchangeid--borderColor", document.getElementById("colorchangeid").style.borderColor);

    // matrix, lists
    localStorage.setItem("matrix_store", JSON.stringify(matrix_store));
    localStorage.setItem("list_store", JSON.stringify(list_store));
    // y=
    localStorage.setItem("y_functions", JSON.stringify(y_functions));
    localStorage.setItem("window_val", JSON.stringify(window_val));
    localStorage.setItem("tblset_val", JSON.stringify(tblset_val));
    // alpha store
    localStorage.setItem("alpha_store", JSON.stringify(alpha_store));
    // game
    localStorage.setItem("high_score", high_score);
    // light / dark mode
    localStorage.setItem("dark_mode_bool", JSON.stringify(get_dark_mode_bool()));
    localStorage.setItem("opacity_", JSON.stringify(opacity_));
    // stat plot
    localStorage.setItem("plot_val", JSON.stringify(plot_val));
    localStorage.setItem("plot_on", JSON.stringify(plot_on));
    // inputs
    localStorage.setItem("calc_input", JSON.stringify(calc_input));
    localStorage.setItem("inputs_list", JSON.stringify(inputs_list));
    localStorage.setItem("last_input_store", JSON.stringify(last_input_store));
    // rad/deg
    localStorage.setItem("rad_bool", JSON.stringify(rad_bool));
    localStorage.setItem("deg_bool", JSON.stringify(deg_bool));
    // font size
    localStorage.setItem("cur_font_size", JSON.stringify(cur_font_size));

    document.getElementById("data").style.opacity = 1;
    var ud = setTimeout(function () {
        document.getElementById("data").style.opacity = 0;
    }, 1000);
    var ud = setTimeout(function () {
        saveData();
    }, 5000);
}

function useData() {
    // calculator color
    document.getElementById("calc_background").style.backgroundColor = localStorage.getItem("calc_background--backgroundColor");
    document.getElementById("calc_background").style.borderColor = localStorage.getItem("calc_background--borderColor");
    document.getElementById("colorchangeid").style.backgroundColor = localStorage.getItem("colorchangeid--backgroundColor");
    document.getElementById("colorchangeid").style.borderColor = localStorage.getItem("colorchangeid--borderColor");
    // matrix, lists
    if (localStorage.getItem("matrix_store") != "null") {
        matrix_store = JSON.parse(localStorage.getItem("matrix_store"));
    }
    if (localStorage.getItem("list_store") != "null") {
        list_store = JSON.parse(localStorage.getItem("list_store"));
    }
    // y=
    if (localStorage.getItem("y_functions") != "null") {
        y_functions = JSON.parse(localStorage.getItem("y_functions"));
    }
    if (localStorage.getItem("window_val") != "null") {
        window_val = JSON.parse(localStorage.getItem("window_val"));
    }
    if (localStorage.getItem("tblset_val") != "null") {
        tblset_val = JSON.parse(localStorage.getItem("tblset_val"));
    }
    // alpha store
    if (localStorage.getItem("alpha_store") != "null") {
        alpha_store = JSON.parse(localStorage.getItem("alpha_store"));
    }
    // game
    if (localStorage.getItem("high_score") != "null") {
        high_score = localStorage.getItem("high_score");
    }
    // light / dark mode
    if (localStorage.getItem("dark_mode_bool") != "null") {
        dark_mode_bool = JSON.parse(localStorage.getItem("dark_mode_bool"));
        set_screen_color();
    }
    if (localStorage.getItem("opacity_") != "null") {
        opacity_ = JSON.parse(localStorage.getItem("opacity_"));
    }
    // stat plot
    if (localStorage.getItem("plot_val") != "null") {
        plot_val = JSON.parse(localStorage.getItem("plot_val"));
    }
    if (localStorage.getItem("plot_on") != "null") {
        plot_on = JSON.parse(localStorage.getItem("plot_on"));
    }
    // inputs
    if (localStorage.getItem("calc_input") != "null") {
        calc_input = JSON.parse(localStorage.getItem("calc_input"));
    }
    if (localStorage.getItem("inputs_list") != "null") {
        inputs_list = JSON.parse(localStorage.getItem("inputs_list"));
    }
    if (localStorage.getItem("last_input_store") != "null") {
        last_input_store = JSON.parse(localStorage.getItem("last_input_store"));
    }
    // rad/deg
    if(localStorage.getItem("rad_bool") != "null")
    {
        rad_bool = JSON.parse(localStorage.getItem("rad_bool"));
    }
    else 
    {
        rad_bool = true;
    }
    if(localStorage.getItem("deg_bool") != "null")
    {
        deg_bool = JSON.parse(localStorage.getItem("deg_bool"));
    }
    else 
    {
        deg_bool = false;
    }
    // font size
    if (localStorage.getItem("cur_font_size") != "null") {
        cur_font_size = JSON.parse(localStorage.getItem("cur_font_size"));
        updateFontDisplay();
    }

}

function hasData() {
    if (localStorage.length < 5) {
        return false;
    }
    return true;
}

function resetData() {
    localStorage.clear();
    window.location.reload();
}