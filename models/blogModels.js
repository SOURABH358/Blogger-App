const mongoose = require('mongoose')

const BlogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please a title for your Blog']
    },
    content: {
        type: String,
        required: [true, 'Please provide a content for your Blog']
    }
})

const BlogModel = mongoose.model('Blog', BlogsSchema);

module.exports = BlogModel;
