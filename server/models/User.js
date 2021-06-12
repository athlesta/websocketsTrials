const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    join_date: {
        type: Date,
        default: Date.now,
    },
    aplliances_array: {
        type: Array,
        default: []

    }

})

userSchema.methods.generateJwt = function () {
    return jwt.sign({ 
        _id: this._id,
        username: this.username
    },
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

module.exports = mongoose.model('User',userSchema);
