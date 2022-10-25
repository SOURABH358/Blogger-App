const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

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
    },
    photo: {
        type: String,
        default: '/blogger/public/images/blog-bg.jpg'
    },
    website: String,
    country: String, 
    state: String, 
    city: String,
    linkedin: String, 
    twitter: String, 
    instagram: String,
    github: String,
    passwordChangedAt: Date,
    resetToken: String,
    resetTokenExpiration: Date
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12)
    
    this.confirmPassword = undefined;
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')||this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
})
userSchema.methods.checkPassword = function(candidate, user){
    return bcrypt.compare(candidate, user)
}
userSchema.methods.changedPassword = function(jwtexpiredate){
    if(!this.passwordChangedAt) return false;
    const timestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
    return jwtexpiredate < timestamp;

}
userSchema.methods.generateToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex')

    const encryptedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetToken = encryptedToken;
    this.resetTokenExpiration = Date.now() + 10 * 60 * 1000;

    return resetToken;
}
const userModel = mongoose.model('User', userSchema)

module.exports = userModel;