const mongoose = require('mongoose')

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
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
    hero: {
        type: String,
        required: [true, 'Please provide hero image for your blog post']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    Author : {
        type: mongoose.Schema.ObjectId, 
        ref: 'User',
        required : [true, 'Please provide author']
    },
    slug:String
})

const BlogModel = mongoose.model('Blog', BlogsSchema);

module.exports = BlogModel;
