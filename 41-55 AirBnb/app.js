if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
// console.log(process.env);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;//it is a session store. It requires express-session.
const flash = require("connect-flash");
const passport = require("passport");
const PassportLocal = require("passport-local");
const User = require("./model/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dbUrl = process.env.ATLAS_DB_URL;
main().then(() => {
    console.log("Connected to db")
})
.catch((err) => {
    console.log(err);
});
async function main() {
    return await mongoose.connect(dbUrl);
}

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// This tells Express to serve everything inside the "bootstrap-5.3.8-dist" folder
app.use('/bootstrap', express.static(path.join(__dirname, 'bootstrap-5.3.8-dist')));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET 
    },
    touchAfter: 24 * 60 * 60
});

store.on("error", (err) => {
    console.log("Error on MONGO SESSION STORE.", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());//To use flash we need session.

//to use passport we nedd session.
app.use(passport.initialize());//This will initialize the passport for every request.
app.use(passport.session());//this middleware will check if the request is passed by the same user. A web application needs the ability to identify the user as they browse from page to page. This series of requests and responses, each associated with the same user is known as session.
passport.use(new PassportLocal(User.authenticate()));//use static authenticate method of model in PassportLocal

passport.serializeUser(User.serializeUser()); //it serialize User into the session.
passport.deserializeUser(User.deserializeUser()); //it deserialize user into the session.

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

/*
app.get("/demouser", async (req, res) => {
    let demoUser = new User({
        email: "student@gmail.com",
        username: "studentusername"
    });

    let registeredUser = await User.register(demoUser, "passwordofstudent");//this is static method of model, it checks if the username is unique and save the user in the database with the given password. We can also pass a third argument which should be a callback. it also hash the password using pbkdf2 after salting it.
    console.log(registeredUser);
    res.send(registeredUser);
});
*/

app.get("/", (req, res) => {
    res.redirect("/listings");
});

//Listings routes
app.use("/listings", listingRouter);

//Reviews routes
app.use("/listings/:id/reviews", reviewRouter);

//Users routes
app.use("/users", userRouter);

//Page not found
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

//Handling error
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!"} = err;
    // res.status(status).send(message + "<br>Error name : " + err.name);

    res.status(status).render("error.ejs", { message, stack: err.stack });
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080.");
});


//wrapAsync is better than try catch