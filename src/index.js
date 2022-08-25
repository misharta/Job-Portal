const express=require('express');
const cookieParser= require('cookie-parser');
const port=3000;
const app=express();
const expressLayouts =require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))



//set up the view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// app.use(express.static('public'));
// app.use(expressLayouts);

// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

app.set('public', path.join(__dirname, 'public'));
app.use(express.static('./public'));

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