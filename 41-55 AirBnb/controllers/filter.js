const Listing = require("../model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.getListings = wrapAsync(async (req, res, next) => {
    let filters = req.query.filters.split(",");
    let filteredListings;
    console.log(filters);
    if(filters[0] === "") {
        filteredListings = await Listing.find({});
    } else {
        filteredListings = await Listing.find({categories : {$in: filters}});
    }
    
    res.json(filteredListings);
});