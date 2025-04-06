import passport from 'passport'
import LocalStrategy from 'passport-local'

import {pool} from '../database.js'
import {helpers} from './helpers.js'

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const rows = await pool.query('SELECT * FROM member WHERE email = ?', [email]);
  if (rows.length > 0) {
    const member = rows[0];
    const validPassword = await helpers.matchPassword(password, member.password)
    if (validPassword) {
      done(null, member, req.flash('success', 'Welcome ' + member.name));
    } else {
      done(null, false, req.flash('message', 'Incorrect Password'));
    }
  } else {
    return done(null, false, req.flash('message', 'The Username does not exists.'));
  }
}));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const { name, nickname } = req.body;

  console.log(req.body);
  console.log(name);
  console.log(nickname);

  let newMember = {
    name,
    nickname,
    email,
    password
  };
  newMember.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO member SET ? ', newMember);
  newMember.id = result.insertId;
  return done(null, newMember);
}));

passport.serializeUser((member, done) => {
  done(null, member.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM member WHERE id = ?', [id]);
  done(null, rows[0]);
});