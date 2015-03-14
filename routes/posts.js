var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');
var highlightjs = require('highlight.js');
var fm = require('json-front-matter');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return highlightjs.highlightAuto(code).value;
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


router.param('path', /^[^/.][a-zA-Z]+[/]?[a-zA-Z]+$/i);

/* GET home page. */
router.get('/:path', function(req, res) {
    var file = '_posts/'+req.params.path+'.md';
    fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
            return res(err);
        }

        var fmout = fm.parse(data);
        var md = marked(fmout.body);

        res.render('post', { title: fmout.attributes.title, //view: 'x', subview: 'x',
            md: md, sections: fmout.attributes.sections});
        });
});

module.exports = router;
