var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('about_intro', { title: 'about', view: 'about', subview: 'intro' });
});
router.get('/intro', function(req, res) {
  res.render('about_intro', { title: 'about', view: 'about', subview: 'intro' });
});
router.get('/hobbies', function(req, res) {
  res.render('about_hobbies', { title: 'about', view: 'about', subview: 'hobbies' });
});
router.get('/faq', function(req, res) {
  res.render('about_faq', { title: 'about', view: 'about', subview: 'faq' });
});

module.exports = router;
