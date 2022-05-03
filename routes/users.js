const express=require('express');
const router = express.Router();
const passport=require('passport');

const userController=require('../controllers/users_controller');
console.log(passport.checkAuthentication);

router.get('/profile', (req, res, next)=>{
    console.log(req.isAuthenticated());
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/sign-in');
},userController.profile);
router.post('/create',userController.create);

// use passport as a middleware to authenticate
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'}
),userController.createSession);

router.get('/sign-out',userController.logout);

module.exports=router;