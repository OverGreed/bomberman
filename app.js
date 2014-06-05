var express = require('express');
var config = require('./config.json');
var game = require('./game/server.js');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var server = app.listen(config.port, function() {
    console.log('Start application on port %d', server.address().port);
});

game.start(server);
