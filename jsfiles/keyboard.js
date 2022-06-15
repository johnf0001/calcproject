window.addEventListener("keydown", function(event) {
    if(`${event.key}` == "Enter")
    {
        event.preventDefault();
    }
    key_pressed(`${event.key}`);
  }, true);

function key_pressed(key)
{
    if(!is_on())
    {
        turnon();
    }
    else
    {
        key = key.toString().toUpperCase();
        if(["1","2","3","4","5","6","7","8","9","0","A","B","C","D","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","Y","Z","+","-",",","/","*","^","!","(",")","[","]","{","}","=","<",">","."].includes(key))
        {
            input(key);
        }
        else if(key == "ENTER")
        {
            enter_return();
        }
        else if(key == "BACKSPACE")
        {
            backspace();
        }
        else if(key == "ARROWDOWN")
        {
            arrow_down();
        }
        else if(key == "ARROWUP")
        {
            arrow_up();
        }
        else if(key == "ARROWLEFT")
        {
            arrow_left();
        }
        else if(key == "ARROWRIGHT")
        {
            arrow_right();
        }
        else if(key == "X" || key == "E")
        {
            input(key.toLowerCase());
        }
    }
}