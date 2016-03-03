/**
 * Created by Tauqeer Ahmed on 3/4/2016.
 */
/*This is main server file (starting of our application)*/
//Requiring required modules
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
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

