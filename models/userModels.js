const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true,'Please provide a username']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;