var express = require('express');
//var bp = require('body-parser');
var app = express();
var crypro = require('crypto');

var log4js = require('log4js');
log4js.configure('conf.json', { cwd: ''});
app.set('trust proxy', true);
var logger = log4js.getLogger('CC');

app.set('view engine', 'ejs');
var d = __dirname + '/v';
app.set('views', d);

function sha1(str){
	var md5 = crypto.createHash('sha1');
	md5.update(str);
	str = md5.digest('hex');
	return str;
}

var conf = {
	appID: 'wx3dade2f3d2a28f00',
	appSecret: '',
	token: 'chichimonde'
}


app.get('/', function(req, res){
	var token = conf.token;
	var signature = req.query.signature;
	var echostr = req.query.echostr;
	var timestamp = req.query.timestamp;
	var nonce = req.query.nonce;
	var st = [token, timestamp, nonce].sort().join('');
	var cryptSt = sha1(st);
	if (cryptSt === signature) {
		res.end(echostr);
	}
	else {
		res.end('ERROR');
	}
    //res.render('index',data);
    logger.info('['+ req.ips + '] [' + req.method + '] [' + req.originalUrl + ']');
});

app.listen(1234);
console.log('Application Started on http://localhost:1234/');

