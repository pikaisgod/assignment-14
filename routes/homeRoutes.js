const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Render homepage with blog posts
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [{ model: User }],
    });

    const blogPosts = blogData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,  // Pass the login state to the template
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');  // Redirect logged-in users to the dashboard
    return;
  }
  res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// Render dashboard page (only if authenticated)
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [BlogPost],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
