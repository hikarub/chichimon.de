var app = require('koa')(),
    server = require('http').createServer(app.callback()),
    io = require('socket.io')(server),
    serve = require('koa-static'),
    util = require('util'),
    parser = require('koa-bodyparser'),
    router = require('koa-router');

var PORT = 8080;

app.proxy = true;

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    var t = new Date;
    this.body = 'HELLO !!!';
    console.log('[%s] [%s] [%s %s] %sms', t.toISOString(), this.ips, this.method, this.url, ms);
});

app
    .use(serve(__dirname + '/public'))
    .use(parser())
//    .use(router.routes())
//    .use(router.allowedMethods());

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

server.listen(PORT);
console.log('HIKARU is Running on http://localhost:' + PORT);