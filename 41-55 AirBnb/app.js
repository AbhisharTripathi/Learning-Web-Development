const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

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
app.post("/listings", wrapAsync(async (req, res) => {

    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid data for Listing.");
    }

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
}));

//Edit route
app.get("/listings/:id/edit",wrapAsync(async (req, res) => {
    let { id } = req.params;
        let listing = await Listing.findById(id);
        res.render("./listings/edit.ejs", { listing });
}));

//Update Route
app.put("/listings/:id", async (req, res, next) => {
    let { id } = req.params;
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid data for Listing.");
    }
    try {
        await Listing.findByIdAndUpdate(id, {...req.body.listing});
    }
    catch(err) {
        next(err);
    }
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res, next) => {
    let { id } = req.params;
    try {
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
    }
    catch(err) {
        next(err);
    }
    res.redirect("/listings");
});

//Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));

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


//Page not found
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

//Handling error
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!"} = err;
    // res.status(status).send(message + "<br>Error name : " + err.name);

    res.status(status).render("error.ejs", { message, stack: err.stack });
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080.");
});