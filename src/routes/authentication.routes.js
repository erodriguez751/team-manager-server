import express from 'express'
import passport from 'passport'

const router = express.Router();
import { isLoggedIn } from '../lib/auth.js'

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/members',
  failureRedirect: '/signup',
  failureFlash: true
}));

export default router 