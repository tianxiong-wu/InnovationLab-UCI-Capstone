const tutorial  = require('./tutorial.model');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// example
const userSchema = new Schema({

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
        unique: true
    },
    birthday: {
        type: Date,
    },
    role: {
        type: String,
        enum: ['patient', 'admin', 'pharmacist', 'intake'],
        required: true,
    },
    infusionArray: {
        type: [tutorial.schema],
    },
    notification: {
        type: Array
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;