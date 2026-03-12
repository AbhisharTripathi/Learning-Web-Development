//REST :- Representational state transfer, REST is an architectural style that define a set of constraints to be used for creating web services.
// methods :- GET(veiw, index), POST(create), PUT(update), PATCH(update), DELETE(destroy)

const express = require("express");
const app = express();
const port = 8080;
/*To create random id we can import uuid(universal unique identifier) package like written below after installing it. To use it we just call the uuidv4() and it returns a uuid in string format.*/
const { v4: uuidv4} = require("uuid");
// import {v4 as uuidv4} from "uuid";

const methodOverride = require("method-override");
app.use(methodOverride("_method")); //we can also set any other value

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

let posts = [
    {
        id: uuidv4(),
        username: "ram",
        content: "It is fun to create web services."
    },
    {
        id: uuidv4(),
        username: "sita",
        content: "It is fun to use web services."
    },
    {   
        id: uuidv4(),
        username: "ravan",
        content: "It is fun to disrupt web services."
    }
];

app.get("/posts", (req, res) => {//index route
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {//create route part 1
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {//create route part 2
    let {username, content} = req.body;
    posts.push({username: username, content: content, id: uuidv4()});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {//show route / view route
    let { id } = req.params;
    let post = posts.find((el) => (id === String(el.id)));
    res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {//update route part 1
    let { id } = req.params;
    let post = posts.find((el) => (id === String(el.id)));
    res.render("update.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {//update route part 2
    let { id } = req.params;
    let post = posts.find((el) => (id === String(el.id)));
    let { content: newContent, username } = req.body;
    post.username = username;
    post.content = newContent;
    res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {//destroy route
    let { id } = req.params;
    posts = posts.filter((el) => id !== el.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});





/*
We can only send GET & POST request using HTML form.
To send any other request we use a package method-override.
We intall it and then reqiure it in our project and write this line:-
const methodOverride = require("method-override");
app.use(methodOverride(_method));//we can also set any other value
To use this package to change our request method there are many ways  but we can use query string method to do this we just add a query string _method=PATCH in action attribute of form and also make the method post to send the request content in request body not in url.
e.g. <form method="post" action="url?_method=PATCH">.......</form>
*/