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

router
.route('/blogs/:slug')
.get(blogsControllers.getBlog)

// router.use(authControllers.protect)

router
.route('/myblogs')
.get( authControllers.protect,blogsControllers.getMyBlogs)
router
.route('/create')
.get( authControllers.protect,blogsControllers.newBlog)

router
.route('/account')
.get( authControllers.protect,userController.getUser)

router
.route('/user/updateuser')
.patch( authControllers.protect,userController.uploadAvatar,userController.updateUser)

router
.route('/user/deleteuser')
.delete( authControllers.protect,userController.deleteUser)

router
.route('/user/changepassword')
.patch( authControllers.protect,userController.changePassword)



router
.route('/user/createblog')
.post( authControllers.protect,blogsControllers.createBlog)

module.exports = router;
