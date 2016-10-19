var restify = require('restify');
var router = require('./router');
var router2 = require('./router2');
var socketio = require('socket.io');
var server = restify.createServer({
    name: 'ccREST',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
router.applyRoutes(server);
router2.applyRoutes(server);

var io = socketio.listen(server);

//server.head('/:name', respond);
io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

server.listen(1235, function() {
    console.log('%s listening at %s', server.name, server.url);
});