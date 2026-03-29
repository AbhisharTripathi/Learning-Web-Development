const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const Review = require("../model/review.js");
const listingController = require("../controllers/listing.js");

//Index Route
router.get("/", listingController.index);

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Create route
router.post("/", isLoggedIn, listingController.createNewListing);

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

//Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, listingController.updateListing);//here the validateListing middleware is used.

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, listingController.deleteListing);

//Show Route
router.get("/:id", listingController.showListing);

module.exports = router;