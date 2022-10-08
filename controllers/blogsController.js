const blogModels = require('../models/blogModels')

exports.getAllBlogs = async (req, res, next) =>{
    res.status(200).json({
        status: 'successful',
        data: {
            title: 'What is Web 3.0?',
            content: 'lorem lorem lorem lorem lorem lorem lorem.'
        }
    })
}

exports.createBlog = (req,res, next)=>{
    const {title, content} = req.body;

    res.status(200).json({
        status: 'successful',
        data: {
            title,
            content
        }
    })
}