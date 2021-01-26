const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
    name: {
        type: String,
    },
    streetName: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    }
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
module.exports = Pharmacy;