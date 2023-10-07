const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    picture: {
        type: String,
        default: '/images/user_default.png',
        required: false,
        unique: false,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
    likedList: [String],
});

//Export the model
module.exports = mongoose.model('User', userSchema);