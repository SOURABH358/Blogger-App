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
.route('/myblogs')
.get(authControllers.protect, blogsControllers.getMyBlogs)


router
.route('/home')
.get(blogsControllers.getHome)

router
.route('/create')
.get(authControllers.protect, blogsControllers.newBlog)

router
.route('/account')
.get(authControllers.protect, userController.getUser)

module.exports = router;
