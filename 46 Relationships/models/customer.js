const mongoose = require("mongoose");
const { Schema } = mongoose;

const MONGO_URL = "mongodb://127.0.0.1:27017/relationDemo";

main()
    .then(() => {console.log("Connected to database.");})
    .catch((err) => {console.log(err);});

async function main() {
    return await mongoose.connect(MONGO_URL);
}

const orderSchema = new Schema({
    item: String,
    price: Number
});

const Order = mongoose.model("Order", orderSchema);

const addOrders = async () => {
    let res = await Order.insertMany([
        {
            item: "Samosa",
            price: 7
        },
        {
            item: "Chips",
            price: 10
        },
        {
            item: "Chocolate",
            price: 40
        }
    ]);

    console.log(res);
}
// addOrders();


//Example of one to many(more than few) Approach 2. store a reference to the child document inside parent document.
const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order" //it is the name of the model used during population.
        } 
    ]
});

const Customer = mongoose.model("Customer", customerSchema);

const addCustomer = async () => {
    let customer1 = new Customer({
        name: "Rahul kumar"
    });
    let order1 = await Order.findOne({item: "Chips"});
    let order2 = await Order.findOne({item: "Chocolate"});

    customer1.orders.push(order1);//here i am pushing the whole object but in customerScheam we have defined to add only ObjectId therefore, only ObjectId will be stored in the database, even though terminal will show the full object in res.
    customer1.orders.push(order2);

    let res = await customer1.save();
    console.log(res);
}

// addCustomer();

const findCustomers = async () => {
    let customersData = await Customer.find().populate("orders");//this will replace the object id by the document itself. here orders is the name of the property we want to populate.
    console.log(customersData);
}

findCustomers();

