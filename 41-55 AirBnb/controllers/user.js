const User = require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("./users/signup.ejs")
};

module.exports.signupUser = wrapAsync(async (req, res, next) => {
    try {
        let {username, email, password} = req.body.user;
        let newUser = new User({username, email});
        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
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
});

module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs");
};

module.exports.loginUser = wrapAsync(async (req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        else {
            req.flash("success", "You have been logged out successfully!");
            res.redirect("/listings");
        }
    });
};