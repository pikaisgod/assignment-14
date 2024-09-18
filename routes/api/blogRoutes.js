const router = require('express').Router();
const { BlogPost } = require('../../models');

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new blog post
router.post('/', async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,  // Assuming user_id comes from session
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
