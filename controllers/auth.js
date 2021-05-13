const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local',{
  //handles the logic if pass or fail
  successRedirect: '/',
  failureRedirect:'/auth/login',
  successFlash: 'Welcome Back!',
  failureFlash: " Your email or password is incorrect. Please try again."
}))

module.exports = router;
