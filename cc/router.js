var Rt = require('restify-router').Router;
var router = new Rt();
var fs = require('fs');
var log4js = require('log4js');
log4js.configure('conf.json', { cwd: ''});
var logger = log4js.getLogger('REST');

function respond(req, res, next) {
    fs.readFile(__dirname + '/v/0.html', function (err, data) {
        if (err) {
            next(err);
            return;
        }

        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
        logger.info('GET HOMEPAGE');
        next();
    });
}

var saySth = function(req, res, next){
    res.send('HEY ' + req.params.sb);
    logger.info('GET /m/' + req.params.sb);
    next();
};

router.get('/m/:sb',saySth);
router.get('/', respond);

module.exports = router;