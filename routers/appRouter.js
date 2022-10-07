const express = require('express')
const userController = require('../controllers/userControllers')
const blogsControllers = require('../controllers/blogsController')
const router = express.Router();

router()
.route('/user')
.get(userController.getUser)
.put(userController.createUser)

router()
.route('/blogs')
.get(blogsControllers.getAllBlogs)
.put(blogsControllers.createBlog)

module.exports = router;
