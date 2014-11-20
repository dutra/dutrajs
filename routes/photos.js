var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    Photo.find().sort({date: 'desc'}).exec(function(err, photos) {
        if(err)
            next(err);
        console.log(JSON.stringify(photos));
//	res.json(photos);
       res.render('photos', { title: 'photos', view: 'photos', photos: photos });

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
    
    Photo.findOne({id: req.params.id}).exec(function(err, photo){
        if (err) {
            return next(err);
        }
        else if (!photo) {
            return next();	    
        }
	Album.findOne({id: photo.album_id}).populate('photos').exec(function(err, album) {
	    if (err) {
		return next(err);
	    }
	    console.log("Photo: "+JSON.stringify(photo));
	    res.render('photo', { title: photo.title, photo: photo, album: album });
	});
    });
});


module.exports = router;
