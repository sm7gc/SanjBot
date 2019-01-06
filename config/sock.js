var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//io.configure(function () {
//    io.set("transports", ["xhr-polling"]);
//    io.set("polling duration", 10);
//});


var api = require('./api');

var conn = function () {
    //    var port = process.env.PORT || 5000;
    server.listen(8010);
    //    server.listen(port);

    app.get('/', function (req, res) {
        res.sendfile(__dirname + '/index.html');
    });
};

var fromClient = function () {
    io.on('connection', function (socket) {
        console.log('Client connected');
        socket.on('fromClient', function (data) {
            console.log(data.client);
            api.getRes(data.client).then(function (res) {
                console.log('response', res);
                socket.emit('fromServer', {
                    server: res
                });
            });
        });
    });
}

module.exports = {
    conn,
    fromClient
}
