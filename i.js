var restify = require('restify');

function respond(req, res, next) {
    res.send({message: 'hello ' + req.params.name});
    next();
}

var server = restify.createServer({
    name: 'ccREST',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/:name', respond);
server.head('/:name', respond);

server.listen(1235, function() {
    console.log('%s listening at %s', server.name, server.url);
});