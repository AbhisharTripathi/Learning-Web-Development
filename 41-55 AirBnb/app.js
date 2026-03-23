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


const validateListing = (req, res, next) => {//we can use this middleware in update and create route but we only used this in update route because we used another form of joi validation for create route but this is better than that.
    let { error: validationError } = listingSchema.validate(req.body);
    if(validationError) {
        let errMsg = validationError.details.map((el) => (el.message)).join(", ");//details is an array of objects, and each object contains a message property.
        throw new ExpressError(400, errMsg);
    } 
    else {
        next();
    }
};

const validateReview = (req, res, next) => {
    let validationResult = reviewSchema.validate(req.body);
    if(validationResult.error) {
        let errMsg = validationResult.error.details.map((el) => (el.message)).join(", ");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
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
    let validationResult = listingSchema.validate(req.body);//this is used to validate the req.body with the listingSchema that we defined using Joi. it will not automatically throw the error.
    // console.log(validationResult);//this is the result it produces.
    if(validationResult.error) { //if error exists in the validation result
        throw new ExpressError(400, validationResult.error); //it will throw the error by taking message from validationResult.error
    }

    // if(!req.body.listing) { //this is not required as we are using joi.
    //     throw new ExpressError(400, "Send valid data for Listing.");
    // }

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
app.put("/listings/:id", validateListing, async (req, res, next) => {//here the validateListing middleware is used.
    let { id } = req.params;
    // if(!req.body.listing) { //we don't need this now as we are using joi.
    //     throw new ExpressError(400, "Send valid data for Listing.");
    // }//we can write this condition check for every listing info to check for their presence and throw different error for each of them.
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
    await listing.populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

//Reviews
//POST Route
app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        throw new ExpressError(404, "Listing not found.");
    }
    let newReview = new Review(req.body.review);
    await newReview.save();
    listing.reviews.push(newReview._id);
    let resListing = await listing.save();
    await resListing.populate("reviews");
    // res.send(resListing);
    res.redirect(`/listings/${id}`);
}));

/*
//This code contains use of transaction which is not supported on standalone db it requires replica set.
app.post("/listings/:id/reviews", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let listing = await Listing.findById(id).session(session);
        if(!listing) {
            throw new ExpressError(404, "Listing not found.");
        }
        let newReview = new Review(req.body.review);
        await newReview.save({session});
        listing.reviews.push(newReview._id);
        let resListing = await listing.save( {session });
        await session.commitTransaction();
        await resListing.populate("reviews")
        res.send(resListing);
    }
    catch(err) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        next(err);
    }
    finally {
        if(session) {
            session.endSession();
        }
    }
}));
*/

//Delete Route for review
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res, next) => {
    let {id , reviewId} = req.params;
    // let listing = await Listing.findById(id);
    // let updatedReviews = listing.reviews.filter((el) => (el.toString() !== reviewId.toString()));
    // listing.reviews = updatedReviews;
    // await listing.save();
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
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


//wrapAsync is better than try catch