/**
 * Created by Tauqeer Ahmed on 3/4/2016.
 */

/*configuring the strategies for passport*/

var localStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function (passport) {

    //passport session setup
    //required for persistent login sessions
    //passport needs ability to serialize and unserialize users out of session

    //used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //used to deserialize user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //local signup
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true    //allow us to pass back the entire request to the callback

        },
        //Call back function
        function (req, email, password, done) {
            //asynchronous
            //User.findOne wont fire unless data is sent back
            process.nextTick(function () {
                //find a user whose email is the same as the form email
                //we are checking to see if the user trying to login already exists
                User.findOne({'local.email': email}, function (err, user) {
                    //if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }
                    //check to see if there's already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken'))
                    }
                    else {
                        //if there is no user with that email
                        //create the user
                        var newUser = new User();
                        //set the local credentials
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        //save the user to the database
                        newUser.save(function (err) {
                            if (err) {
                                throw err;
                            }
                            return done(null, newUser);
                        });
                    }
                })
            })
        }));

    //Local login
    //We are using named strategies since we have one for login and one for signup
    //by default if there was no name , it would just called 'local'

    passport.use('local-login',new localStrategy({
        //by default local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true //allow us to pass back the entire request to the callback

    },
        //call back with email and password from our form
        function(req,email,password,done){
            //find a user whose email is the same as the form email
            //we are checking to see if the user trying to login already exists
            User.findOne({'local.email' : email},function(err,user){

                //if there are any errors, return the error before any thing else
                if(err){
                    return done(err);
                }
                //if no user found return the message
                if(!user){
                    // req.flash is the way to set flashdata using connect-flash
                    return done(null,false,req.flash('loginMessage','No user found.'))
                }
                //if the user is found but the password is wrong
                if(!user.validPassword(password)){
                    return done(null,false,req.flash('loginMessage','Wrong password'));
                }

                return done(null,user);
            })
        }));

};