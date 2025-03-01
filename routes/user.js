const express = require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const Router = express.Router();

Router.get("/signup", (req, res) => {
  res.render("user/signup");
});

Router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({
        email,
        username,
      });
      const registerdUser = await User.register(newUser, password);
      console.log(registerdUser);
      req.login(registerdUser,(err)=>{
          if (err) {

           return next(err)
          }
          req.flash("success", "welcome to Hostals")
          res.redirect("/listings")
      })
      
    } catch (e) {
      console.log(e);
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

Router.get("/login", (req, res) => {
  res.render("user/login");
});

Router.post(
  "/login",
  saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to Hostals");
    let redirectUrl =  res.locals.redirectUrl || `/listings`
    res.redirect(  redirectUrl);
  }
);

Router.get("/logout", (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success", "you are succesfully logged out");
        res.redirect("/listings")
    })
})
module.exports = Router;
