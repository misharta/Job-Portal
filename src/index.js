require('dotenv').config()
const express=require('express');
const cookieParser= require('cookie-parser');
const port=3000;
const app=express();
const expressLayouts =require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sessions = require('express-session');
const passport = require('passport');
const User = require('./Schema/UserSchema');
const bcrypt = require('bcrypt');
const  initialize  = require('./middlewares/passport-config');
const { userSignIn } = require('./controllers/userController');
const Users = require('./Schema/UserSchema')

initialize(passport);
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))



//set up the view engine
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');



app.set('public', path.join(__dirname, 'public'));
app.use(express.static('./public'));


app.use(sessions({
    secret : process.env.SECRET_TOKEN,
    resave : false,
    saveUninitialized : false 
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/connectIt")
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})


//use express router
app.use('/',require('./routes/homepageRouter'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});