const userModel = require('../models/userModels')
const jwt = require('jsonwebtoken')


function signInToken(id){
    return jwt.sign({id}, process.env.JWT_SECURITY_KEY,{
        expiresIn: '90d'
       
    })
}
function createSendToken (user, statusCode, res){
    const token = signInToken(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRESIN_COOKIE*24*60*60*1000),
        httpOnly : true
    }
    res.cookie('jwt',token, cookieOptions)
    res.status(statusCode)
    .json({
        status: 'success',
        token,
        data : {
            user
        }
    })


}
exports.getUser = (req, res, next) =>{
    try{
        res
    .status(201)
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
    createSendToken(user, 201, res)
    // const token = signInToken(user._id)
    // res.status(201)
    // .json({
    //     status: 'success',
    //     token, 
    //     user
    // })
    
   }catch(err){
    res.status(401).json({
        status: 'failure',
        message: err.message
    })
   }
}

exports.logInUser = async (req,res,next)=>{
    try{
    const {email, password} = req.body;

    if(!email||!password){
        
        throw 'please provide email and password';
    }

    const user = await userModel.findOne({email}).select('+password')

    if(!user || !await(user.checkPassword(password, user.password))){
        throw 'Wrong credentials'
    }
    createSendToken(user, 201, res)
    
    }catch(error){
        res.status(401)
        .json({
            status: 'failure',
            error
        })
    }
}
exports.logOut = async (req,res,next)=>{
    res.cookie('jwt','loggedout',{
            expires: new Date(Date.now() + 1000),
            httpOnly: true
    })
    res.status(201).json({status: 'success'})
}
