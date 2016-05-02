var app = require('koa.io')(),
    r = require('./model/red'),
    fs = require('fs'),
    serve = require('koa-static'),
    util = require('util'),
    parser = require('koa-bodyparser'),
    router = require('./router/router'),
    favicon = require('koa-favicon');

var PORT = 1234;
process.env.NODE_ENV = 'production';
app.proxy = true;

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    var t = new Date;
    var ip = this.ips;
    yield r.zincrby('ip',1,ip.toString());
    console.log('[%s] [%s] [%s %s] %sms', t.toUTCString(), ip, this.method, this.url, ms);
});

app
    .use(serve(__dirname + '/public'))
    .use(parser())
    .use(router.routes())
    .use(router.allowedMethods());

io.on.route('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.listen(PORT);
console.log('CHICHIMONde is Running ...);
