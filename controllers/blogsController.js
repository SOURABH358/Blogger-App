const blogModels = require('../models/blogModels')

exports.getAllBlogs = async (req, res, next) =>{
   try{
    const list = await blogModels.find().select('tags').sort('tags');
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
exports.getMyBlogs = (req,res,next)=>{
    res.locals.current = 'myBlogs';
    const tagList = []
    res.status(201)
    .render('myblogs',{
        tagList
    })
}
exports.newBlog = (req,res,next)=>{
    
    res.locals.current = 'create';
    res.status(201)
    .render('create')
}
exports.createBlog = async (req,res, next)=>{
    const {title, tags, hero, content} = req.body;
    const Author = req.body.user.id;
    const blog = await blogModels.create({
        title,
        tags,
        content,
        hero,
        Author
    });
    res.status(200).json({
        status: 'successful',
        data: {
            blog
        }
    })
}

