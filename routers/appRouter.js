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
.route('/blogs')
.get(blogsControllers.getAllBlogs)

router
.route('/myblogs')
.get(blogsControllers.getMyBlogs)


router
.route('/home')
.get(blogsControllers.getHome)

router
.route('/create')
.get(blogsControllers.newBlog)

router
.route('/account')
.get(userController.getUser)

module.exports = router;
