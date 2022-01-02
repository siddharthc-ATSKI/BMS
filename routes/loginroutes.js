const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const passport = require("passport");
const passportLocal = require("passport-local");
const { isLoggedIn } = require("../middleware");
const catchAysnc = require("../utils/catchAysnc");
passport.use(new passportLocal(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    console.log(req.user.username);
    if (req.user.username == "admin") {
      return res.redirect("/adminPage");
    }
    req.flash("success", "welcome!!");
    res.redirect("/movies");
  }
);

router.get(
  "/logout",
  isLoggedIn,
  ((req, res) => {
    req.logout();
    req.flash("success", "goodbye");
    res.redirect("/movies");
  })
);

module.exports.loginRoutes = router;
