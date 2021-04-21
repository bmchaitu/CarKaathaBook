require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const CustomerRoute = require('./routes/customer');
const CarRoute = require('./routes/car');
const PORT =  process.env.PORT || 4500;
const session = require('express-session');
const passport = require('passport');
const Auth = require('./middleware/auth');
const passportLocalMongoose = require('passport-local-mongoose');
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api/customers',CustomerRoute);
app.use('/api/cars',CarRoute);


app.use(session({
    secret : "little secret.",
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_STRING,{useNewUrlParser:true, useUnifiedTopology:true});

userSchema = new mongoose.Schema({
	username : String,
	password : String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user',userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.get('/',function(req,res){
    if(req.isAuthenticated())
    res.render('dashboard');
    else
    res.render('home');
});
app.get('/dashboard',Auth,function(req,res){
    res.render('dashboard');
});
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
app.get('/register',function(req,res){
    res.render('signup');
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
app.get('/login',function(req,res){
    res.render('login');
});

app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
})

app.get('/api/addcars',Auth,function(req,res){
    res.render('addcars');
});
app.get('/api/addcustomers',Auth,function(req,res){
    res.render('addcustomer');
});
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});