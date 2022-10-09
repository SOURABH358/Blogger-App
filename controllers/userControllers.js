const userModel = require('../models/userModels')

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

exports.createUser = (req,res,next)=>{
    // const {userName, Password} = req.body;
    console.log(req.body)
    res.status(200).json({
        status: 'successful',
        message: `User with username ${req.body.userName} created`
    })
}