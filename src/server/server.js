const app = require('./routes');
var port =  8080;
var websocket = require('websocket')
var server = app.listen(port, function (req,res) {
    console.log('http://127.0.0.1:' + port + '/login');
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});
