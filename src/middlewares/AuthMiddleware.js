// class AuthMiddleware{
    function checkAuth(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/users/sign-in');
    }

// }

module.export = checkAuth;