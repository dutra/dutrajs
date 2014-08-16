var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    Album.find({}).exec(function(err, albums) {
	console.log(JSON.stringify(albums));
	res.render('albums', { title: 'albums', view: 'albums', albums: albums });

    });
 
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
    Album.findOne({id: req.params.id}).populate('photos').exec(function(err, album){
        if (err) {
            return next(err);
        }
        else if (!album) {
            return next(new Error('failed to load album'));
        }
	logger.info(JSON.stringify(album));
	res.render('album', { album: album, photos: album.photos });
    });
});


module.exports = router;
