const signin = function(req,res){
    return res.render('sign-in.ejs', {
        title: "Sign In"
    });
}

const signup=function(req,res){
    return res.render('sign-up', {
        title: "Sign Up",
        error: ""
    });
}

module.exports={
    signin,
    signup
} 