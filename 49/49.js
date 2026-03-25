/* 
http is a stateless protocol
ftp is a stateful protocol.
*/
const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");//it requires session to work.
const path = require("path");

app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "SuperSecret",
    resave: false,
    saveUninitialized: true
};
app.use(session(sessionOptions));//This middleware will let us use session.
app.use(flash());//this will let us use flash
app.use((req, res, next) => {//This middleware will run before every request.
    res.locals.successMsg = req.flash("success");//this can be accessed directly into the ejs template using success.
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register", (req, res) => {
    let { name = "Anonymous" } = req.query;
    req.session.name = name;
    if(name === "Anonymous") {
        req.flash("error", "User not registerd.");
    }
    else {
        req.flash("success", "User successfully registered!");//it contains two argument first is key and second is message.
    }
    res.redirect("/greet");
});

app.get("/greet", (req, res) => {
    // res.locals.successMsg = req.flash("success");//this can be accessed directly into the ejs template using success.
    // res.locals.errorMsg = req.flash("error");//Transfered these code to the middleware.
    res.render("page.ejs", { name: req.session.name });
});

//flash-connect : flash is a special area of session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.

app.get("/", (req, res) => {
    if(req.session.count) { //req.session maintain the temporary storage for the session. can only be used at development stage.
        req.session.count++;
    }
    else {
        req.session.count = 1
    }
    res.send(`You requested the home page ${req.session.count} times.`);
});
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});