define(['io'], function(io) {
    var socket = io.connect({
        'transports': [
            'websocket',
            'xhr-polling'
        ]
    });
    socket.on('new', function(data) {
        console.log(data)
    });
    socket.emit('msg', {
        text:'message'
    });
    return socket;
});
