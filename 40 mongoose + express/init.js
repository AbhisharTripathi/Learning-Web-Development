const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(res => {
    console.log("Connection successful");
})
.catch(err => {
    console.log(err);
});

async function main() {
    return await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
    {
        from: "Neha",
        to: "Priya",
        message: "Send me your exam sheets",
        created_at: new Date()
    },
    {
        from: "Raj",
        to: "Manas",
        message: "How are you!",
        created_at: new Date()
    },
    {
        from: "Hans",
        to: "Ayushi",
        message: "I am going to school.",
        created_at: new Date()
    },
    {
        from: "Kartik",
        to: "Krishna",
        message: "My practice is going well.",
        created_at: new Date()
    },
    {
        from: "Divya",
        to: "Ritu",
        message: "Tomorrow will be a great day.",
        created_at: new Date()
    },
    {
        from: "Amrita",
        to: "Samantha",
        message: "What do you think about my name.",
        created_at: new Date()
    },
    {
        from: "Ram",
        to: "NTR",
        message: "Nice movie!",
        created_at: new Date()
    }
];

Chat.insertMany(allChats)
    .then(res => {
    console.log(res);
    })
    .catch(err => {
        console.log(err);
    });