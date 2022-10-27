const User = require('../models/userModels')
const blogModels = require('../models/blogModels');
const multer = require('multer')
const multerStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'uploads')
    },
    filename: (req,file,cb)=>{
        const ext = file.mimetype.split("/")[1];
        cb(null,`blog-bg-${req.user.id}-${Date.now()}.${ext}`)
    }
})
const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image'))
        cb(null, true)
    else 
        cb(null, false)
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})
exports.uploadBG = upload.single('hero')

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
    const filterBody = {...req.body};
    filterBody.slug = req.body.title.toLowerCase().split(" ").join("-")
    filterBody.Author = req.user.id;

    if(req.file)
    {
        filterBody.hero = req.file.path
    }
    const blog = await blogModels.create(filterBody);
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
exports.deleteBlog = async (req,res,next)=>{
    try{
        const blog = await blogModels.findOne({slug:req.body.slug}).populate('Author')
        if(req.user.id.toString()!==blog.Author.id.toString())
        {
            throw 'You are not authorized to delete blog';
        }
        await blogModels.findByIdAndDelete(blog.id)
        res.status(201)
        .json({status: 'success'})
    }catch(error)
    {
        res.status(404)
        .json({
            status:'failure',
            error
        })
    }
}