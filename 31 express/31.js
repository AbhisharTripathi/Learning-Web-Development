//library : A library is a collection of prewritten codes which can be used to perform specific task.
//framework : A framework is a set of prewritten codes that provide a structure for developing software applications.
const express = require("express");
const app = express();//returns a object.

//ports are the logical endpoints of a network connection that is used to exchange information b/w a web server and a web client.
let port = 3000; //8080 for custom servers.

app.listen(port, () => {//we can use this method to start a server listening.
    console.log(`Server is listening on ${port}`);
});

// app.use((request, response) => {//takes a callback having two arguments (these parameters are objects). It accept request and send same response for all routes.
//     console.log("request recieved");
//     response.send("<h1>fruits</h1><ul><li>apple</li><li>banana</li></ul>");
// });

//Routing : It is a process of slecting a path for traffic in a network or between or across multiple network.
//only one response can be send.
app.get("/home", (request, response) => {//It takes two argument, first is path and sencond is the callback(with two arguments). If a request with mentioned path come it executes the callback.
    response.send("You contacted home.");
});
app.get("/search", (request, response) => {
    response.send("<input type='text' placeholder='search here'> <button>Search</button>");
});
app.get("/json", (request, response) => {
    let code = {
        name: "banana",
        color: "yellow"
    };
    response.send(code);
});

// app.get("*", (req, res) => {//* is a all path selector if any of the above response does not match, it will get contacted.
//     res.send("This path does not exist");
// });

app.post("/post", (req, res) => {
    let code = "<p>This content is send as a response to a post.</p>";
    res.send(code);
});

//nodemon : it is a package which starts the server everytime we save the server file. to use we write nodemon file.js instead of node file.js. To restart the server we type rs

app.get("/:username/:id", (req, res) => {//This is how we accept a variable path parameters
    res.send(`You search for ${req.params.username}, and for id ${req.params.id}`);//request.params is a object which contain all the parameters came with the request.
});


app.get("/squery", (req, res) => {
    let query = req.query;//it will give a object with key and value, if you give more than one value for a key the value will become an array. In url http://localhost:3000/squery?h=char&d=panch+tin&h=chah query will be { h: [ 'char', 'chah' ], d: 'panch tin' }
    if(!query.bhejo) {//if bhejo is not send with value in url condition will be true and if block will be executed.
        res.send("bhejo is not send with value in url");
    }
    else {
        res.send(`Bhejo exist with a value ${query.bhejo} in url.`);
    }
    console.log(query);
});
