var express = require('express');
var router = express.Router();
var r = require('rethinkdb');

var config = require(__base + "/config.js");

router.use(createConnection);

router.get('/', function(req, res) {
    res.render('travel', { title: 'travel', view: 'travel' });
});

router.get('/scenes', getAll);

router.use(closeConnection);

function createConnection(req, res, next) {
    r.connect(config.rethinkdb, function(error, conn) {
        if (error) {
            next(error);
        }
        else {
            req._rdbConn = conn;
            next();
        }
    });
}

function closeConnection(req, res, next) {
        req._rdbConn.close();
}

function getAll(req, res, next) {
    r.table('scenes').run(req._rdbConn, function(error, cursor) {
        if (error) {
	    next(error);
	}
        else {
            // Retrieve all the scenes in an array
            cursor.toArray(function(error, result) {
                if (error) {
                    next(error);
                }
                else {
                    res.send(JSON.stringify(result));
                }
            });
        }
        next();
    });
}

module.exports = router;
