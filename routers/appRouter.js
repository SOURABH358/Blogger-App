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
.post(blogsControllers.createBlog)

module.exports = router;
