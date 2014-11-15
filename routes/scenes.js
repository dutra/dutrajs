var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    Scene.getNearest([42.3238266, -70.9869596], {index: 'coords', maxDist: 5100100}, function(err, scenes) {
	    console.log("Nearest: "+err);
	    
	    if(err) {
		return next(err);
	    }
	    res.json(scenes);
	    res.end();
	    
	});

        // res.format({
        //     html: function(){
	// 	console.log("HTML");
	// 	res.render('scenes', { title: 'scenes', view: 'scenes' });
		
        //     },
	//     json: function(){
	// 	console.log("JSON");
	// 	Scene.find({}).exec(function(err, scenes) {
	// 	    if(err) {
	// 		return next(err);
	// 	    }
	// 	    res.json(scenes);
	// 	    res.end();
		    
	// 	});
	//     }
	// });
});

router.put('/location', function(req, res, next) {
    console.log("coords");
    if(req.body.location) {
	Scene.getNearest(req.body.location, {index: 'coords', maxDist: req.body.maxDistance})
	    .exec(function(err, scenes) {
	    console.log("Nearest: "+err);
	    
	    if(err) {
		return next(err);
	    }
	    res.json(scenes);
	    res.end();
	    
	});
    } else {
	res.end();
    }

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

router.get('/:id', function(req, res) {
    
    Scene.findOne({id: req.params.id}).exec(function(err, scene){
        if (err) {
            return next(err);
        }
        else if (!scene) {
            return next();
        }
	console.log(JSON.stringify(scene));
	res.json(scene);
    });
});


module.exports = router;
