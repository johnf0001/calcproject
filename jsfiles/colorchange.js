

function load_animation() {
    setTimeout(() => {
        document.getElementsByClassName("loading")[0].style.opacity = "0";
    }, 500);
    setTimeout(() => {
        document.getElementsByClassName("loading")[0].style.display = "none";
    }, 750);
}



var options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "A", "B", "C", "D", "E", "F"];
document.getElementById("calc_background").style.backgroundColor = "#0091da";
document.getElementById("calc_background").style.borderColor = "#005c8a";
document.getElementById("colorchangeid").style.backgroundColor = "#0091da";
document.getElementById("colorchangeid").style.borderColor = "#005c8a";

function change_color() {
    background_color = (options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))]).toLowerCase();
    border_color = (options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))] + options[Math.floor((Math.random() * (options.length - 1)))]).toLowerCase();

    document.getElementById("calc_background").style.backgroundColor = "#" + background_color;
    document.getElementById("calc_background").style.borderColor = "#" + border_color;
    document.getElementById("colorchangeid").style.backgroundColor = "#" + background_color;
    document.getElementById("colorchangeid").style.borderColor = "#" + border_color;
}
