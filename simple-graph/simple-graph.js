var gridFunc;

function initGUI(_formId, _graphId) {
    var form = document.getElementById(_formId);

    if (!form) {
        alert('Unable to find my own GUI.');
        return false;
    }

    gridFunc = __twoToneFunc;

    return __redrawGraph(_formId, _graphId);
}

// =========================
// cheesy math
// =========================

var e = Math.E;
var pi = Math.PI;

function abs(x) { return Math.abs(x); }
function acos(x) { return Math.acos(x); }
function asin(x) { return Math.asin(x); }
function atan(x) { return Math.atan(x); }
function atan2(y, x) { return Math.atan2(y, x); }
function ceil(x) { return Math.ceil(x); }
function cos(x) { return Math.cos(x); }
function exp(x) { return Math.exp(x); }
function floor(x) { return Math.floor(x); }
function ln(x) { return Math.log(x); }
function log(x) { return Math.log(x); }
function log2(x) { return Math.log(x) / LOG2E; }
function log10(x) { return Math.log(x) / LOG10E; }
function max(x, y) { return Math.max(x, y); }
function min(x, y) { return Math.min(x, y); }
function pow(x, y) { return Math.pow(x, y); }
function random() { return Math.random(); }
function round(x) { return Math.round(x); }
function sin(x) { return Math.sin(x); }
function sqrt(x) { return Math.sqrt(x); }
function tan(x) { return Math.tan(x); }
function sign(x) { return (x == 0) ? 0 : (x < 0) ? -1 : 1; }
function step(x) { return (x == 0) ? 0.5 : (x < 0) ? 0 : 1; }
function sinh(x) { return (exp(x) - exp(-x)) / 2; }
function cosh(x) { return (exp(x) + exp(-x)) / 2; }
function tanh(x) { return sinh(x) / cosh(x); }

// =========================
function findValue(_form, _name) {
    for (var ii = 0; ii < _form.elements.length; ++ii) {
        if (_form.elements[ii].name == _name) {
            return _form.elements[ii].value;
        }
    }
    alert("Couldn't find element: " + _name);
    return false;
}

function findRange(_form, _prefix) {
    xmins = Number(findValue(_form, 'x-min'));
    ymins = Number(findValue(_form, 'y-min'));
    var min = parseFloat(findValue(_form, _prefix + '-min'));
    var max = parseFloat(findValue(_form, _prefix + '-max'));

    if (max < min) {
        var tmp = max;
        max = min;
        min = tmp;
    }
    else if (max == min) {
        --min;
        ++max;
    }

    return { min: min, max: max };
}

function rectifyRanges(_xr, _yr, _ww, _hh) {
    var dx = (_xr.max - _xr.min);
    var dy = (_yr.max - _yr.min);

    var factor = Math.min(_ww / dx, _hh / dy);
    var xfudge = (_ww / factor - dx) / 2;
    var yfudge = (_hh / factor - dy) / 2;

    _xr.min -= xfudge;
    _xr.max += xfudge;
    _yr.min -= yfudge;
    _yr.max += yfudge;

    return factor;
}

function drawLine(_context, _x1, _y1, _x2, _y2) {
    _context.beginPath();
    _context.moveTo(_x1, _y1);
    _context.lineTo(_x2, _y2);
    _context.stroke();
}

function drawCoordinates(_context, x, y) {

    _context.lineWidth = .5;
    _context.strokeStyle = "rgba(20,20,20)";
    _context.beginPath();
    _context.moveTo(x, y);
    _context.lineTo(x + .01, y);
    _context.lineTo(x + .01, y + .01);
    _context.lineTo(x, y + .01);
    _context.lineTo(x, y - .25);
    _context.lineTo(x, y);
    _context.stroke();
    _context.strokeStyle = "rgba(0,0,0)";
    _context.lineWidth = .15;
}

function proportion(_aa, _bb, _val, _best) {
    var dx = _bb - _aa;
    if (dx * dx < 0.000001) {
        return _best;
    }
    else {
        var pp = (_val - _aa) / dx;
        if (_best === false || (Math.abs(pp) < Math.abs(_best))) {
            return pp;
        }
        else {
            return _best;
        }
    }
}

function clipLine(_x1, _y1, _x2, _y2, _xr, _yr) {
    var ff = proportion(_x1, _x2, _xr.min, false);
    ff = proportion(_x1, _x2, _xr.max, ff);
    ff = proportion(_y1, _y2, _yr.min, ff);
    ff = proportion(_y1, _y2, _yr.max, ff);

    return {
        x: (_x1 + ff * (_x2 - _x1)),
        y: (_y1 + ff * (_y2 - _y1))
    };
}

var colors = ["0,0,255", "255,0,0", "153,153,0", "255,51,255", "88,88,255", "255,0,255", "80,255,30", "10,70,90", "90,0,0", "1,3,200"]
function graphFunction(_context, _func, _xr, _yr, _step, function_index) {
    var wasOn = false;
    var everOn = false;

    var x = _xr.min - _step;
    var xval = x;
    var t = x;
    if (get_y_functions()[function_index].length > 0) {
        var temp_func = get_raw_functions()[function_index];
        _func = solve(temp_func);
        var y = Math.round(nerdamer(_func).evaluate({ x: xval }));
    }
    else {
        return;
    }

    var prev_x = x;
    var prev_y = y;

    _context.beginPath();
    _context.strokeStyle = "rgba(" + colors[function_index] + ")";
    _context.lineWidth = .15;

    for (x = _xr.min; x <= _xr.max; x += _step) {
        var t = x;
        var xval = x;
        var y = nerdamer(_func).evaluate({ x: xval });
        var isOn = (_yr.min <= y && y <= _yr.max);

        if (isOn) {
            if (wasOn) {
                _context.lineTo(x, y);
            }
            else {
                var clipped = clipLine(x, y, prev_x, prev_y, _xr, _yr);
                _context.moveTo(clipped.x, clipped.y);
            }
        }
        else if (wasOn) {
            var clipped = clipLine(prev_x, prev_y, x, y, _xr, _yr);
            _context.lineTo(clipped.x, clipped.y);
        }

        wasOn = isOn;
        everOn = everOn || isOn;

        prev_x = x;
        prev_y = y;
    }

    if (everOn) {
        _context.stroke();
    }
}

function pickGridSize(_factor, _guess) {
    if (_factor * _guess < 0.125) {
        return pickGridSize(_factor, _guess * 2);
    }
    else if (0.25 < _factor * _guess) {
        return pickGridSize(_factor, _guess / 2);
    }
    else {
        return _guess;
    }
}

function roundOff(_pp, _qq, _dir) {
    var rr = _qq * Math.floor(_pp / _qq);
    return rr + _dir * _qq;
}


// coordinate gride functions
function __noneFunc(_context, _x1, _y1, _x2, _y2, _gs, _dpi) {
    // do nothing
}

function __lineFunc(_context, _x1, _y1, _x2, _y2, _gs, _dpi) {
    drawLine(_context, _x1, _y1, _x2, _y2);
}

function __tickFunc(_context, _x1, _y1, _x2, _y2, _gs, _dpi) {
    var dx = _x2 - _x1;
    var dy = _y2 - _y1;
    if (dx < dy) {
        // horizontal ticks
        if (_y1 < 0 && 0 < _y2) {
            drawLine(_context, _x1, -_gs / 4, _x1, +_gs / 4);
        }
        drawLine(_context, _x1, _y1, _x1, _y1 + _gs / 4);
        drawLine(_context, _x1, _y2, _x1, _y2 - _gs / 4);
    }
    else {
        if (_x1 < 0 && 0 < _x2) {
            drawLine(_context, -_gs / 4, _y1, +_gs / 4, _y1);
        }
        drawLine(_context, _x1, _y1, _x1 + _gs / 4, _y1);
        drawLine(_context, _x2, _y1, _x2 - _gs / 4, _y1);
    }
}

function __twoToneFunc(_context, _x1, _y1, _x2, _y2, _gs, _dpi, _scale) {
    var dx = _x2 - _x1;
    var dy = _y2 - _y1;
    var bold = false;
    if (dx < dy) {
        bold = (Math.round(_x1 / _gs) % 5) == 0;
    }
    else {
        bold = (Math.round(_y1 / _gs) % 5) == 0;
    }
    if (bold) {
        _context.save();
        _context.lineWidth = 2.0 / _scale;
    }
    drawLine(_context, _x1, _y1, _x2, _y2);
    if (bold) {
        _context.restore();
    }
}

function setGridFunc(_func) {
    gridFunc = _func;
}

function label(_context, _xx, _yy, _ll, _scale, _xoff, _yoff) {
    _context.save();
    _context.translate(_xx, _yy);
    _context.scale(1.0 / _scale, -1.0 / _scale);
    _context.translate(_xoff, _yoff);

    var metrics = _context.measureText(_ll);
    _context.fillText(_ll, -(metrics.width / 2), 0);
    _context.restore();
}

function drawGrid(_context, _gs, _xr, _yr, _func, _dpi, _scale) {
    var x1 = roundOff(_xr.min, _gs, -1);
    var x2 = roundOff(_xr.max, _gs, +1);
    var y1 = roundOff(_yr.min, _gs, -1);
    var y2 = roundOff(_yr.max, _gs, +1);
    var textScale = _scale * 100.0 / _dpi;

    for (var xx = x1; xx <= _xr.max; xx += _gs) {
        if (xx >= _xr.min) {
            _func(_context, xx, _yr.min, xx, _yr.max, _gs, _dpi, _scale);
        }
    }
    for (var yy = y1; yy <= _yr.max; yy += _gs) {
        if (yy >= _yr.min) {
            _func(_context, _xr.min, yy, _xr.max, yy, _gs, _dpi, _scale);
        }
    }
}

function __redrawGraph(_formId, _graphId) {
    if (game_on) {
        equation_skipped();
        return;
    }
    if (is_on()) {
        var form = document.getElementById(_formId);
        var canvas = document.getElementById(_graphId);

        if (!form || !canvas) {
            alert('Unable to find anything like a drawing area.');
            return false;
        }

        var dpi = parseFloat(findValue(form, 'dpi'));

        var ww = Math.ceil(findValue(form, 'x-inches') * dpi);
        var hh = Math.ceil(findValue(form, 'y-inches') * dpi);

        if (ww < 1 || hh < 1) {
            alert('Bad canvas dimensions: [' + ww + ',' + hh + ']');
            return false;
        }

        canvas.width = ww;
        canvas.height = hh;

        var cw = Math.round(ww / 2);
        var ch = Math.round(hh / 2);
        var ox = Math.ceil(0.25 * dpi);
        var oy = Math.ceil(0.25 * dpi);
        var gw = ww - ox * 2;
        var gh = hh - oy * 2;

        var x_range = findRange(form, 'x');
        var y_range = findRange(form, 'y');

        var scale = rectifyRanges(x_range, y_range, gw, gh);

        var context = canvas.getContext('2d');

        context.save();

        context.clearRect(0, 0, ww, hh);

        context.translate(cw, ch);
        context.scale(scale + 6, -(scale + 6));
        context.translate((x_range.max + x_range.min) / -2,
            (y_range.max + y_range.min) / -2);

        context.font = 'normal 10px Texas Instruments TI-84 series Regular';

        var gs = pickGridSize(scale / dpi, 1);

        var grid_color = 'rgba(0,0,0)'
        if (get_dark_mode_bool()) {
            grid_color = 'rgba(255,255,255)'
        }

        context.strokeStyle = grid_color
        context.lineWidth = 1 / scale;
        drawGrid(context, gs, x_range, y_range, gridFunc, dpi, scale);

        context.strokeStyle = grid_color
        context.lineWidth = 1 / scale;
        context.strokeRect(x_range.min, y_range.min,
            x_range.max - x_range.min,
            y_range.max - y_range.min);

        context.strokeStyle = grid_color
        context.lineWidth = 1 / scale;


        if (x_range.min <= 0 && x_range.max >= 0) {
            drawLine(context, 0, y_range.min, 0, y_range.max);
        }
        if (y_range.min <= 0 && y_range.max >= 0) {
            drawLine(context, x_range.min, 0, x_range.max, 0);
        }
        context.lineWidth = 1 / scale;
        try {
            for (var i = 0; i < get_y_functions().length; i++) {
                graphFunction(context, 0, x_range, y_range, 1.0 / scale, i);
            }

        }
        catch (err) {
            alert(err);
        }

        if (is_plot_on()) {
            if (plot_val[0] != plot_val[1] && list_store[plot_val[0] - 1].length == list_store[plot_val[1] - 1].length && list_store[plot_val[0] - 1].length > 1) {
                for (var i = 1; i < list_store[plot_val[0] - 1].length - 1; i++) {
                    drawCoordinates(context, parseInt(list_store[plot_val[0] - 1][i]), parseInt(list_store[plot_val[1] - 1][i]));
                }
            }
            else {
                plotOff();
            }
        }

        drawCoordinates(context, trace_x, trace_y);

        context.scale(1, -1);
        context.font = "1px Texas Instruments TI-84 series Regular";
        context.fillText(getTraceCoord(), -11, 8);

        context.restore();
        for (var i = 0; i < document.getElementsByClassName("screen").length; i++) {
            document.getElementsByClassName("screen")[i].style.display = "none";
        }
        document.getElementById("graph").style.display = "block";
        set_mode("graph");

        return true;
    }
    else {
        return false;
    }
}

function redrawGraph(_formId, _graphId) {
    __redrawGraph(_formId, _graphId);
    return false;
}

function copyCanvas(_canvasId) {
    var canvas = document.getElementById(_canvasId);

    if (!canvas) {
        return false;
    }

    window.open(
        canvas.toDataURL(),
        "_blank",
        "width=" + canvas.width + ",height=" + canvas.height
    );

    return true;
}