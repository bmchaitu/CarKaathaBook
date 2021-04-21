const express =require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Auth = require('../middleware/auth');

router.get('/',(req,res)=>{
    Customer.find({},function(err,result){
        if(!err){
        res.render('customerlist',{Customers:result});
        }
    });
});


router.post('/',function(req,res){
    customer = new Customer({
        name : req.body.name,
        email : req.body.email,
        contact : req.body.contact});
    customer.save(function(err){
        if(!err)
        res.redirect('/api/customers');
        else
        res.send('data not saved');
    });
});


router.get('/:name',Auth,function(req,res){
    Customer.find({name:req.params.name},function(err,result){
        if(err)
        res.send("Error in getting data");
        else
        res.send("cutomer data aquired.");
    });
});

router.put('/:name',function(req,res){
    Customer.findOneAndUpdate({name:req.body.name},{
        name:req.body.name,
        email:req.body.email,
        contact : req.body.contact
    },function(err,result){
        if(!err)
        res.send('cutomer updated');
    });
});

module.exports = router;