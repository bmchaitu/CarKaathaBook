const app = require('express');
const Router = app.Router();
const Car = require('../models/Car');
const Auth = require('../middleware/auth');

Router.get('/',(req,res)=>{
    Car.find({},function(err,result){
        if(!err){
            res.json(result);
        }
    });
});


Router.post('/',function(req,res){
    const car = new Car({
        model : req.body.model,
        year : req.body.year,
        color : req.body.color
    });
    car.save(function(err){
        if(!err)
        res.status(200).json({msg:'car added'});
        else
        res.status(400).json({msg:'car not added'});
    });
});


Router.get('/:model',function(req,res){
    Car.find({model:req.params.model},function(err,result){
        if(err)
        res.send("Error in getting data");
        else
        res.send(result);
    });
});


Router.put('/:id',function(req,res){
    Car.findOneAndUpdate({_id:req.params.id},{
        model:req.body.model,
        year:req.body.year,
        color : req.body.color
    },function(err,result){
        if(!err)
        res.status(200).json({msg:'customer updated'});
        else
        res.status(400).json({msg:'failed'});
    });
});

Router.delete('/:id',function(req,res){
    Car.findByIdAndDelete({_id:req.params.id},function(err){
        if(!err)
            res.status(200).json({msg:'deleted'});
        else
            res.status(400).json({msg:'Not deleted'});
    });

});
module.exports = Router;