const passport =require('passport');

const signin = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }
    return res.render('sign-in', {
        title: "Sign In",
        error:""
    });
}

const signup=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }
    return res.render('sign-up', {
        title: "Sign Up",
        error: ""
    });
}

module.exports={
    signin,
    signup
} 