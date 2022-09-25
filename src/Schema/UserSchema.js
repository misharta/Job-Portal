const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose')
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true,

    },
    name:{
        type: String,
        required:true
    },
    isuser: {
        type: Boolean
    },
    subs: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    applied_jobs: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    prior_experience: {
        type: Number,
        required: true
    },
    interest : {
        type : String,
        required : true
    },
    hidden_score: {
        type: Number,
        required: true
    }

},{
    timestamps:true
});

userSchema.plugin(passportLocalMongoose);
// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"

const User= mongoose.model('User',userSchema);

passport.use(User.createStrategy());
module.exports = User;