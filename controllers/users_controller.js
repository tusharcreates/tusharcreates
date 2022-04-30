const User=require('../models/user')
const create = function(req,res){
    if(req.body.new_password!=req.body.confirm_password){
        return res.render('sign-up',{
            title:"Sign Up Failed",
            error:"Please Re-Enter, Passwords Don't Match"
        })
    }
    else{
        var item = {
            name: req.body.username,
            password: req.body.new_password
        };
        console.log(item);
        User.findOne({name:req.body.username},function(err,user){
            if(err){
                console.log('Error In Finding The User In The DB');
                return;
            }
            if(!user){
                User.create(item,(err,user)=>{
                    if(err){
                        console.log(err);
                        return;
                    }
                    return res.render('sign-in',{
                        title: 'Sign In',
                        error: 'User Created'
                    });
                })}
            else{
                return res.render('sign-up',{
                    title: 'Sign Up',
                    error: 'Cannot Create Create Again'
                });
            }
            
        });
    }
}

module.exports={
    create
};