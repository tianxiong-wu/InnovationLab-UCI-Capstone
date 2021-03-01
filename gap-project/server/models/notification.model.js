const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    title: {
        type: String,
    },
    notifyAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    }
});

const notifications = mongoose.model('notifications', notificationSchema);

module.exports = notifications;