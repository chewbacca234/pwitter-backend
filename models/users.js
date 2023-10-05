const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: 'user_default.png',
    },
    token: {
        type: String,
        required: true,
        unique: true,
    },
});

//Export the model
module.exports = mongoose.model('User', userSchema);