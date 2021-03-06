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
    videoDescription: {
        type: String,
    },
    thumbnail: {
        type: String,
        default: ""
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
    pharmacistNotes: {
        type: String,
        trim: true
    },
    infusionNotes: {
        type: String,
        trim: true
    },
    video: {
        type: urlSchema
    },
    stepList: {
        type: [String]
    }


});

const tutorialObjectSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    duration: {
        type: String,
        trim: true
    },
    tutorials: {
        type: [tutorialSchema],
    },
},
{
    timestamps: true
});



const Tutorial = mongoose.model('Tutorial', tutorialObjectSchema);

module.exports = Tutorial;