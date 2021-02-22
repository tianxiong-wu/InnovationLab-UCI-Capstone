const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// schema for url
const urlSchema = new Schema({
    //video id
    url: {
        type: String,
    },
    order: {
        type: Number,
    },
    description: {
        type: String,
    },
 
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

    }
},{
    timestamps: true
});



const Tutorial = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorial;