const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js");

router.get("/signup", userController.renderSignupForm);

router.post("/signup", saveRedirectUrl, userController.signupUser);

router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/users/login", failureFlash: true}), userController.loginUser);//passport.authenticate() middleware is used in login to authenticate the user it takes two arguments first is strategy_name and second is options object.It logins the user and save the user information in req.user. It will also reset the req.session it means we can not store redirectUrl in req.session and get it directly.

router.get("/logout", userController.logoutUser);

module.exports = router;