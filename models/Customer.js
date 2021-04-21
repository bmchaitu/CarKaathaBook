const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name : String,
    email : String,
    contact : Number
});
const Customer = new mongoose.model('customer',customerSchema);

module.exports = Customer;