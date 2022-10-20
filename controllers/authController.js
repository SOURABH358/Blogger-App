const userModels = require('../models/userModels')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')

exports.protect = async (req,res,next)=>{
    try{
        let token;
        // 1) jwt exists
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {

        
        token = req.headers.authorization.split(" ")[1];
    }
    else if(req.cookie.jwt){
        token = req.cookie.jwt
    }
    if(!token)
    {
        throw 'You are not logged in, Please log in'
    }
    // 2) verify jwt
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECURITY_KEY)

    
    // 3) user still exist
    const user = await userModels.findById(decoded.id)

    if(!user){
        throw 'user does not exist, please sign up'
    }
    // 4) has the password be changed after jwt
    if(user.changedPassword(decoded.iat))
    {
        throw 'User has changed the password please log in again'
    }
    req.user = user;
    next();
    }
    catch(error)
    {
        res.status(401)
        .json({
            status: 'failure',
            error
        })
    }
}
exports.forgotPassword = async (req,res, next)=>{
    // 1) get the user
    const user = await userModels.findOne({email: req.body.email})
    if(!user){
        throw 'No user exist with this email.'
    }
    // 2) generate the token
    const resetToken = user.generateToken();
    user.save({validateBeforeSave : false});

    // 3) mail the token to the user email
    // 4) reset the token


    try{

    }catch(error)
    {
        res.status(401)
        .json({
            status: 'failure',
            error
        })
    }
}
exports.resetPassword = (req,res,next)=>{
    try{
        // 1) verify the token, expiration of token
        const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
        const user = userModels.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})

        if(!user){
            throw 'token is invalid or has expired, please try again'
        }
        // 2) change the password 
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        
        user.save({validateBeforeSave : false})

        // 4) send the token

        

    }catch(error){
        res.status(401)
        .json({
            status: 'failure',
            error
        })
    }
}