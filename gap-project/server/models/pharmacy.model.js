const mongoose = require('mongoose');
const { schema } = require('./tutorial.model');
const Schema = mongoose.Schema;

const pharmacySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);
module.exports = Pharmacy;