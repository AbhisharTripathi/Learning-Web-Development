//Express router are way to organize your Express application so that your primary app.js does not become bloated.
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");//it is a npm package used to read cookies on server side.
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

app.use(cookieParser("hugeSecret")); //if this middleware is not used req.cookies will have undefined as value.

app.get("/", (req, res) => {
    res.send("This is your home route on server.");
});

app.get("/getsignedcookie", (req, res) => {
    res.cookie("password", "Red is red", { signed: true});
    res.cookie("password2", "Green is green", { signed: true});
    res.send("cookie sent.");
});

app.get("/verify", (req, res) => {
    console.log(req.signedCookies);
    res.send(req.signedCookies);
});
//if you replace(change) the complete value of the signed cookie then req.signedCookies will not be able to find that cookie it will become unsigned cookie. But if you only change the main part of the value then req.signedCookies will get the name but it's value will be false.

app.get("/getcookie", (req, res) => {
    res.cookie("greet", "namaste");
    res.cookie("treat", "how");
    res.cookie("when", "yesterday");
    res.send("Cookie has been sent.");
});

app.get("/showcookies", (req, res) => {
    console.log(req.cookies);//it will give only unsigned cookies.
    res.send(req.cookies);
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});