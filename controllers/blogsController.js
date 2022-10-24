const User = require('../models/userModels')
const blogModels = require('../models/blogModels')

exports.getAllBlogs = async (req, res, next) =>{
   try{
    const list = await blogModels.find().select('tags').sort('createdAt').populate('Author');
    const newList = list.map(ele=>ele.tags.join(",")).join(",").split(",");
    const tagList = [...new Set(newList)]
    const blogs = await blogModels.find(req.query).select('-__v').sort('-createdAt')

    res.locals.current = 'blogs';
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
    res.locals.current = 'home';
    res.status(201)
    .render('home')
}
exports.getMyBlogs = async (req,res,next)=>{
    res.locals.current = 'myBlogs';
    const blogs = await blogModels.find({Author: req.user.id}).populate('Author')
    const newList = blogs.map(el=>el.tags.join(",")).join(",").split(",")
    const tagsList = [...new Set(newList)]
    res.status(201)
    .render('myblogs',{
        tagsList,
        blogs
    })
}
exports.newBlog = (req,res,next)=>{
    
    res.locals.current = 'create';
    res.status(201)
    .render('create')
}
exports.createBlog = async (req,res, next)=>{
    const {title, tags, hero, content} = req.body;
    console.log(tags)
    const Author = req.user.id;
    const blog = await blogModels.create({
        title,
        tags,
        content,
        hero,
        Author
    });
    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    })
}

