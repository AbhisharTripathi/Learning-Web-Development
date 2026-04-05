const mongoose = require("mongoose");
const { Schema } = mongoose;
const ExpressError = require("../utils/ExpressError.js");

const reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comment: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

reviewSchema.pre("deleteMany", async function() {
    try {
        const Listing = mongoose.model("Listing");
        let result = await this.model.find(this.getFilter());
        let allReviewIds = result.map(review => review._id);
        await Listing.updateMany({reviews: {$in: allReviewIds}}, {$pull: {reviews: {$in: allReviewIds}}});
    }
    catch(err) {
        throw new ExpressError(400, err.message);
    }
});

module.exports = mongoose.model("Review", reviewSchema);