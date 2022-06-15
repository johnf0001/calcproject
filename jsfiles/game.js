var game_on = false;

var math_equation = [1, 2, 3, 10];

var score = 0;
var high_score = 0;
var question = "";
var time = 0;

function display_game() {
    var display_text = "";
    if (game_on) {
        display_text = display_score(high_score) + " | " + display_score(score) + " | " + display_new_time() + "<br><b>" + display_question() + "</b>";
        document.getElementById("game").innerHTML = display_text;
    }
    else {
        document.getElementById("game").style.opacity = "0";
    }
}

function update_clock() {
    time--;
    display_game();
    var ud = setTimeout(function () {
        update_clock()
    }, 1000);

}

function toggle_game() {
    game_on = !game_on;
    if(!is_on())
    {
        turnon();
    }
    score = 0;
    clear_input();
    clear_input();
    if (game_on) {
        display_main_screen();
        math_equation = [1, 2, 3, 10];
        time = 300;
        display_game();
        document.getElementById("game").style.opacity = "1";
        for (var i = 0; i < document.getElementsByClassName("top--button").length; i++) {
            document.getElementsByClassName("top--button")[i].style.backgroundColor = "red";
            document.getElementsByClassName("top--button")[i].style.color = "white";
            document.getElementsByClassName("top--button")[i].style.fontStyle = "italic";
            document.getElementsByClassName("top--button")[i].innerHTML = "SKIP";
        }
    }
    else {
        document.getElementById("game").style.opacity = "0";
        var text = ["y=", "window", "zoom", "trace", "graph"];
        for (var i = 0; i < document.getElementsByClassName("top--button").length; i++) {
            document.getElementsByClassName("top--button")[i].style.backgroundColor = "rgba(203, 203, 203, 0.999)";
            document.getElementsByClassName("top--button")[i].style.color = "black";
            document.getElementsByClassName("top--button")[i].style.fontStyle = "normal";
            document.getElementsByClassName("top--button")[i].innerHTML = text[i];
        }
    }
}

var game_over = true;
function display_question() {
    var op = "";
    if (time < 0) {
        if (score >= high_score) {
            op += "New high score! " + score;
            high_score = score;
        }
        else {
            op += "Your final score was " + score + "!";
        }
        math_equation = [10, 10, 10, -10];
        if (game_over && game_on) {
            game_over = !game_over;
            var ud = setTimeout(function () {
                toggle_game();
            }, 5000);
        }
    }
    else {
        for (var i = 0; i < math_equation.length - 1; i++) {
            op += math_equation[i] + " "
        }
        op += " &#8658; " + math_equation[math_equation.length - 1];
    }
    return op;
}

function display_new_time() {
    if (time < 0) {
        document.getElementById("game").style.backgroundColor = "#41546ec6";
        document.getElementById("game").style.width = "95%";
        return "0:00";
    }
    else {
        var minutes = Math.floor(time / 60);
        if (minutes <= 1) {
            document.getElementById("game").style.backgroundColor = "#ae4f4fac";
            document.getElementById("game").style.width = "80%";
        }
        var seconds = time % 60;
        if (seconds == 0) {
            seconds = "00";
        }
        else if (seconds < 10) {
            if (minutes == 0) {
                document.getElementById("game").style.backgroundColor = "#ae4f4fac";
                var ud = setTimeout(function () {
                    document.getElementById("game").style.backgroundColor = "#fc2525c6";
                }, 500);
            }
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }
}

function display_score(score_) {
    var d_score = score_ + "";
    while (d_score.length < 4) {
        d_score = "0" + d_score;
    }
    return d_score;
}

function equation_solved(solveLength) {
    clear_input();
    previous_output_store = "0";
    last_equation_store = ["0"];
    document.getElementById("game").style.backgroundColor = "#1dde33c6";
    var ud = setTimeout(function () {
        document.getElementById("game").style.backgroundColor = "#41546ec6";
    }, 600);
    score += 1000 * Math.round(1 / solveLength * 1000) / 1000;
    if (score > high_score) {
        high_score = score;
    }
    new_equation();
    display_game();
}
function equation_skipped() {
    clear_input();
    clear_input();
    document.getElementById("game").style.backgroundColor = "#ae4f4fac";
    var ud = setTimeout(function () {
        document.getElementById("game").style.backgroundColor = "#41546ec6";
    }, 600);
    score -= Math.floor(Math.random() * (100 - 0 + 1)) + 0;
    if (score < 0) {
        score = 0;
    }
    new_equation();
    display_game();
}
function new_equation() {
    math_equation = [];
    var rand_num2 = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
    while (math_equation.length < rand_num2) {
        var rand_num = Math.floor(Math.random() * 10);
        if (!math_equation.includes(rand_num)) {
            math_equation.push(rand_num);
        }
    }
    rand_num2 = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
    var answer = "";
    for (var i = 0; i < rand_num2; i++) {
        answer += (Math.floor(Math.random() * 10) + "");
    }
    math_equation.push(parseInt(answer));
}

function get_raw_options() {
    var op = ["*", "-", "/", "^", "+", "log(", "ln(", "sin(", "cos(", "tan(", "(", ")"];
    for (var i = 0; i < math_equation.length - 1; i++) {
        op.push(math_equation[i] + "");
    }
    return op;
}