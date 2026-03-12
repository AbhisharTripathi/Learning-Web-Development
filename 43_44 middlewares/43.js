/*
Middlewares : In express middlewares are function that come into play after the server receives the request and before the response is sent to the client.
Middlewares can do following tasks :-
Executes any code, Make changes to the request and response object, End the request response cycle, Call the next middleware function in the stack.
*/
const express = require("express");
const app = express();
const port = 8080;
/*
app.use((req, res, next) => {//this is a how we use middleware function. Inside use takes two arguments first is route(optional) and second is callback which is a middleware function this takes two arguments (req, res). It should do one of the two task either send the response or pass execution to the next by defining the next variable inside the callback argument and calling it explicily, it will find the next route handler for the request path.
    console.log("Hi, I am 1st middleware.");
    next();
    console.log("This is afer next() in first middleware");
});

//app.use() can have a middleware function or comma separated many middleware function or array of middleware function

app.use((req, res, next) => {//app.use() performs prefix matching for path but app.all() performs full path matching.
    console.log("Hi, I am second middleware.");
    next();
    console.log("This is afer next() in second middleware");
});

app.get("/", (req, res) => {
    res.send("This is your home route");
    console.log("This is after the response is send.");
});
 this is the result of the above code.
server is running on port 8080.
Hi, I am 1st middleware.
Hi, I am second middleware.
This is after the response is send.
This is afer next() in second middleware
This is afer next() in first middleware

to stop any code from executing written after next() we can write return next(); instead of just next();
*/

app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.time);
    next();
});

const checkToken = (req, res, next) => {//we can use it inside use 
    let {token} = req.query;
    if(token === "giveaccess") next();
    res.send("access denied.");
}

// app.use("/api", checkToken);

// app.get("/api", (req, res) => {
//     res.send("data");
// });
//or
app.get("/api", checkToken, (req, res) => {
    res.send("data");
});



app.use((err, req, res, next) => {//The callback with err as argument will only execute if the code has an error. It will not execute if the code above it has not any error.
    console.log("The error.");
    next(err); // In error handler middlewares we pass the error inside the next to handle it further or hnadle it by default express error handler middleware.
});

app.get("/err", (req, res) => {
    ldll = ldfl;
    res.send("This is the err route.");
});


//express by default set a middleware after all the middlewares to handle the error. It sets the status code to 500.

//404
app.use((req, res) => {
    res.status(404).send("Page not found.");
});
app.listen(port, ()=> {
    console.log(`server is running on port ${port}.`);
});