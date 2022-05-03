const req = require('express/lib/request');
const User=require('../models/user')


const profile = (req,res) =>{
    return res.render('user_profile',{
        title: 'Profile'
    });
}

const create = (req,res)=>{
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
};

const logout=(req,res)=>{
    req.logout();
    return res.redirect('/sign-in');
}




//USEING PASSPORT JS IN OUR SITE
const createSession = (req,res) => {
    return res.redirect('/users/profile');
}


module.exports={
    create,
    createSession,
    profile,
    logout
};















// const create = (req,res)=>{
//     if(req.body.new_password!=req.body.confirm_password){
//         return res.render('sign-up',{
//             title:"Sign Up Failed",
//             error:"Please Re-Enter, Passwords Don't Match"
//         })
//     }
//     else{
//         var item = {
//             name: req.body.username,
//             password: req.body.new_password
//         };
//         console.log(item);
//         User.findOne({name:req.body.username},function(err,user){
//             if(err){
//                 console.log('Error In Finding The User In The DB');
//                 return;
//             }
//             if(!user){
//                 User.create(item,(err,user)=>{
//                     if(err){
//                         console.log(err);
//                         return;
//                     }
//                     return res.render('sign-in',{
//                         title: 'Sign In',
//                         error: 'User Created'
//                     });
//                 })}
//             else{
//                 return res.render('sign-up',{
//                     title: 'Sign Up',
//                     error: 'Cannot Create Create Again'
//                 });
//             }
            
//         });
//     }
// };
// const createSession = (req,res)=>{
//     User.findOne({name:req.body.username},(err,user)=>{
//         if(err){
//             console.log(err);
//             return;
//         }
//         if(user){
//             if(req.body.password==user.password){
//                 res.cookie('user_id',user.id);                
//                 return res.redirect('/users/profile');
//             }
//             else{
//                 return res.redirect('sign-in',{
//                     title: 'Sign In',
//                     error: `Password does not match the username`
//                 });
//             }
           
//         }
//         else{
//             return res.render('sign-in',{
//                 title: "Sign In",
//                 error: 'user not found please make a account'
//             })
//         }
//     })
// };
// const profile = (req,res) => {
//     console.log(req.cookies);

//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id,function (err,user){
//         if(user){
//             return res.render('user_profile',{
//                 title: "Profile",
//                 name: user.name,
//                 password: user.password
//             })
//         }else{
//             return res.redirect('/sign-in');
//         }
//     });
// }else{
//         return res.redirect('/sign-in');
//     }
// };