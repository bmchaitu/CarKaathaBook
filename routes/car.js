const app = require('express');
const Router = app.Router();
const Car = require('../models/Car');
const Auth = require('../middleware/auth');

Router.get('/',(req,res)=>{
    Car.find({},function(err,result){
        if(!err){
            res.render('list',{Cars:result});
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
        res.redirect('/api/cars');
        else
        res.send('data not saved');
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


Router.put('/:model',function(req,res){
    Car.findOneAndUpdate({name:req.body.name},{
        model:req.body.model,
        year:req.body.year,
        color : req.body.color
    },function(err,result){
        if(!err)
        res.send('cutomer updated');
    });
});

module.exports = Router;