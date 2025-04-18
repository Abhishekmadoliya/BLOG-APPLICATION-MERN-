const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        
    },
    author :{
        type: String,
        required: true
    },
   
    catagory: {
        type: String,
        
    },
    
}, {timestamps: true});


const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;