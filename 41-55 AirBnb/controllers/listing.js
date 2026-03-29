const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");

module.exports.index = async (req, res) => {
    try {
        let allListings = await Listing.find({});
        res.render("./listings/index.ejs", { allListings });
    }
    catch(err) {
        console.log(err);
    }
};

module.exports.renderNewForm = (req, res) => {
    // console.log(req.user);//it is the object document containing the info(_id, email, useranme, __v are there but password is not present) of authenticated user.
    res.render("./listings/new.ejs");
};

module.exports.createNewListing = wrapAsync(async (req, res) => {
    let validationResult = listingSchema.validate(req.body);//this is used to validate the req.body with the listingSchema that we defined using Joi. it will not automatically throw the error. better practice to use it is using a middleware.
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

    let newListing = new Listing({...req.body.listing, owner: req.user._id});

    await newListing.save();
    req.flash("success", "Listing Added!");
    res.redirect("/listings");
});

module.exports.renderEditForm = wrapAsync(async (req, res) => {
    let { id } = req.params;
        let listing = await Listing.findById(id);
        if(!listing) {
            req.flash("error", "Listing does not exist!");
            res.redirect("/listings");
        }
        else {
            res.render("./listings/edit.ejs", { listing });
        } 
});

module.exports.updateListing = async (req, res, next) => {
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
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res, next) => {
    let { id } = req.params;
    try {
        let deletedListing = await Listing.findByIdAndDelete(id);
    }
    catch(err) {
        next(err);
    }
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

module.exports.showListing = wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    else{
        await listing.populate({path: "reviews", populate: {path: "author"}});
        await listing.populate("owner");
        res.render("listings/show.ejs", { listing });
    }
});