//ejs : embedded javascript template, is a simple templating language that lets you generate html markup with plain javascript.
const express = require("express");
const app = express();

app.set("view engine", "ejs");//this set the view engine to ejs.

let port = 3000;
app.listen(port, () => {
    console.log("server is running");
});

app.get("/hello", (req, res) => {
    res.send("Hello");
})
app.get("/", (req, res) => {
    res.render("home");//We do not need to write the full path because by default express will search for home in views directory in that directory where we started out server. i.e if we start our sever other than the 32 express ejs (folder which contains 32.js and views) it will not work.
});
// To make it work for other directories we add these two lines.
const path = require('path');
app.set("views", path.join(__dirname, "/views"));//path.join() is a method in path package which joins two path, here __dirname is the path of the directory of our 32.js file and /views is the path from __dirname to the directory of home.ejs file.

//Interpolation syntax :- It refers to embedding syntax to HTML marked up text.

app.get("/rolldice", (req, res) => {
    let { special } = req.params; //we can pass url path parameter to the render method using obj.
    let diceVal = Math.floor(Math.random() * 6) + 1;
    let diceVal2 = Math.floor(Math.random() * 6) + 1;
    let players = ["ram", "lakshaman", "sita", "dashrath", "ravan", "meghnath"];

    let obj = {
        val : diceVal,
        diceVal2, //we can pass the value directly in the object without the key and it can be accessed using the value identifier directly.
        players,
        special
    };
    res.render("rollDice.ejs", obj);//we pass two arguments first is ejs file name and second is object which contains the data that will be used in the ejs file. We access the data using key of the object to get it's value.  
});

app.get("/ig/:username", (req, res) => {
    const instaData = require("./instagram.json");//used to access a json file.
    let { username } = req.params;
    let userData = instaData[username];
    if (userData) {
        res.render("instagram.ejs", { userData });
    }
    else {
        res.send(`${username} is not a existing user.`);
    }
});


