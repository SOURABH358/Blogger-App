const blogModels = require('../models/blogModels')

exports.getAllBlogs = async (req, res, next) =>{
    res.statusCode(200).json({
        status: 'successful',
        data: {
            title: 'What is Web 3.0?',
            content: 'lorem lorem lorem lorem lorem lorem lorem.'
        }
    })
}

exports.createBlog = async (req,res, next)=>{
    const {title, content} = req.body;

    res.statusCode(200).json({
        status: 'successful',
        data: {
            title,
            content
        }
    })
}