/*
Middlewares : In express middlewares are function that come into play after the server receives the request and before the response is sent to the client.
Middlewares can do following tasks :-
Executes any code, Make changes to the request and response object, End the request response cycle, Call the next middleware function in the stack.
*/
const express = require("express");
const app = express();
const port = 8080;
const ExpressError = require("./ExpressError.js");
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
    throw new ExpressError(401, "Access Denied!");
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


//To handle a error thrown by asynchronous function we have to explicitly call the next function like this.
app.get("/asyncerror", async (req, res, next) => {
    let isPass = await random();
    if(isPass) next(new ExpressError(499, "Error of async function."));
    else res.send("Number was greater than 5.");//writting this in else to make sure no statements are left after next()
});

async function random() {
    let num = Math.random() * 10;
    if(num > 5) return true;
    return false;
}

app.use((err, req, res, next) => {
    let {status = 500, message = "Some error"} = err;//it will also set the default status and message if some error is has status code as undefined e.g. ldll = ldfl will be a error with no status code.
    res.status(status).send(message);
    next(err);//If we only write next() it will do As we already send the response this next will have no meaning. it says Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client. But if we write next(err) it will go directly to the error handler middleware that is middleware with (err, req, res, next) as argument.
    // console.log("this is a line after next().");
});

//404
app.use((req, res) => {
    res.status(404).send("Page not found.");
});
app.listen(port, ()=> {
    console.log(`server is running on port ${port}.`);
});

//if we send id inside the mongoose model.findById() and the id's length is not correct it will send a mongoose error it will not search in the database with that id. Only correct length id will be used to search inside the database if nothing is found it will return a empty array or null.

/*
if the validation failed during insertion inside a mongodb database a error is thrown to handle those errors we use :-
app.post("/chats", async (req, res, next) => {
    let {to , from, message} = req.body;
    try {
        let newChat = new Chat({...req.body, created_at: new Date()});
        await newChat.save();
        res.redirect("/chats");
    }
    catch(err) {
        next(err);
    }
});

we should always put all the await function inside a try catch block.


Wrap async : if we use wrap async we don't need to use try catch block.
function wrapAsync(func) {
    return function(req, res, next) {
        func(req, res, next)
            .catch((err) => {next(err);});
    }
}

app.post("/chats", wrapAsync(async (req, res, next) => {
    let {to , from, message} = req.body;
    let newChat = new Chat({...req.body, created_at: new Date()});
    await newChat.save();
    res.redirect("/chats");
}));

we can get the name of the error by using err.name; by using this error name we can do different things for different errors.
*/