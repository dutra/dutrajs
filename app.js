var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('lodash');
var Waterline = require('waterline');
var rethinkdbAdapter = require('./models/adapter');

global.__base = __dirname + '/';

var config = require('./config');

// routes
var routes = require('./routes/index');
var about = require('./routes/about');
var photos = require('./routes/photos');
var users = require('./routes/users');
var travel = require('./routes/travel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/about', about);
app.use('/photos', photos);
app.use('/users', users);
app.use('/travel', travel);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404);
    res.render('404.html');
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


// set up ORM
// Instantiate a new instance of the ORM
var orm = new Waterline();

// Load the Models into the ORM
orm.loadCollection(require('./models/photo'));

orm.initialize(config, function(err, models) {
    if(err) throw err;

    app.models = models.collections;
    app.connections = models.connections;

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    _.each(app.models, function(model, key) {
        global[capitaliseFirstLetter(key)] = model;
    });

});


module.exports = app;
