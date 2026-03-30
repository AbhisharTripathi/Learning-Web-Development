const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");//we need this library to parse and store enctype="multipart/form-data" on server side.
const { storage } = require("../cloudConfig.js");

// const upload = multer({ dest: "uploads/"});//this gives us the destination to store the file localy
const upload = multer({ storage });//this will store the file on cloud storage which we define using multer-storage-cloudinary.

//New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//roter.route("path").get().post().delete();  can group different request with same path.
router.route("/")
.get(listingController.index)//Index Route
.post(isLoggedIn, upload.single("listing[image]"), listingController.createNewListing);//Create route
// .post(upload.single("listing[image]"),(req, res) => {//the upload.single("listing[image]") middleware tells the multer which file (name from form) to extract from the req.
//     console.log("body send.");
//     res.send(req.file);//we get a new parameter req.file after using multer.
// });

router.route("/:id")
    .get(listingController.showListing)//show route
    .put(isLoggedIn, isOwner, validateListing, upload.single("listing[image]"), listingController.updateListing)//Update Route, here the validateListing middleware is used.
    .delete(isLoggedIn, isOwner, listingController.deleteListing);//Delete Route

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;