const blogModels = require('../models/blogModels')

exports.getAllBlogs = async (req, res, next) =>{
   try{
    const list = await blogModels.find().select('tags').sort('tags');
    const newList = list.map(ele=>ele.tags.join(",")).join(",").split(",");
    const tagList = [...new Set(newList)]
    const blogs = await blogModels.find(req.query).select('-__v').sort('-createdAt')

    res
    .status(200)
    .render('blogs',{
        blogs,
        tagList 
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
exports.getHome = (req,res,next)=>{
    res.status(201)
    .render('home')
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