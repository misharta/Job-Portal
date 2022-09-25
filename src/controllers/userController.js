const passportLocalMongoose = require('passport-local-mongoose');
const localStrategy = require('passport-local').Strategy;
const passport = require('passport')
const User = require('./../Schema/UserSchema');
const bcrypt = require('bcrypt');

class UserController {
    static userSignUp(req,res){
        console.log("in user controller");
       res.render('usersignup.ejs');
    }

    static userSignIn(req,res){
       res.render('usersignin.ejs');
    }

    static SignOut(req,res,next){
        req.logout((err)=>{
            console.log(err);
            next();
        });
        res.redirect('/');
    }

    static async currentUserProfile(req,res){
       console.log(req.user);
        let notif = [];
        let jobs = [];
        // console.log(req.user);
        try{
        let user = await User.findById(req.user);
        return  res.render('profile.ejs',{
            title: "User",
            profile_user : user,
            user : user,
            notif : notif,
            jobs: jobs
        
        });
        }
        catch(err){
            console.log(err);
            return res.redirect('/');
        }
    }


     static userLogin(req,res){
        if(req.is_authenticated()){
            return res.redirect('profile');
        }
        else return res.redirect('sign-in');
     }
    static async register(req,res){
       try{
        let userbyEmail = await User.findOne({email:req.body.email});
        if(!userbyEmail){
        let count  = 0;
        let hashedPass =  await bcrypt.hash(req.body.password,10);
        let hashedConfirmPass = await bcrypt.compare(req.body.confirm_password,hashedPass);
        console.log(hashedPass);
        console.log(hashedConfirmPass);
        
        if(hashedConfirmPass === false){
            console.log("password and confirm password didnot match");
            return res.redirect('sign-up');
        }
        
        User.create({ 
                        email : req.body.email,
                        name: req.body.name,
                        username : req.body.email,
                        password: hashedPass,
                        prior_experience: req.body.prior_experience,
                        interest: req.body.interest,
                        isuser: req.body.isuser, hidden_score: count});
         return res.redirect('sign-in');
        }
        
        console.log("user with same email already exists");
         return res.redirect('sign-up');
        }
       catch(err){
            console.log(err);
            return res.redirect('sign-up');
       }
     }
    
}

module.exports = UserController;