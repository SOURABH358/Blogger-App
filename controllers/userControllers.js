const userModel = require('../models/userModels')
const jwt = require('jsonwebtoken')


function signInToken(id){
    return jwt.sign({id}, process.env.JWT_SECURITY_KEY,{
        expiresIn: new Date(Date.now() + process.env.JWT_EXPIRESIN*24*60*60*1000),
        httpOnly : true
    })
}
function createSendToken (user, statusCode, res){
    const token = signInToken(user._id)
    const cookieOptions = {
        expires: process.env.JWT_EXPIRESIN_COOKIE
    }
    res.cookie('jwt',token, cookieOptions)
    res.send(statusCode)
    .json({
        status: 'success',
        data : {
            user
        }
    })


}
exports.getUser = (req, res, next) =>{
    try{
        res
    .status(200)
    .render('user')
    }catch(error){
        res
        .status(404)
        .json({
            'status':'failure',
            error
        })
    }

}

exports.signUpUser = async (req,res,next)=>{
    // const {userName, Password} = req.body;
   try{
    const user = await userModel.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        passwordChangedAt: new Date(req.body.passwordChangedAt)
    })
    createSendToken(user, 201, res)
    res.status(201).json({
        status: 'successful',
        user
    })
   }catch(err){
    res.status(401).json({
        status: 'failure',
        err
    })
   }
}

exports.logInUser = async (req,res,next)=>{
    try{
        console.log('we are in login')
    const {email, password} = req.body;

    if(!email||!password){
        
        throw 'please prvide email and password';
    }

    const user = await userModel.findOne({email}).select('+password')

    if(!user || !await(user.checkPassword(password, user.password))){
        throw 'Wrong credentials'
    }
    createSendToken(user, 201, res)
    res.status(200)
    .json({
        status: 'success'
        
    })
    }catch(error){
        res.status(401)
        .json({
            status: 'failure',
            error
        })
    }
}

