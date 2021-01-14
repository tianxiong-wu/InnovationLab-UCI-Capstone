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
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;