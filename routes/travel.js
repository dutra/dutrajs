var express = require('express');
var router = express.Router();



router.get('/', function(req, res) {
    res.render('travel', { title: 'travel', view: 'travel' });
});

router.get('/scenes', function(req, res, next) {
    Scene.find({}).exec(function(err, scenes) {
	if(err)
	    next(err);
	console.log(JSON.stringify(scenes));
	res.json(scenes);
    });
 
});

module.exports = router;
