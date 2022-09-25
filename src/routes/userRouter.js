const express=require('express');
const router =express.Router();
const passport = require('passport')
router.use(express.urlencoded({ extended: true }));
const UserController = require('../controllers/userController');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Schema/UserSchema')

console.log('router started');
router.get('/sign-up',UserController.userSignUp);
router.get('/sign-in',UserController.userSignIn);
router.get('/profile',checkAuth,UserController.currentUserProfile);
router.post('/sign-in',passport.authenticate('local',{
    successRedirect:'/users/profile',
    failureRedirect:'sign-in',
    // failureFlash:true
}));
router.post('/create',UserController.register);
router.post('/sign-out',UserController.SignOut)

// router.post('/destroy-session',passport.checkAuthentication,UserController.destroySession);

function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}


module.exports = router;
