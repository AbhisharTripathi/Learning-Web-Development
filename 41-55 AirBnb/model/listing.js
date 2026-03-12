const mongoose = require("mongoose");
const listingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        set: (v) => v==="" ? "https://images.unsplash.com/photo-1470770841072-f978cf4d019e" : v
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;