const tutorial  = require('./tutorial.model');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const infusionSchema = new Schema({
    infusion: {
        type: tutorial.schema,
        required: true,
    },
    note: {
        type: String,
    }
});
// patient
const patientSchema = new Schema({

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
    role: {
        type: String,
        default: 'patient'
    },
    infusionArray: {
        type: [infusionSchema],
    },
    notification: {
        type: Array
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others'],
        required: true,
    },
    recentCheckIn: {
        type: Date,
        required: true,
    },
    nextCheckIn: {
        type: Date,
        required: true,
    },
    notificationType: {
        type: String,
        enum: ['text', 'email', 'both', 'none'],
        required: true,
        default: 'both'
    },
    assignedPharmacist: {
        type: String
    }
}, {
    timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;