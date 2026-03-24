const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing.js");
const Review = require("./model/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
// This tells Express to serve everything inside the "bootstrap-5.3.8-dist" folder
app.use('/bootstrap', express.static(path.join(__dirname, 'bootstrap-5.3.8-dist')));

app.get("/", (req, res) => {
    res.send(`<a href="/listings">Go to All listings.</a>`);
});

//Listings routes
app.use("/listings", listings);

//Review routes
app.use("/listings/:id/reviews", reviews);

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


//wrapAsync is better than try catch