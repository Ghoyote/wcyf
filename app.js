// Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SchemaObject = require('schema-object');
var mongoose = require('mongoose');
var stormpath = require('express-stormpath');

// store routes
var index = require('./routes/index');
var users = require('./routes/users');
var make_blog = require('./routes/make-blog');

var app = express();


// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/wcyf')
mongoose.connection.on('connected', function () {
	console.log('Connected to mongoose');
});
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose connection disconnected');
});
process.on('SIGINT', function() {
	mongoose.connection.close(function () {
		console.log('Mongoose connection disconnected on app termination');
		process.exit(0);
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(stormpath.init(app, {
	website: true,
	web: {
		register: {
			enabled: false
		}
	}
}));

app.use('/', index);
app.use('/users', users);
app.use('/admin/',stormpath.authenticationRequired, make_blog);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
