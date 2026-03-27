const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");

router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs")
});

router.post("/signup", saveRedirectUrl, wrapAsync(async (req, res, next) => {
    try {
        let {username, email, password} = req.body.user;
        let newUser = new User({username, email});
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) return next(err);

            req.flash("success", "Signed up successfully!");

            let redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
        });
    }
    catch(err) {
        req.flash("error", err.message);
        res.redirect("/users/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("./users/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/users/login", failureFlash: true}), wrapAsync(async (req, res) => {//this middleware is used in login to authenticate the user it takes two arguments first is strategy_name and second is options object. It will also reset the req.session it means we can not store redirectUrl in req.session and get it directly.
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}));

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        else {
            req.flash("success", "You have been logged out successfully!");
            res.redirect("/listings");
        }
    });
})

module.exports = router;