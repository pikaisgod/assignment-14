const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// POST route for logging in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, userData.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // Save session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;

      // Instead of returning JSON, redirect to the dashboard
      res.redirect('/dashboard');  // Redirect to dashboard on successful login
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
