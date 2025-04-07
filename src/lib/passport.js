import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { pool } from "../database.js";
import { matchPassword } from "./helpers.js";

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const [rows] = await pool.query("SELECT * FROM Member WHERE email = ?", [
        email,
      ]);

      if (!rows.length) {
        await req.setFlash("error", "No user found");
        return done(null, false);
      }

      const member = rows[0];
      const validPassword = await matchPassword(password, member.password);

      if (!validPassword) {
        await req.setFlash("error", "Incorrect Password");
        return done(null, false);
      }

      done(null, user);
    }
  )
);

passport.serializeUser((member, done) => {
  done(null, member.id);
});

passport.deserializeUser(async (id, done) => {
  const [rows] = await pool.query("SELECT * FROM Member WHERE id = ?", [id]);
  done(null, rows[0]);
});