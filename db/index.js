const mongoose = require('mongoose'),
    dbconf = require('../config/db');
// this code will use if we provide the password for our mongodb.
// let dbString = 'mongodb://' + dbconf.dbcredentials.user;
// dbString = dbString + ':' + dbconf.dbcredentials.password;
// dbString = dbString + '@' + dbconf.dbcredentials.address;
// dbString = dbString + ':' + dbconf.dbcredentials.port;
// dbString = dbString + '/' + dbconf.dbcredentials.database;

const dbString = "mongodb://localhost:27017/E-Commerce";
mongoose.connect(dbString, {
    useCreateIndex: true,
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;
module.exports = {
    User: require('./models/user'),
    Catgory: require('./models/category')
};