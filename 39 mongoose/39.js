//npm i mongoose
//mongoose : it is a library that creates a connection between MongoDB and Node.js JavaScript runtime environment. It is an ODM(Object Data Modeling) library.
const mongoose = require("mongoose");
//"mongobd://user:password@127.0.0.1:27017/test" this is the url for mongodb.
main()
    .then((res) => {
        // console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    return await mongoose.connect("mongodb://127.0.0.1:27017/test");//this will establish a connection with db
}

/*
The permitted SchemaTypes are :-
String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, UUID
*/
const userSchema = new mongoose.Schema({//this is how we define the schema of a collection using Schema class defined in mongoose.
    name: String,
    email: String,
    age: Number
});

//model in mongoose is a class with which we construct documents.
const User = mongoose.model("User", userSchema); //mongoose.model() function will create a class and return it, it takes two argument first one is the calculated name of the collection and second is the Schema instance we created earlier using Schema class. Here User is called as model. Also when we pass name as User it will create a collection in database with name as users i.e it will automatically convert it into lowercase and plural.
// const user1 = new User({ //this will create a instance of the class User which was a model we created.
//     name: "Ram",
//     email: "ram@ayodhya.com",
//     age: 29
// });//this will load the data into memory but will not save it in db.  it will add two new field one is _id and other is __v

// user1.save()//to save it in db we use save() method which is asynchronous function i.e. it will return a promise.
//     .then((res) => {
//         console.log(res);//result will have the document that we saved with two new properties.
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//we can also save data of many users using insertMany() method of model. it will take array of objects as argument
// User.insertMany([ //it will return a promise.
//     {
//         name: "Lakshaman",
//         email: "lakhan@ayodhya.com",
//         age: 89
//     },
//     {
//         name: "Sita",
//         email: "sita@ayodhya.com",
//         age: 78
//     },
//     {
//         name: "Dashrath",
//         email: "dashrath@ayodhya.com",
//         age: 46
//     },
// ]).then((res) => {//res will have the array of objects you passed with each object have two extra property.
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });

//Mongoose uses Operation Buffering : Mongoose lets you start using models immediately, without waiting for mongoose to establish a connection with MongoDB.

//find query in mongoose. We use model's find() method and simillar other method of model. It returns a Query object and this object is thenable(it means we can use then() method on it) but this object is not a promise and we can not use await.
// User.find({})
//     .then((res) => {
//         console.log(res);//htis will print all the collections as Array of objects.
//     });

// User.find({age: {$gt: 50}})
//     .then((res) => {
//         console.log(res);
//     });
// //we can also use findOne(), 
// User.findOne({_id: '69a3e95f87aa8236de4d7968'})
//     .then((res) => {
//         console.log(res);
//     });

// User.findById('69a3e95f87aa8236de4d7968') //this will return a query object which as result contains the single collection with given id.
//     .then((res) => {
//         console.log(res);
//     });

//Update query in mongoose
// User.updateOne({name: "Raghuvir"}, {email: "raghuvir@ayodhaya.com"})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     });
/*
it also returns a Query object, in which as result we get acknoledgement report like this :-
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
*/
//we can also use updateMany(); to update all collection that matches the filter. it will also return acknoledgement report.

// User.findOneAndUpdate({name: "Dashrath"}, {age: 90})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     });
/*
This will return a query object but this time the result in query object is not acknoledgement report but the collection it find and updated. The non updated value is stored in res not the updated value.
{
  _id: new ObjectId('69a3e95f87aa8236de4d7969'),
  name: 'Dashrath',
  email: 'dashrath@ayodhya.com',
  age: 46,
  __v: 0
}
*/
// User.findOneAndUpdate({name: "Sita"}, {name: "Janki"}, {returnDocument: 'after'})//to get the updated collection as result we pass a option {returnDocument: 'after'}
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// User.findByIdAndUpdate("69a3e95f87aa8236de4d7969", {name: "King of Ayodhya"}, {returnDocument: 'after'})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

//we can also delete documents inside a collection.
// User.deleteOne({name: "Sita"})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// User.deleteMany({age: {$gt: 80}})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
/*
Both of these above method will return a qurey object whose result will contain the acknoledgement report like this
{ acknowledged: true, deletedCount: 2 }
*/

//To get the object we delted we use these methods :-
// User.findByIdAndDelete("69a3e95f87aa8236de4d7968")
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
/*
{
  _id: new ObjectId('69a3e95f87aa8236de4d7968'),
  name: 'Janki',
  email: 'sita@ayodhya.com',
  age: 78,
  __v: 0
} we get this as result or null if nothing was delted.
*/
//we can also use 
// User.findOneAndDelete({name: "Raghuvir"})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// let userr = new User({name: 78, age: 'jfdjfj78'});
// userr.save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     }); //the name insertion worked because it typecasted 78 to string but age insertion failed _message: 'User validation failed' but if we try to set {age: "47"} it will get inserted because "47" can be casted into number.
//This validation will work when we try to insert something but if we try to update something the validation will not work to make it work we set a option {runValidators: true}
User.insertOne({name: "Meghnath", age: 89, email: "meghnath@lanka.com"}, {runValidators: true})
    .then(res => {console.log(res);})
    .catch((err) => {
        console.log(res);
    });

//if you pass any field to save and it is not present in the schema model will not throw any error it will just ignore that field and not save it.

//also check book.js