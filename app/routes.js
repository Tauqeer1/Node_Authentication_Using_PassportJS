/**
 * Created by Tauqeer Ahmed on 3/4/2016.
 */

/*All routes for our application*/

module.exports = function(app,passport){

    //Get the Home page
    app.get('/',function(req,res){
       res.render('index.ejs');
    });

    //Get the Login form
    app.get('/login',function(req,res){
        //render the page and pass in any flash data if it exits
        res.render('login.ejs',{message : req.flash('loginMessage')});
    });

    //Process the login form
    app.post('/login',passport.authenticate('local-login',{
        successRedirect : '/profile',   // redirect to the secure profile section
        failureRedirect : '/login',     // redirect back to the signup page if there is an error
        failureFlash : true             // allow flash messages
    }));

    //Get the signup form
    app.get('/signup',function(req,res){
       //render the page and pass in any flash data if it exits
        res.render('signup.ejs',{message : req.flash('signupMessage')});
    });

    //Process(post) the signup form
    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect : '/profile',   //redirect to secure profile section
        failureRedirect : '/signup',    //Redirect back to signup page if there is an error
        failureFlash : true //allow flash messages (optional)
    }));

    //Profile selection
    //Get the profile page
    app.get('/profile',isLoggedIn,function(req,res){
       res.render('profile.ejs',{user : req.user});     //get the user out of session and pass to template
    });

    //Get the Logout page
    app.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    });


    //Custom Route middleware to make sure a user is logged in
    function isLoggedIn(req,res,next){

        //if user is authenticated in the session , carry on
        if(req.isAuthenticated()){
            return next();
        }

        //if they are not authenticated redirect to home page
        res.redirect('/');
    }

};