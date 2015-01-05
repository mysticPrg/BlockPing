/**
 * Created by mysticprg on 15. 1. 2.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
//app.use('/bower_components', express.static(__dirname + '/bower_components'));

var player_1, player_2;

io.on('connection', function (socket) {

    if (player_1 && player_2) {
        socket.disconnect();
        return;
    }

    if (!player_1) {
        player_1 = {
            id: socket.client.id,
            socket: socket,
            other: null
        };
        console.log('player 1 connected');
    } else if (!player_2) {
        player_2 = {
            id: socket.client.id,
            socket: socket,
            other: null
        };
        console.log('player 2 connected');
    }

    socket.on('disconnect', function () {
        if (socket.client.id === player_1.id) {
            player_1 = null;
            console.log('player 1 disconnected');
        } else {
            player_2 = null;
            console.log('player 2 disconnected');
        }
    });

    socket.on('click', function (pos) {
        var target;
        if (socket.client.id === player_1.id) {
            target = player_2;
            console.log('player 1 click! : ' + JSON.stringify(pos));
        } else {
            target = player_1;
            console.log('player 2 click! : ' + JSON.stringify(pos));
        }

        target.socket.emit('click', pos);
    });
});

http.listen(8080, function () {
    console.log('Server is Running...');
});