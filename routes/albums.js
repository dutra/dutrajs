var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    res.render('albums', { title: 'albums', view: 'albums' });
});

router.param(function(name, fn){
    if (fn instanceof RegExp) {
        return function(req, res, next, val){
            var captures;

            if (captures = fn.exec(String(val))) {
                req.params[name] = captures[0];
                next();
            } else {
                next('route');
            }
        }
    }
});

router.param('id', /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i); 

router.get('/:id', function(req, res, next) {
    Album.find({id: req.params.id}).populate('photos').exec(function(err, album){
        if (err) {
            return next(err);
        }
        else if (!album) {
            return next(new Error('failed to load album'));
        }
	console.log('ALBUM: '+album);
	res.json(album);
    });
});


module.exports = router;