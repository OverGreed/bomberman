requirejs.config({
    baseUrl:'js/',
    paths: {
        glm: 'libs/gl-matrix',
        text: 'libs/text',
        io: '../socket.io/socket.io.js'
    }
});
define(['loop', 'io'], function(loop, io) {
    var socket = io.connect(location.href, {
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
    loop();
});
