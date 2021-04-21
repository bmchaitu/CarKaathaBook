const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model:String,
    year : Number,
    color: String
});

const Car = new mongoose.model('car',carSchema);

module.exports = Car;