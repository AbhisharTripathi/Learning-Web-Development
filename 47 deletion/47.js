const mongoose = require("mongoose");
const { Schema } = mongoose;

const MONGO_URL = "mongodb://127.0.0.1:27017/relationDemo";

main()
    .then(() => {console.log("Connected to database.");})
    .catch((err) => {console.log(err);});

async function main() {
    return await mongoose.connect(MONGO_URL);
}

//Handling deletion using mongoose middlewares, we can use two middlewares 
//1. Pre = run before the query is executed.
//2. Post = run after the query is executed.

const orderSchema = new Schema({
    item: String,
    price: Number
});
const Order = mongoose.model("Order", orderSchema);

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order" //it is the name of the model used during population.
        } 
    ]
});
//this should be written after the initialization of the Schema
/*
customerSchema.pre("findOneAndDelete", async (data) => {//it contains two arguments first one is the function name that will trigger this middleware before it's execution and second one is the callback which will execute when middleware is triggered. findOneAndDelete can be triggered by findByIdAndDelete and by findOneAndDelete.
    console.log("findOneAndDelete is triggered by pre.");
    console.log(data);//data contains the deleted document here. it usually contains the promise result of the query.
});

customerSchema.post("findOneAndDelete", async (data) => { //this will get triggered just after the execution of the findOneAndDelete or findByIdAndDelete.
    console.log("findOneAndDelete is triggered by post.");
});
*/

// middlewares must be defined before creating the model
customerSchema.post("findOneAndDelete", async (customer) => {
    if(customer.orders.length) {

        // for(let orderId of customer.orders) {
        //     let deletedOrder = await Order.findByIdAndDelete(orderId);
        //     console.log(deletedOrder);
        // }

        let res = await Order.deleteMany({_id: {$in: customer.orders}});
        console.log(res); //{ acknowledged: true, deletedCount: 2 }
    }
});

customerSchema.post("find", async (data) => {
    console.log("Inside find", data);
});
customerSchema.post("findOne", async (data) => {
    console.log("Inside findOne", data);
});

const Customer = mongoose.model("Customer", customerSchema);

let delCustomer = async () => {
    let rahul = await Customer.findByIdAndDelete("69bd43e336afa7745d60f068");
    console.log("Rahul was deleted.", rahul);
};
// delCustomer();


let middlewareCheck = async () => {
    await Customer.find();
    console.log("After the find query.");
}
middlewareCheck();