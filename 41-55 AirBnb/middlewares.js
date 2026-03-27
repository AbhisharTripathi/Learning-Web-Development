const Listing = require("./model/listing");
const Review = require("./model/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;//req.originalUrl stores the url user want to access.
        req.flash("error", "You must be logged in to perform this task.");
        return res.redirect("/users/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(req.user._id)) {
        req.flash("error", "You need to be the owner of this listing to perform the task.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing = (req, res, next) => {//we can use this middleware in update and create route but we only used this in update route because we used another form of joi validation for create route but this is better than that.
    let { error: validationError } = listingSchema.validate(req.body);
    if(validationError) {
        let errMsg = validationError.details.map((el) => (el.message)).join(", ");//details is an array of objects, and each object contains a message property.
        throw new ExpressError(400, errMsg);
    } 
    else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let validationResult = reviewSchema.validate(req.body);
    if(validationResult.error) {
        let errMsg = validationResult.error.details.map((el) => (el.message)).join(", ");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};