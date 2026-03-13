// method-override, uuid
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

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

app.get("/chats/:id", async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if(!chat) {
        // throw new ExpressError(500, "Async funtion error.");
        next(new ExpressError(500, "Async funtion error."));//Both works but this was recommended by the teacher. also all this code should be inside the try catch block so that any error send by mongoose e.g. if id's length is not correct can also be handles using the try catch block.
    }
    res.send(chat);
});

//All error handler.
app.use((err, req, res, next) => {
    let { status = 500, message = "Default set for error."} = err;
    res.status(status).send(message);
});

app.get("/", (req, res) => {
    res.send("This is your root path.");
});
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});