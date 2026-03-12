//express, ejs, uuid, mysql2, method-override

const express = require("express");
const app = express();

const { v4: uuid} = require("uuid");

const mysql = require("mysql2");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require("path")

app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const port = 8080;
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "instagram",
    password: "1234567"
});

app.get("/", (req, res) => { //show no. of users.
   try {
        connection.query("SELECT COUNT(*) FROM user", (err, results, fields) => {
            if(err) throw err;
            // res.send(results);
            res.render("index.ejs", {results});
        });
    }
    catch(err) {
        console.log(err);
    }
});

app.get("/user", (req, res) => { //it shows all users info
    try {
        let q = "SELECT id, name, email FROM user";
        connection.query(q, (err, results, fields) => {
            if(err) throw err;
            res.render("home.ejs", { results });
        });
    }
    catch(err) {
        console.log(err);
    }
});

app.get("/user/new", (req, res) => {//you need to put this above any params get request because the above one takes the request.
    res.render("new.ejs");
});

app.post("/user", (req, res) => { //add new user
    let { name, email, password} = req.body;
    try {
        let q = "INSERT INTO user (name, email, password, id) VALUES ?";
        let arr = [[name, email, password, uuid()]];
        connection.query(q, [arr], (err, results, fields) => {
            if(err) throw err;
            res.redirect("/user");
        });
    }
    catch(err) {
        console.log(err);
        res.redirect("/user");
    }
});

app.get("/user/:id/edit", (req, res) => { //edit any user part 1
    try {
        let { id } = req.params;
        let q = "SELECT name, email FROM user WHERE id = ?";
        let arr = [id];
        connection.query(q, arr, (err, results, fields) => {
            if(err) throw err;
            res.render("edit.ejs", { results, id });
        });
    }
    catch(err) {
        console.log(err);
    }
});

app.patch("/user/:id", (req, res) => { //edit the user part 2
    let { id } = req.params;
    let {name, password, email} = req.body;
    try {
        let q = "SELECT name, password, email FROM user WHERE id =" + '"' + id + '"';//don't use again.
        connection.query(q, (err, results, fields) => {
            if(err) throw err;
            if(password !== results[0]["password"]) {
                // res.send("<h2>Wrong Password</h2><br><a href='/'>Go to home</a>");
                res.redirect(`/user/${id}/edit`);
            }
            else {
                q = "UPDATE user SET name = ?, email = ? WHERE id = ?";
                let arr = [ name, email, id];
                connection.query(q, arr, (err, results, fields) => {
                    if(err) throw err;
                    // res.redirect("/user/" + id);
                    res.redirect("/user");
                });
            }
        });

    }
    catch(err) {
        console.log(err);
    }
});

app.delete("/user/:id", (req, res) => { //delte the user
    let { id } = req.params;
    try {
        let q = "DELETE FROM user WHERE id = ?";
        let arr = [id];
        connection.query(q, arr, (err, results, fields) => {
            if(err) throw err;
            res.redirect("/user");
        });
    }
    catch(err) {
        console.log(err);
    }
});

// connection.end();
app.listen(port, () => {
console.log(`Server is listening on port ${port}`);
});