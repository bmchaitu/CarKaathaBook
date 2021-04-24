const CustomerRoute = require('../routes/customer');
const CarRoute = require('../routes/car');
const rootRoute = require('../routes/root');

module.exports = function(app){
    app.use('/api/customers',CustomerRoute);
    app.use('/api/cars',CarRoute);
    app.use('/',rootRoute);
};