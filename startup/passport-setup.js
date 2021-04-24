const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require('mongoose');

module.exports = function(app){
    app.use(session({
    secret : "little secret.",
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(process.env.DB_STRING,{useNewUrlParser:true, useUnifiedTopology:true});
mongoose.set('bufferCommands', false);
console.log(typeof(process.env.DB_STRING))
userSchema = new mongoose.Schema({
	username : String,
	password : String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user',userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/register',function(req,res){
    User.register({username:req.body.username}, req.body.password, function(err,user){
        if(err){
            console.log(err)
            res.send('user not registered');
        }
        else
        {
            passport.authenticate('local')(req,res,function(){
                res.redirect('/dashboard'); 
            })
        }

    })
});

app.post('/login',function(req,res){
    const user = new User({
        username:req.body.username,
        password : req.body.password
    });
    req.login(user,function(err,result){
        if(err)
        console.log(err)
        else
        passport.authenticate('local')(req,res,function(){
            res.redirect('/dashboard');
        })
    })
});
}