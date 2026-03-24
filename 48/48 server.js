//Express router are way to organize your Express application so that your primary app.js does not become bloated.
const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");

app.get("/", (req, res) => {
    res.send("This is your home route on server.");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});