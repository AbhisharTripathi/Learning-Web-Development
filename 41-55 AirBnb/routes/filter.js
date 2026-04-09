const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filter.js");

router.get("/", filterController.getListings);

module.exports = router;