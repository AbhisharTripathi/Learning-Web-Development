if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

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
const filterRouter = require("./routes/filter.js");

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
    return await mongoose.connect(dbUrl, {family: 4});
}

app.engine("ejs", ejsMate); //this provides <% layout() %> and <%- body %>

app.set("view engine", "ejs"); //this will make the render to look in views folder to find the ejs file.
app.set("views", path.join(__dirname, "views")); //if your app runs from a different dir this ensures express always find the corret folder.

app.use(express.static(path.join(__dirname, "public")));//this will make express to set the public folder for static files and matches all request with the files if it matches response is send if not then moved forward.
app.use(express.urlencoded({extended: true}));//this makes the form data available in req.body in js object format also extended true helps in parsing form data like listing[title]=something&listing[location]=something
app.use(methodOverride("_method"));
// This tells Express to serve everything inside the "bootstrap-5.3.8-dist" folder
app.use('/bootstrap', express.static(path.join(__dirname, 'bootstrap-5.3.8-dist')));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET //used to ecrypt the data stored on mongodb session
    },
    touchAfter: 24 * 60 * 60 //update sessions in db once per 24 hours(for read request) for session data changes it does not block anything update happens normally.
});

store.on("error", (err) => {
    console.log("Error on MONGO SESSION STORE.", err);
});

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,//used to sighn the session id cookie.
    resave: false, //if req.session is saved(update) again in db even if nothing is changed. 
    saveUninitialized: true, //empty session will also get saved.
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,//it gives fixed time to destroy the cookie in browser automatically.
        maxAge: 7 * 24 * 60 * 60 * 1000,//this gives the relative time to do the same use only one.
        httpOnly: true //prevents js access(document.cookie)
    }
};

app.use(session(sessionOptions));//reads cookies -> fetch session from mongodb -> attaches it to req.session
app.use(flash());//To use flash we need session.

//to use passport we nedd session.
app.use(passport.initialize());//This will initialize the passport for every request.
app.use(passport.session());//this middleware will check if the request is passed by the same user. A web application needs the ability to identify the user as they browse from page to page. This series of requests and responses, each associated with the same user is known as session.
passport.use(new PassportLocal(User.authenticate()));//use static authenticate method of model in PassportLocal, tell passport how to authenticate username + password using the user model.

passport.serializeUser(User.serializeUser()); //it serialize User into the session.
passport.deserializeUser(User.deserializeUser()); //it deserialize user into the session.
/*
if you do not use passport-local-mongoose you have to do these things mannually.
👉 password hashing (bcrypt)
👉 login verification
👉 serializeUser
👉 deserializeUser
👉 user registration logic
*/

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

//filter api
app.use("/api/filter", filterRouter);

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