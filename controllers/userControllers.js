const userModel = require('../models/userModels')

exports.getUser = (req, res, next) =>{
    res.status(200).json({
        status: 'successful',
        data: {
            userName: 'abcd@123',
        }
    })
}

exports.createUser = (req,res,next)=>{
    // const {userName, Password} = req.body;
    console.log(req.body)
    res.status(200).json({
        status: 'successful',
        message: `User with username ${req.body.userName} created`
    })
}