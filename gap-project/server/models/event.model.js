const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: Date.now
    },
    notifyAt: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        default: ''
    },
    tutorialId: {
        type: String,
    }

});

const events = mongoose.model('events', eventSchema);

module.exports = events;