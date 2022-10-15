const userModel = require('../models/userModels')
const jwt = require('jsonwebtoken')


function signInToken(id){
    return jwt.sign({id}, process.env.JWT_SECURITY_KEY,{
        expiresIn: process.env.JWT_EXPIRESIN
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
        confirmPassword: req.body.confirmPassword
    })
    const token = signInToken(user._id)
    res.status(201).json({
        status: 'successful',
        user,
        token
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
    const {email, password} = req.body;

    if(!email||!password){
        
        throw 'please prvide email and password';
    }

    const user = await userModel.findOne({email}).select('+password')

    if(!user || !await(user.checkPassword(password, user.password))){
        throw 'Wrong credentials'
    }
    const token = signInToken(user._id)
    res.status(200)
    .json({
        status: 'success',
        token
    })
    }catch(error){
        res.status(401)
        .json({
            status: 'failure',
            error
        })
    }
}