const BlogModel = require('../models/post-model');
const { post } = require('../routes/postRoutes');

// ========== CREATE ==========
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
        .replace(/[\s\_]+/g, "-")           // spaces & underscores → hyphens
        .replace(/[^\w\-]+/g, "")           // remove non-word chars
        .replace(/\-\-+/g, "-")             // collapse multiple dashes
        .replace(/^-+/, "")                 // trim starting dashes
        .replace(/-+$/, "");                // trim ending dashes
    }

    const slug = createSlug(title)
    console.log(slug)

    const newPost = await BlogModel.create({
      category, 
      title,
      slug,
      subtitle,
      content,
      date
    });

    console.log(newPost)
    res.redirect('/read'); 
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).send('Error creating post');
  }
};


// ========== EDIT ==========
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
        .replace(/[\s\_]+/g, "-")           // spaces & underscores → hyphens
        .replace(/[^\w\-]+/g, "")           // remove non-word chars
        .replace(/\-\-+/g, "-")             // collapse multiple dashes
        .replace(/^-+/, "")                 // trim starting dashes
        .replace(/-+$/, "");                // trim ending dashes
    }

    const slug = createSlug(title)
    console.log(slug)

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
    console.error(err);
    res.status(500).send('Failed to update post');
  }
};

// ========== READ ==========
exports.ReadGet = async (req, res) => {
  try {
    const posts = await BlogModel.find();
    res.render('read', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Could not retrieve posts');
  }
};

// ========== DELETE ==========
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
    const slug = req.params.slug;           // <-- CORRECT
    const post = await BlogModel.findOne({ slug });   // <-- find ONE post

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.json(post);                  // <-- send post
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};