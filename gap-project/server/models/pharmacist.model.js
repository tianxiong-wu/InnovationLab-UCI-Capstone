const mongoose = require('mongoose');
const patient = require('./patient.model');

const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trime: true,
        required: true,
    },
    birthday: {
        type: Date,
    },
    assignedPatient: {
        type: [patient.schema]
    },
    role: {
        type: String,
        default: 'pharmacist'
    }
},{
    timestamps: true
});

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;