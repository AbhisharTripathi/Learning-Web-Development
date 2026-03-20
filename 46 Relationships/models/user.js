const mongoose = require("mongoose");
const { Schema } = mongoose;

const MONGO_URL = "mongodb://127.0.0.1:27017/relationDemo";

main()
    .then(() => {console.log("Connected to database.");})
    .catch((err) => {console.log(err);});

async function main() {
    return await mongoose.connect(MONGO_URL);
}

//Example of how we create one to few relation inside the mongodb. Here one user can have many(few) address so we store the actual address as document inside the user as Array of Objects. This is our first aproach where many is <= 1000
const userSchema = new Schema({
    username : String,
    addresses: [
        {
            _id: false, //this will tell the mongodb not to create the _id property for these documents inside the addresses, if you do not write this mongodb will automatically create the _id attribute for each document inside the addresses.
            location: String,
            city: String
        }
    ]
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
    let user1 = new User({
        username: "Ram",
        addresses: [
            {
                location: "Beside Van",
                city: "Ayodhya"
            },
            {
                location: "Satyug",
                city: "Dashrath nagar"
            }
        ]
    })
    let address3 = {
        location: "location of address 3",
        city: "City of address 3"
    };
    user1.addresses.push(address3);
    let res = await user1.save();
    console.log(res);
}

addUser();
