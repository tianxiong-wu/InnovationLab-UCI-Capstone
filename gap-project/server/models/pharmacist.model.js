const mongoose = require('mongoose');
const patient = require('./patient.model');

const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    password: {
        type: String
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trime: true,
    },
    birthday: {
        type: Date,
    },
    assignedPatient: {
        type: [patient.schema],
        default: []
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