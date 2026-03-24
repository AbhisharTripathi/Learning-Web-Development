const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../model/listing.js");

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

//Index Route
router.get("/", async (req, res) => {
    try {
        let allListings = await Listing.find({});
        res.render("./listings/index.ejs", { allListings });
    }
    catch(err) {
        console.log(err);
    }
});

//New route
router.get("/new", (req, res) => {
    res.render("./listings/new.ejs");
});

//Create route
router.post("/", wrapAsync(async (req, res) => {
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
router.get("/:id/edit",wrapAsync(async (req, res) => {
    let { id } = req.params;
        let listing = await Listing.findById(id);
        res.render("./listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id", validateListing, async (req, res, next) => {//here the validateListing middleware is used.
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
router.delete("/:id", async (req, res, next) => {
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
router.get("/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    await listing.populate("reviews");
    res.render("listings/show.ejs", { listing });
}));

module.exports = router;