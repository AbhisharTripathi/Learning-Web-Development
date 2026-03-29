const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.createReview = wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    // console.log(id);//if we not use mergeParams the value of id will be undefined.
    let listing = await Listing.findById(id);
    if(!listing) {
        throw new ExpressError(404, "Listing not found.");
    }
    let newReview = new Review({ ...req.body.review, author: req.user._id});
    await newReview.save();
    listing.reviews.push(newReview._id);
    let resListing = await listing.save();
    await resListing.populate("reviews");
    req.flash("success", "Review Added!");
    // res.send(resListing);
    res.redirect(`/listings/${id}`);
});

module.exports.deleteReview = wrapAsync(async (req, res, next) => {
    let {id , reviewId} = req.params;
    // let listing = await Listing.findById(id);
    // let updatedReviews = listing.reviews.filter((el) => (el.toString() !== reviewId.toString()));
    // listing.reviews = updatedReviews;
    // await listing.save();
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
});

/*
//This code contains use of transaction which is not supported on standalone db it requires replica set.
router.post("/", wrapAsync(async (req, res, next) => {
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