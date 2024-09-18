const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');

// Use the user routes for requests to /api/users
router.use('/users', userRoutes);

// Use the blog routes for requests to /api/blogs
router.use('/blogs', blogRoutes);

// Use the comment routes for requests to /api/comments
router.use('/comments', commentRoutes);

module.exports = router;
