const mongoose = require('mongoose')

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please a title for your Blog']
    },
    content: {
        type: String,
        required: [true, 'Please provide a content for your Blog']
    },
    tags: [{
        type: String,
        required: [true, 'Please provide tags for your blog']
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    Author : {
        type: String, 
        required : [true, 'Please provide author']
    }
})

const BlogModel = mongoose.model('Blog', BlogsSchema);

module.exports = BlogModel;
