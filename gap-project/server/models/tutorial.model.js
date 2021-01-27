const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// schema for url
const urlSchema = new Schema({
    url: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    order: {
        type: Number,
    },
    description: {
        type: String,
    },
    duration: {
        type: Number
    }
});

const tutorialSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,

        trim: true
    },
    url: {
        type: [urlSchema],

    },
    duration: {
        type: Number
    }
},{
    timestamps: true
});



const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;