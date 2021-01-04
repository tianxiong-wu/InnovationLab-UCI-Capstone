

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// example
const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //trim the whitespace at the end
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;