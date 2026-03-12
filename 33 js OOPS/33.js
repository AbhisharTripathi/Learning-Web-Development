//get and post request
/*
get request is used to get some response and post request is used to post something for create, write or update.
In get data is sent via query string but in post data is sent via request body.
*/
const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true}));//this will allow to understand the data sent using post request.
app.use(express.json());//this will allow express to understand the json data if passed using post request.

app.get("/register", (req, res) => {
    let {user, pass} = req.query;//we can access get request data using req.query, it returns a object;
    res.send(`Standard GET response.<br>Welcome ${user}`);
});

app.post("/register", (req, res) => {
    let {user, pass} = req.body;//req.body will give data send by post request and it will give undefined if we not execute app.use(express.urlencoded({ extended: true})); before it.
    res.send(`Standard POST response.<br>Welcome ${user}`);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
}); 