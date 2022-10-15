const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true,'Please provide a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        select : false
    },
    email :{
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please provide email'],
        validate:[validator.isEmail, 'Please provide valid email']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el){
                return el=== this.password
            },
            Message: 'password and confirm password do not match!'
        }
    }
})

userSchema.pre('save',async function(){
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12)
    
    this.confirmPassword = undefined;
})

userSchema.methods.checkPassword = function(candidate, user){
    return bcrypt.compare(candidate, user)
}
const userModel = mongoose.model('User', userSchema)

module.exports = userModel;