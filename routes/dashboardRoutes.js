const router = require('express').Router();
const { BlogPost } = require('../models');  // Ensure the correct path to models
const withAuth = require('../utils/auth');

// GET route to render the new post form
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', { logged_in: req.session.logged_in });
});

// POST route to create a new post
router.post('/new', withAuth, async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, // Assuming user_id is stored in the session
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new post', error: err });
  }
});

module.exports = router;
