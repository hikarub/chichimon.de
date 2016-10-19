var mc = require('mongodb').MongoClient;
var bb = require('bluebird');
var Rt = require('restify-router').Router;
var router = new Rt();

var log4js = require('log4js');
log4js.configure('conf.json', { cwd: ''});
var logger = log4js.getLogger('MONGO');

var db_uri = 'mongodb://172.20.0.4:27017/sm';

var saveData = function (req, res, next) {
  var w = {en: req.params.sth};
  mc
    .connect(db_uri, {
      promiseLibrary: bb
    })
    .then(function(db) {
      logger.info('MONGO INSERT ' + JSON.stringify(w));
      return db
        .collection('word')
        .insert(w)
        .finally(db.close.bind(db))
    })
    .catch(function(err) {
      console.error("ERROR", err);
    });
  res.send('MONGO INSERT ' + JSON.stringify(w));
  logger.info('GET /m/' + req.params.sth);
  next();
};

router.get('/sd/:sth', saveData);

module.exports = router;