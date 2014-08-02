var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('photos', { title: 'photos', view: 'photos' });
});

module.exports = router;
