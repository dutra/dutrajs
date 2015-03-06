var express = require('express');
var router = express.Router();
var marked = require('marked');
var fs = require('fs');
var highlightjs = require('highlight.js');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        console.log(code);
        console.log(highlightjs.highlightAuto(code).value);
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
        console.log(data);



        var md = marked(data);
        console.log(md);

        res.render('posts_show', { title: 'post', view: 'x', subview: 'x',
            md: md});
        });
});

module.exports = router;
