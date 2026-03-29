const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controllers/user.js");

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(saveRedirectUrl, userController.signupUser);

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/users/login", failureFlash: true}), userController.loginUser);//passport.authenticate() middleware is used in login to authenticate the user it takes two arguments first is strategy_name and second is options object.It logins the user and save the user information in req.user. It will also reset the req.session it means we can not store redirectUrl in req.session and get it directly.

router.get("/logout", userController.logoutUser);

module.exports = router;