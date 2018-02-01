var express  = require('express');
var app      = express();
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.Promise=global.Promise;
mongoose.connect(configDB.url); // connect to our database
mongoose.connection.once('open',function(){
  console.log("Database Connection opened.");
});

mongoose.connection.on('error',function(){
  console.log("Please make sure that mongodb server is running");
});

require('./config/passport')(passport); // pass passport for configuration


app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', path.join(__dirname,'/app/views'));

// required for passport
	app.use(session({
		  name : 'myCustomCookie',
		  secret : 'myAppSecret',
		  resave : true,
		  httpOnly : true,
		  saveUninitialized: true,
		  cookie:{secure:false}
	}));

	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/controllers/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(3000,function(){
  console.log("Social Network running on port:",3000);
});
