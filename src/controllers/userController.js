let userSchema = require('./../Schema/UserSchema');

class UserController {
    static userSignUp(req,res){
        console.log("in user controller");
       res.render('usersignup.ejs');
    }

    static userLogin(req,res){
        
        console.log("in user login");
        res.render('usersignup.ejs');
    }

    static createUser(req,res){
      let bodyObject = req.body; 
        console.log(req);
        
       
        userSchema.findOne({email:req.body.email})
        .then((result)=>{
            if(result){
                return res.redirect('/users/sign-in');
            }
            var count=0;
            if(req.body.q1 == 37)
            count++;
            if(req.body.q2 == 36)
            count++;
            if(req.body.q3 == 106)
            count++;
            userSchema.create({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                prior_experience: req.body.prior_experience,
                interest: req.body.interest,
                isuser: req.body.isuser, hidden_score: count
            })
            .then((result)=>{
                console.log("User registered");
                return res.redirect('/users/sign-in');
            })
           
        })
        .catch((err)=>{
            console.log("Error in User Sign Up"+err);
            return "hii";
        })

    }

    static webhook(req,res){
        console.log(req);
        return "ok";
    }


    

}

module.exports = UserController;