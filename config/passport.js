const passport = require('passport');

const localStrategy = require ("passport-local").Strategy;

const User = require('../models/user');

//user passport to authenticate the user

passport.use(new localStrategy({
    usernameField: 'username'
},
    //the passport function will take 3 arguments username and password form the browser and will returns a done that can take two arguments:
    //1) Error
    //2) The Object that we need to return
    function(username,password,done){
        //find username in Data Base
        User.findOne({name: username},(err,user)=>{
            if(err){
                console.log(err);
                return done(err);
            }

            if(!user||(user.password != password)){
                //if the username is not found or the password not match the userpassword and throw a error.
                console.log("Invalid Username / Password");
                return done(null,false);
            }
            //return the user that we found in the Data Base
            return done(null,user);
        });
    }
));

//serialize user function
//telling that userid to be put into the cookie

passport.serializeUser((user,done)=>{
    console.log("lze intalzed");
    done(null,user.id);
});

//deserialize user function
//telling the cookie that we got back from the user browser and check that in the DB

passport.deserializeUser((id,done)=>{
    console.log("declze intalzed");
    User.findById(id,(err,user)=>{
        return done(err,user);
    })
});

// check if the user is authenticated
passport.checkAuthentication=(req, res, next)=>{
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/sign-in');
};
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
};


module.exports=passport
