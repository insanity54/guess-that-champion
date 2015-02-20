var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var path = require('path');

var port = process.env.PORT;

app.set('appDir', __dirname);
app.use(express.static(path.join(app.appDir, '/public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(app.appDir, 'game.html'));
});

server.listen(port);
console.log('server listening on port ' + port);