const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../model/listing.js");
const Review = require("../model/review.js");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose.default); //passport-local-mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value. we do not need to define it inside our Schema. we pass it using plugin function of our schema object in the scheama before making model.

userSchema.post("findOneAndDelete", async function(user) {
    try {
        await Listing.deleteMany({owner: user._id});
        await Review.deleteMany({author: user._id});
    }
    catch(err) {
        throw console.log(err);
        // throw new ExpressError(400, err.message);
    }
});

module.exports = mongoose.model("User", userSchema);