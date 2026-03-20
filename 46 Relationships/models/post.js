const mongoose = require("mongoose");
const { Schema } = mongoose;

const MONGO_URL = "mongodb://127.0.0.1:27017/relationDemo";

main()
    .then(() => {console.log("Connected to database.");})
    .catch((err) => {console.log(err);});

async function main() {
    return await mongoose.connect(MONGO_URL);
}


//Approach 3, One to squillions. Stores a refernce to the parent document inside child.
const userSchema  = new Schema({
    username: String,
    email: String
});

const postSchema = new Schema({
    content: String, 
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
    let user1 = new User({
        username: "Lakhan",
        email: "lakhan@ayodhya.com"
    });

    let post1 = new Post({
        content: "I am going to visit van.",
        likes: 200
    });

    post1.user = user1;

    await user1.save();
    await post1.save();
}
// addData();

const addMoreData = async () => {
    let user1 = await User.findOne({username: "Lakhan"});

    let post2 = new Post({
        content: "It's beautiful here.",
        likes: 4578
    });

    post2.user = user1;
    await post2.save();
}

// addMoreData();

const showData = async () => {
    let res = await Post.find({}).populate("user", "username");//here username is the only property we want to display in populated data along with _id.
    console.log(res);
}
showData();
