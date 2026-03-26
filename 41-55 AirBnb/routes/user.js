const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs")
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let {username, email, password} = req.body.user;
        let newUser = new User({username, email});
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Signed up successfully!");
        res.redirect("/listings");
    }
    catch(err) {
        req.flash("error", err.message);
        res.redirect("/users/signup");
    }
}));

router.get("/login", (req, res) => {
    res.render("./users/login.ejs");
});

router.post("/login", passport.authenticate("local", {failureRedirect: "/users/login", failureFlash: true}), wrapAsync(async (req, res) => {//this middleware is used in login to authenticate the user it takes two arguments first is strategy_name and second is options object.
    req.flash("success", "Welcome back to WanderLust!");
    res.redirect("/listings");
}));

module.exports = router;