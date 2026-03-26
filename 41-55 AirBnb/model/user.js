const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose.default); //passport-local-mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value. we do not need to define it inside our Schema. we pass it using plugin function of our schema object in the scheama before making model.

module.exports = mongoose.model("User", userSchema);