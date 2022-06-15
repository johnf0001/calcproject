var settings_bool = false;

function toggleSettings()
{
    settings_bool = !settings_bool;
    if(settings_bool)
    {
        document.getElementById("settingsshell").style.display = "block";
        var ud = setTimeout(function () {
            document.getElementById("settingsshell").style.opacity = "1";
        }, 1);
        document.getElementById("settingsbutton").style.backgroundColor = "red";
        document.getElementById("settingsbutton").style.aspectRatio = "1";
        document.getElementById("settingsbutton").innerHTML = "<b>X<b>";
    }
    else
    {
        document.getElementById("settingsshell").style.opacity = "0";
        var ud = setTimeout(function () {
            document.getElementById("settingsshell").style.display = "none";
        }, 200);
        document.getElementById("settingsbutton").style.backgroundColor = "#909090";
        document.getElementById("settingsbutton").style.aspectRatio = ".5";
        document.getElementById("settingsbutton").innerHTML = "<b>S<b>";
    }
}
var cur_font_size = 1.44;
if(screen.width <= 1000)
{
    cur_font_size = 1.9;
}
function increaseFontSize()
{
    cur_font_size+=.01;
    cur_font_size = Math.round(cur_font_size * 100) / 100;
    updateFontDisplay();
}

function decreaseFontSize()
{
    cur_font_size-=.01;
    cur_font_size = Math.round(cur_font_size * 100) / 100;
    updateFontDisplay();
}

function resetFontSize()
{
    cur_font_size = 1.44;
    if(screen.width <= 1000)
    {
        cur_font_size = 1.9;
    }
    updateFontDisplay();
}

function getFontSize()
{
    return document.getElementById("main--screen").style.fontSize;
}

function updateFontDisplay()
{
    document.getElementById("main--screen").style.fontSize = cur_font_size + "vh";
    document.getElementById("math--screen").style.fontSize = cur_font_size + "vh";
    document.getElementById("fontdisplay").innerHTML = "Edit Font Size (" + getFontSize() + ")";
}