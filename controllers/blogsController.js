const blogModels = require('../models/blogModels')

exports.getAllBlogs = async (req, res, next) =>{
    
   try{
       
    const blogs = await blogModels.find(req.query).select('-__v').sort('-createdAt')
    
    // res
    // .status(200)
    // .json({
    //     'status':'sucess',
    //     blogs
    // })
    res
    .status(200)
    .render('home',{
        blogs
    })
   }catch(error)
   {
    res
    .status(404)
    .json({
        'status': 'failed',
        error
    })
   }
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