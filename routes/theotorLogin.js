const express = require("express");
const route = express.Router();
const passport = require("passport");
const passportLocal = require("passport-local");
const theotorSchema=require('../models/theotor');
const catchAysnc=require('../utils/catchAysnc');

// passport.use(new passportLocal(theotorSchema.authenticate()));
// passport.serializeUser(theotorSchema.serializeUser());
// passport.deserializeUser(theotorSchema.deserializeUser());

route.get(
  "/theotorlogin",
  catchAysnc(async (req, res) => {
    res.render("theotorLogin");
  })
);

route.post(
  "/theotorlogin",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/theotorlogin",
  }),
  catchAysnc(async (req, res) => {
    req.flash("success", "welcome admin");
    res.redirect("/movies");
  })
);

module.exports.theotorLoginRoute=route;