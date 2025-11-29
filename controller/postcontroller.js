const BlogModel = require('../models/post-model');
const { post } = require('../routes/postRoutes');

exports.CreateGet = (req, res) => {
  res.render('create');
};

exports.CreatePost = async (req, res) => {
  try {
    const { category, title, subtitle, content, date } = req.body;

    function createSlug(title) {
      return title
        .toLowerCase()
        .trim()
        .replace(/[\s\_]+/g, "-")           
        .replace(/[^\w\-]+/g, "")           
        .replace(/\-\-+/g, "-")           
        .replace(/^-+/, "")                
        .replace(/-+$/, "");   
    }

    const slug = createSlug(title)

    const newPost = await BlogModel.create({
      category, 
      title,
      slug,
      subtitle,
      content,
      date
    });

    res.redirect('/read'); 
  } catch (err) {
    res.status(500).send('Error creating post');
  }
};

exports.EditGet = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogModel.findById(id);
    if (!post) return res.status(404).send('Post not found');
    res.render('edit', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.EditPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, title, subtitle, content, date } = req.body;

    function createSlug(title) {
      return title
        .toLowerCase()
        .trim()
        .replace(/[\s\_]+/g, "-")           
        .replace(/[^\w\-]+/g, "")           
        .replace(/\-\-+/g, "-")             
        .replace(/^-+/, "")              
        .replace(/-+$/, "");              
    }

    const slug = createSlug(title)

    await BlogModel.findByIdAndUpdate(id, {
      category, 
      title,
      slug, 
      subtitle,
      content,
      date
    });

    res.redirect('/read');
  } catch (err) {
    res.status(500).send('Failed to update post');
  }
};

exports.ReadGet = async (req, res) => {
  try {
    const posts = await BlogModel.find();
    res.render('read', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Could not retrieve posts');
  }
};

exports.DeleteGet = async (req, res) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndDelete(id);
    res.redirect('/read');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete post');
  }
};

exports.SendAllCategoryPosts = async (req, res) => {
  try {
    const { category } = req.params;
    const posts = await BlogModel.find({ category });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};


exports.sendPostBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;           
    const post = await BlogModel.findOne({ slug });   

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);             
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};