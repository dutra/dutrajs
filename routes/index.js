var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'home', view: 'index' });
});

router.get('/contact', function(req, res) {
    res.render('contact', { title: 'contact', view: 'contact' });
});


module.exports = router;
