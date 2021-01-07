

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// example
const userSchema = new Schema({

    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
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
    role: {
        type: String,
        enum: ['patient', 'admin', 'pharmacist', 'intake'],
        required: true,
    },
    checkinList: {
        type: Array,
    },
    infusionType: {
        type: Array,
    },
    notification: {
        type: Array
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;