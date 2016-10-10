var express = require('express');
//var bp = require('body-parser');
var app = express();

var log4js = require('log4js');
log4js.configure('conf.json', { cwd: ''});
//app.set('trust proxy', true);
//log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.file('cc.log'), 'CC');
var logger = log4js.getLogger('CC');

app.set('view engine', 'ejs');
var d = __dirname + '/v';
app.set('views', d);

app.get('/', function(req, res){
    var data = {
        title : "jkfljgfd",
        numbers : [1, 2, 3, 4, 5]
    };
    res.render('index');
    logger.info('['+ req.ip + '] [' + req.method + '] [' + req.originalUrl + ']');
});

app.listen(1234);
console.log('Application Started on http://localhost:1234/');

