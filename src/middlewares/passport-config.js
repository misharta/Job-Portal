const { authenticate } = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userbyId = require('../Schema/UserSchema')
const bcrypt = require('bcrypt');
const Users = require('../Schema/UserSchema')
const  initialize = ( passport,  findUserbyEmail )=>{
    const authenticateUser = async (email,password,done)=>{
        try{
        const user = await Users.findOne({email:email});
        if(user==null){
            console.log("no such person");
                return done(null,false,{message: 'no user by such email'});
        }
        else {
            let checkUser = await bcrypt.compare(password,user.password);
            if(checkUser){
                return done(null,user);
            }  
            else{
                console.log("invalid credentials");
                return done(null,false,{message: 'invalid credentials'});
            }
        }
    }
    catch(err){
        console.log(err);
        return done(err);
    }
    }
    
    passport.use(new LocalStrategy({
        usernameField:'email',
        password:'password' },
        authenticateUser));
    

    passport.serializeUser((user,done)=>{
         console.log("serializer called");   
         done(null,user.id)
        });
    passport.deserializeUser(async (id,done)=>{
       // console.log("deserializer called");
        try{
        let userbyId = await Users.findOne({_id:id});
        if(userbyId)
        return done(null,userbyId);
        else{
            return done(null,false);
        }
        }
        catch(err){
            console.log(err);
            return done(err);
        }
    });
    

}




module.exports =  initialize;