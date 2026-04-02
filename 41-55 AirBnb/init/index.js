if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const Listing = require("../model/listing.js");
const initData = require("./data.js");

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGO_URL = process.env.MONGO_URL;
main().then(() => {
    console.log("Connected to db")
})
.catch((err) => {
    console.log(err);
});
async function main() {
    return await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj)  => ({...obj, owner: '69ca4de045f4647beefc84d4'}));//Clear the whole database then Signup a user first then get the ObjectId of that user and paste it in the value of owner.
        await Listing.insertMany(initData.data);
        console.log("Database initialized with sample data.");
    }
    catch(err) {
        console.log(err);
    }
}

initDB();