const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FAQSchema = new Schema({
    question: {
        type: String,
    },
    answer: {
        type: String
    }
});

const FAQs = mongoose.model('FAQs', FAQSchema);

module.exports = FAQs;

