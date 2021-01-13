const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// schema for url
const urlSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    }
});

const tutorialSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: [urlSchema],
        required: true,
    }

},{
    timestamps: true
});



const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;