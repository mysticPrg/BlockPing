var socket = io();

var bar;
var another;

var factor = 0.05;
var x, y;
var another_x, another_y;

socket.on('click', function (pos) {
    another_x = pos.x;
    another_y = pos.y;

    setTimeout(anotherMoveTo, 0);
});

function moveTo() {
    var left = parseFloat(bar.css('left'));
    var top = parseFloat(bar.css('top'));

    var distance_x = parseFloat(x - left);
    var distance_y = parseFloat(y - top);

    var force_x = distance_x * factor;
    var force_y = distance_y * factor;

    var force = (force_x > 0 ? force_x : -force_x) + (force_y > 0 ? force_y : -force_y);

    if (force <= 0.01) {
        return;
    }

    left = left + force_x;
    top = top + force_y;

    bar.css('left', left);
    bar.css('top', top);

    setTimeout(moveTo, 0);
}

function anotherMoveTo() {
    var left = parseFloat(another.css('left'));
    var top = parseFloat(another.css('top'));

    var distance_x = parseFloat(another_x - left);
    var distance_y = parseFloat(another_y - top);

    var force_x = distance_x * factor;
    var force_y = distance_y * factor;

    var force = (force_x > 0 ? force_x : -force_x) + (force_y > 0 ? force_y : -force_y);

    if (force <= 0.01) {
        return;
    }

    left = left + force_x;
    top = top + force_y;

    another.css('left', left);
    another.css('top', top);

    setTimeout(anotherMoveTo, 0);
}

$(document).ready(function () {

    bar = $('#bar');
    another = $('#another_bar');

    $('#toucharea').on('mousedown', function (e) {
        x = e.offsetX;
        y = e.offsetY;

        x -= parseInt(bar.css('width')) / 2;
        y -= parseInt(bar.css('height')) / 2;

        socket.emit('click', {
            x: x,
            y: y
        });

        //bar.stop().animate({
        //    left: x,
        //    top: y
        //});

        setTimeout(moveTo, 0);
    });

});