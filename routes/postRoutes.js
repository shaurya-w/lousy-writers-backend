const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');

// CREATE
router.get('/create', postController.CreateGet);
router.post('/create', postController.CreatePost);

// EDIT
// (Using POST instead of PUT because HTML forms don’t support PUT directly)
router.get('/edit/:id', postController.EditGet);
router.post('/edit/:id', postController.EditPost);

// READ
router.get('/read', postController.ReadGet);

// DELETE
router.get('/delete/:id', postController.DeleteGet);

//API DATA SNED
router.get('/api/posts/:category', postController.SendAllCategoryPosts); 

router.get('/api/post/:slug', postController.sendPostBySlug); 

module.exports = router;