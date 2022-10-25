const multer = require('multer')
const sharp = require('sharp')
const userModel = require('../models/userModels')
const jwt = require('jsonwebtoken')
const multerStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'public/images')
    },
    filename: (req,file, cb)=>{
        const ext = file.mimetype.split("/")[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
    }
})
// const multerStorage = multer.memoryStorage()
const multerFilter =((req,file,cb)=>{
    if(file.mimetype.startsWith('image'))
        cb(null, true)
    else 
        cb(null, false)
})
const upload = multer({
    dest:'/public/images',
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadAvatar = upload.single('photo');

exports.resizePhoto = async (req,res, next)=>{
    try{
        if(!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    // await sharp(req.file.buffer)
    // .resize({width:500,height:500})
    // .toFile(`/public/images/${req.file.filename}`)
    console.log(req.file)

    next();
    }catch(error)
    {
        res.status(404)
        .render('error',{
            message: error
        })
    }
}
function signInToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECURITY_KEY, {
        expiresIn: '90d'

    })
}
function createSendToken(user, statusCode, res) {
    const token = signInToken(user._id)
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRESIN_COOKIE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    res.cookie('jwt', token, cookieOptions)
    res.status(statusCode)
        .json({
            status: 'success',
            token,
            data: {
                user
            }
        })


}
exports.getUser = (req, res, next) => {
    try {
        res
            .status(201)
            .render('user')
    } catch (error) {
        res
            .status(404)
            .json({
                'status': 'failure',
                error
            })
    }

}

exports.signUpUser = async (req, res, next) => {
    // const {userName, Password} = req.body;
    try {
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

    } catch (err) {
        res.status(401).json({
            status: 'failure',
            message: err.message
        })
    }
}

exports.logInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {

            throw 'please provide email and password';
        }

        const user = await userModel.findOne({ email }).select('+password')

        if (!user || !await (user.checkPassword(password, user.password))) {
            throw 'Wrong credentials'
        }
        createSendToken(user, 201, res)

    } catch (error) {
        res.status(401)
            .json({
                status: 'failure',
                error
            })
    }
}
exports.logOut = async (req, res, next) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1000),
        httpOnly: true
    })
    res.status(201).json({ status: 'success' })
}

exports.updateUser = async (req, res, next) => {
    try {
        
        const filteredObj = {...req.body};
        // req.body.forEach(key,val=>{
        //     if(val!==''){
        //         filteredObj[key] = val
        //     }
        // })
        console.log(req.file)
        if(req.file)
        {

            filteredObj.photo = req.file.filename;
            console.log(filteredObj)
        }
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id,
            filteredObj,
            {
                new: true,
                runValidators: false
            })
            res.locals.user = updatedUser;
        res.status(201)
            .json({
                status: 'success',
                data: updatedUser
            })
    } catch (error) {
        res.status(401)
            .render('error', {
                message: error
            })
    }
}

exports.deleteUser = async (req, res, next) =>{
    try{
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 1000),
            httpOnly: true
        })
        await userModel.findByIdAndDelete(req.user.id);
        res.status(201)
        .json({
            status: 'success'
        })
    }
    catch (error) {
        res.status(401)
            .render('error', {
                message: error
            })
    }
}
exports.changePassword = async (req,res,next)=>{
    try{
        // 1) verify current password is correct
        const user = await userModel.findById(req.user.id)
        .select('+password')
        if(!await (user.checkPassword(req.body.currentPassword, user.password)))
        {
            throw 'current Password is incorrect'
        }
        // 2) change the password 
        if(req.body.newPassword != req.body.confirmNewPassword)
        {
            throw 'password and confirm password do not match, please try again';
        }
        user.password = req.body.newPassword;
        user.confirmPassword = req.body.confirmNewPassword;
        
        await user.save({validateBeforeSave : false})

        createSendToken(user,201,res)

    }catch(error){
        res.status(401)
        .render('error',{
            message: error
        })
    }
}
