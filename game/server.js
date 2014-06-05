function start(app){
    var io = require('socket.io').listen(app);
    io.set('transports', [
        'websocket'
    ]);

    io.on('connection', function(socket) {
        socket.on('msg', function (data) {
            console.log(data);
            io.sockets.emit('new', {
                message: 'Success'
            });
        });
    });
}
exports.start = start;
