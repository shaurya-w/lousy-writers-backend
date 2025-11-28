const mongoose = require('mongoose');
require('dotenv').config();
 
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));  

const blogSchema = mongoose.Schema({
    category : String, 
    title : String,
    slug : String, 
    subtitle : String,
    content : String, 
    date : String
});

const BlogModel = mongoose.model('BlogModel', blogSchema)
module.exports = BlogModel