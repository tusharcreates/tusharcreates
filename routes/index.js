const express=require('express');
const router = express.Router();
const homeController=require('../controllers/home_controller')

console.log(`router is loaded!`);

router.get('/sign-in',homeController.signin);
router.get('/sign-up',homeController.signup);
router.use('/users',require('./users'));

module.exports=router;
