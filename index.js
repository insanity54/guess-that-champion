var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var path = require('path');

var port = process.env.PORT || 8787;

app.set('appDir', __dirname);
app.use(express.static(path.join(app.get('appDir'), '/public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(app.get('appDir'), 'public', 'game.html'));
});

server.listen(port);
console.log('server listening on port ' + port);