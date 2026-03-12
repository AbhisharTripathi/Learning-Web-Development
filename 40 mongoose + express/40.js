// method-override, uuid
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const methodOverride = require("method-override");

//schemas
const Chat = require("./models/chat.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(methodOverride("_method"));

main()
    .then(() => {console.log("Connected sucessfully with database.");})
    .catch(err => {console.log(err);});
async function main() {
    return await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//Index route
app.get("/chats", async (req, res) => {
    let allChats = await Chat.find();
    // console.log(allChats);
    res.render("index.ejs", { allChats });
});



app.get("/", (req, res) => {
    res.send("This is your root path.");
});
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});