const express = require('express')
const userController = require('../controllers/userControllers')
const blogsControllers = require('../controllers/blogsController')
const authControllers = require('../controllers/authController')
const router = express.Router();

router
.route('/user/signup')
.post(userController.signUpUser)

router
.route('/user/login')
.post(userController.logInUser)

router
.route('/user/logout')
.get(userController.logOut)

router.use(authControllers.isLoggedIn)

router
.route('/blogs')
.get(blogsControllers.getAllBlogs)


router
.route('/')
.get(blogsControllers.getHome)

router
.route('/home')
.get(blogsControllers.getHome)

router.use(authControllers.protect)

router
.route('/myblogs')
.get( blogsControllers.getMyBlogs)
router
.route('/create')
.get( blogsControllers.newBlog)

router
.route('/account')
.get( userController.getUser)

router
.route('/user/updateuser')
.patch( userController.updateUser)

router
.route('/user/deleteuser')
.delete( userController.deleteUser)

router
.route('/user/changepassword')
.patch( userController.changePassword)

router
.route('/user/changeprofile')
.post(userController.uploadAvatar, userController.updateProfile)

router
.route('/user/createblog')
.post( blogsControllers.createBlog)

module.exports = router;
