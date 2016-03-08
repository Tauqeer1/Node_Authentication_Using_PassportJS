/**
 * Created by Tauqeer Ahmed on 3/4/2016.
 */
/*This is main server file (starting of our application)*/
//Requiring required modules
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');   //For flashing the messages
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//Custom modules
var configDB = require('./config/database.js');

//Defining the port to run the express application
var port = process.env.PORT || 3000;

//Run the express application
var app = express();

//Connect with the database
mongoose.connect(configDB.url);

require('./config/passport')(passport);     //pass passport for configuration

//Set up our express application
app.use(morgan('dev'));     //log every request to the console
app.use(cookieParser());    //read cookies (needed to auth)
app.use(bodyParser.urlencoded({extended : true}));      //get information from html forms

app.set('view engine','ejs');   //setup ejs for templating

//required for passport
app.use(session({
    secret : 'ilovepakistanilovepakistan',
    saveUninitialized : true,
    resave : true
}));  //session secret
app.use(passport.initialize());
app.use(passport.session());    //persistent login sessions
app.use(flash());   //use connect-flash for flash messages stored in session

require('./app/routes.js')(app,passport);   //load our routes and pass in our app and fully configured passport


app.listen(port ,function(){
   console.log('App started at port ' + port);
});
