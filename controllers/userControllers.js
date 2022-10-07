const userModel = require('../models/userModels')

exports.getUser = async (req, res,next) =>{
    res.statusCode(200).json({
        status: 'successful',
        data: {
            userName: 'abcd@123',
        }
    })
}

exports.createUser = async (req,res,next)=>{
    const {userName, Password} = req.body;
    res.statusCode(200).json({
        status: 'successful',
        message: `User with username ${userName} created`
    })
}