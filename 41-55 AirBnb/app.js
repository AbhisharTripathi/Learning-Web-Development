const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// This tells Express to serve everything inside the "bootstrap-5.3.8-dist" folder
app.use('/bootstrap', express.static(path.join(__dirname, 'bootstrap-5.3.8-dist')));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("Connected to db")
})
.catch((err) => {
    console.log(err);
});
async function main() {
    return await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.send(`<a href="/listings">Go to All listings.</a>`);
});

//Index Route
app.get("/listings", async (req, res) => {
    try {
        let allListings = await Listing.find({});
        res.render("./listings/index.ejs", { allListings });
    }
    catch(err) {
        console.log(err);
    }
});

//New route
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
});

//Create route
app.post("/listings", async (req, res) => {
    // let {title, location, country, image, price, description} = req.body;
    // let listing = new Listing({
    //     title: title,
    //     location: location,
    //     country: country,
    //     image: image,
    //     price: price,
    //     description: description
    // });

    // let listing = new Listing(req.body); these two will work only if you use form normally.

    let newListing = new Listing(req.body.listing);

    await newListing.save();
    res.redirect("/listings");
});

//Edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    try {
        let listing = await Listing.findById(id);
        res.render("./listings/edit.ejs", { listing });
    }
    catch(err) {
        console.log(err);
    }
});

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
    }
    catch(err) {
        console.log(err);
    }
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
    }
    catch(err) {
        console.log(err);
    }
    res.redirect("/listings");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

app.get("/testlisting", async (req, res) => {
    let newListing = new Listing({
        title: "my new villa",
        description: "By the Stadium",
        price: 780,
        location: "Ramgarh, UP",
        country: "India"
    });

    console.log(await newListing.save());
    res.send("Successful Testing.");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080.");
});