const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const Review = require("../model/review.js");
const listingController = require("../controllers/listing.js");

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//roter.route("path").get().post().delete();  can group different request with same path.
router.route("/")
.get(listingController.index)//Index Route
.post(isLoggedIn, listingController.createNewListing);//Create route

router.route("/:id")
    .get(listingController.showListing)//show route
    .put(isLoggedIn, isOwner, validateListing, listingController.updateListing)//Update Route, here the validateListing middleware is used.
    .delete(isLoggedIn, isOwner, listingController.deleteListing);//Delete Route

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;