const User = require('../models/userModels')
const blogModels = require('../models/blogModels');

exports.getAllBlogs = async (req, res, next) =>{
   try{
    const list = await blogModels.find().populate('Author').sort('createdAt');
    const newList = list.map(ele=>ele.tags.join(",")).join(",").split(",");
    const tagList = [...new Set(newList)]
    const blogs = await blogModels.find(req.query).populate('Author').select('-__v').sort('-createdAt')

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
exports.getHome = async (req,res,next)=>{
    const blogs = await blogModels.find().populate('Author').sort('-createdAt')
    res.locals.current = 'home';
    res.status(201)
    .render('home', {
        blogs
    })
}
exports.getMyBlogs = async (req,res,next)=>{
    res.locals.current = 'myBlogs';
    const blogs = await blogModels.find({Author: req.user.id}).populate('Author').sort('-createdAt')
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
    const slug = title.toLowerCase().split(" ").join("-")
    const Author = req.user.id;
    const blog = await blogModels.create({
        title,
        tags,
        content,
        hero,
        Author,
        slug
    });
    res.status(200).json({
        status: 'success',
        data: {
            blog
        }
    })
}

exports.getBlog = async (req,res,next)=>{
    try{
    const blog = await blogModels.findOne({slug: req.params.slug}).populate('Author')
    
    res.status(201)
    .render('blog_template',{
        blog
    })
    }catch(error)
    {
        res.status(402)
        .render('error',{
            message: error
        })
    }
}
