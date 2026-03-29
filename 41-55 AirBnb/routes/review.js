const express = require("express");
const router = express.Router({mergeParams: true});//This helps in merging or sending the params from the parent path to the child path.
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middlewares.js");
const reviewController = require("../controllers/review.js");

//Reviews
//POST Route
router.post("/",isLoggedIn, validateReview, reviewController.createReview);

//Delete Route for review
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;