let obj = {
    1: "a",
    "1":"b",
    key: "value",
    "key": "babah"
}
//it treats the keys as string
//only last key is going to be relevent.

//access
console.log(obj.key, obj["key"]);//second method for access allows giving variable key for access.

//modify
obj.key = "bala";
console.log(obj);
obj["key"] = "jaislamer";
console.log(obj);

//add new pair
obj.new = "jaiMahakal";
console.log(obj);

//delete existing pair
delete obj.key;
console.log(obj);
obj.yo = "honey";
console.log(obj);
delete obj["yo"];
console.log(obj);

//Objects in object
const classInfo = {
    ram: {
        rank: 1,
        place: "Ayodhya"
    },
    shyam: {
        rank: 3,
        place: "Ayodhya"
    },
    sita: {
        rank: 2,
        place: "Janakpur"
    }
};

//Array of objects.
const classArr = [
    {
        name: "ram",
        rank: 1,
        place: "Ayodhya"
    },
    {
        name: "shyam",
        rank: 3,
        place: "Ayodhya"
    },
    {
        name: "sita",
        rank: 2,
        place: "Janakpur"
    }
];

//Math object.
console.log(Math.PI);
console.log(Math.E);

console.log(Math.abs(-394.5)); //returns the same value without the positive or negative sign.
console.log(Math.pow(3,4));
console.log(Math.floor(7.999));  // 7 output is equal or  nearest smaller integer value.
console.log(Math.floor(-7.222)); //output is -8

console.log(Math.ceil(7.222)); // 8 output is equal or nearest larger integer value.
console.log(Math.ceil(-7.9999)); // output is -7

console.log(Math.random()); //gives value between [0,1) including 0 but never 1.
console.log(Math.random());
console.log(Math.floor(Math.random()*100) + 1);
console.log(Math.floor(Math.random() * 5)); //gives [0,4]
console.log(Math.floor(Math.random()* 5) + 1); //gives [1,5]
console.log(Math.floor(Math.random()* 5) + 21); //gives [21,25]