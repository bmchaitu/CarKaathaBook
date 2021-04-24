const express = require('express');
const router = express.Router();
const Auth = require('../middleware/auth');

// router.get('/',function(req,res){
//     if(req.isAuthenticated())
//     res.render('dashboard');
//     else
//     res.render('home');
// });

router.get('/login',function(req,res){
    res.render('login');
});

router.get('/register',function(req,res){
    res.render('signup');
});

router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});

router.get('/dashboard',Auth,function(req,res){
    res.render('dashboard');
});

router.get('/api/addcars',Auth,function(req,res){
    res.render('addcars');
});
router.get('/api/addcustomers',Auth,function(req,res){
    res.render('addcustomer');
});

module.exports = router;