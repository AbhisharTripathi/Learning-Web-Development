const express = require("express");
const router = express.Router();

//index Route
router.get("/", (req, res) => {
    res.send("This is the index route.");
});

//show route
router.get("/:id", (req, res) => {
    res.send("This is the show route.");
});

//new route
router.get("/new", (req, res) => {
    res.send("This is the new post creation route.");
});

//create route
router.post("/", (req, res) => {
    res.send("This is the post route.");
});

//delete route
router.delete("/:id", (req, res) => {
    res.send("This is the delete route.");
});

module.exports = router;