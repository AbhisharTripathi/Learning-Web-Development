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

module.exports.renderUserEditForm = (req, res) => {
    res.render("./users/edit.ejs");
};

module.exports.updateUser = async (req, res) => {
    let { oldPassword, newPassword, email} = req.body;
    let { user } = await req.user.authenticate(oldPassword);
    if(!user) {
        req.flash("error", "Password is incorrect.");
        return res.redirect("/users/edit")
    }

    if(newPassword) {
        await req.user.setPassword(newPassword);
    }

    if(email) {
        req.user.email = email;
    }

    await req.user.save();
    req.flash("success", "Profile updated successfully!");
    res.redirect("/listings");
};

module.exports.deleteUser = async (req, res, next) => {

    try {
        let { oldPassword } = req.body;
        let { user } = await req.user.authenticate(oldPassword);
        if(!user) {
            req.flash("error", "Password is incorrect.");
            return res.redirect("/users/edit")
        }

        await User.findByIdAndDelete(user._id);
        req.logout(err => {
            if (err) return next(err);
            req.session.destroy(); // remove session completely
            // req.flash("success", "User Deleted.");
            res.redirect("/listings");
        });
    }
    catch(err) {
        next(err);
    }
}