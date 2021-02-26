const mongoose = require('mongoose');
const pharmacist = require('./pharmacist.model');
const pharmacy = require('./pharmacy.model');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    firstName: {
        type: String,
    },
    password: {
        type: String
    },
    lastName: {
        type: String,
    },
    pharmacists: {
        type: [pharmacist.Schema],
        default: []
    } ,
    pharmacy: {
        type: pharmacy.schema,
        default: []
    }

});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;