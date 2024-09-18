const router = require('express').Router();
const { Comment } = require('../../models');

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_text: req.body.comment_text,
      blog_post_id: req.body.blog_post_id,  // Assuming this comes from the request
      user_id: req.session.user_id,  // Assuming user_id comes from session
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
