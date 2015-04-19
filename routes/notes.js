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

router.get('/', function(req, res, next) {
        res.render('notes', { title: "Notes"});
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


router.param('folder', /^[a-zA-Z_]+$/i);
router.param('file', /^[a-zA-Z_]+$/i);

/* GET home page. */
router.get('/:folder/:file', function(req, res, next) {
    console.log(req.params.file);
    var file = '_notes/'+req.params.folder+'/'+req.params.file+'.md';
    fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
            console.log(next);
            return next(err);
        }

        var fmout = fm.parse(data);
        var md = marked(fmout.body);

        res.render('note', { title: fmout.attributes.title, //view: 'x', subview: 'x',
            md: md, sections: fmout.attributes.sections});
        });
});
/* GET home page. */
router.get('/:file', function(req, res, next) {
    console.log(req.params.file);
    var file = '_notes/'+req.params.file+'.md';
    fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
            console.log(next);
            return next(err);
        }

        var fmout = fm.parse(data);
        var md = marked(fmout.body);

        res.render('note', { title: fmout.attributes.title, //view: 'x', subview: 'x',
            md: md, sections: fmout.attributes.sections});
        });
});

module.exports = router;
