const mongoose = require("mongoose");
const Listing = require("../model/listing.js");
const initData = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
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
        initData.data = initData.data.map((obj)  => ({...obj, owner: '69ca4de045f4647beefc84d4'}));
        await Listing.insertMany(initData.data);
        console.log("Database initialized with sample data.");
    }
    catch(err) {
        console.log(err);
    }
}

initDB();