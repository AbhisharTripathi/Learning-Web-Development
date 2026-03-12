//forEach method.
let arr = [1,2,3,4,5,6,7,8,9,10];
let print = function(el) {
    console.log(el);
}

arr.forEach(print);

arr.forEach(el => {//we can pass any type of callback function normal or arrow. the argument is our element.
   console.log(el*2);
});

let arr2 = [
    {
        name: "ram",
        marks: 89
    },
    {
        name: "shyam",
        marks: 59
    },
    {
        name: "sita",
        marks: 90
    },
    {
        name: "Bharat",
        marks: 78
    },
    {
        name: "shatrunghan",
        marks: 86
    }
];

arr2.forEach( el => { //it will iterate over all the elements and apply the callback function on each element.
    console.log(el.name,' ', el.marks);
});

let sgpa = arr2.map((el) => el.marks/10);//it returns a array of the returned values of the callback function called on each element of the array.

let fil = arr2.filter((el) => (el.marks > 80));//it will return a array of those elements for which callback function returns true.

let filname = arr2.filter((el) => (el.marks > 80)).map((el) => el.name); // we can use laddering in these function.

let marks = [
    {
        subject: "coi",
        score: 8,
        credit: 0
    },
    {
        subject: "dbms",
        score: 8,
        credit: 4
    },
    {
        subject: "mlt",
        score: 8,
        credit: 3
    },
    {
        subject: "wt",
        score: 7,
        credit: 4
    },
    {
        subject: "daa",
        score: 7,
        credit: 4
    },
    {
        subject: "oosd",
        score: 8,
        credit: 3
    },
    {
        subject: "alllab",
        score: 10,
        credit: 3
    },
    {
        subject: "Mini Project",
        score: 9,
        credit: 2
    }
]

let isAllClear = marks.every((el) => { //it returns true if callback function returns true for every element otherwise false.
    return el.score >= 4;
});

let newSgpa = 0;
let totalCredit = 0;
marks.forEach(el => {
    newSgpa += el.score * el.credit;
    totalCredit += el.credit;
});

newSgpa /= totalCredit;

let isBelowAverage = marks.some(el => (el.score < 8)); //it returns true if callback function returns true for any element otherwise false.

let againTotalCredit = 0;
let againSgpa = marks.reduce((res, el) => { //it takes two argument first is a callback function and second is the initial value of the accumulator. the callback function also takes two parameters first is accumulator and second is element of the array. this callback function is called for each element of the array and returned value become the value of accumulator for next iteration with next element of array.
    againTotalCredit += el.credit;
    return (res + el.score * el.credit);
}, 0) / againTotalCredit;

console.log(againSgpa);

// Defualt Parameters
function add(a, b = 10){ //set a default value for the parameter, always assign default value to later parameters e.g. (a = 10,b) is not correct
    return a+b;
}
console.log(add(3,4)); //7
console.log(add(3)); //13

//Spread operator
let nums = [5,33,46,34,63,672,35,3,6];
console.log(Math.min(...nums)); //Math.min() requires number as argument not a array. so, ... operator spreads the iterable including array.
let numsCopy = [...nums]; //helps in creating copy of array.
let charArray = [..."institute"]; // helps in creating array from string.
console.log(numsCopy);
console.log(charArray);
let concated = [...nums, ..."hello!"]; //another use.
console.log(concated);

//spread with object literals
let newObj = {
    name: "hell",
    purpose: "place"
}
let newObjCopy = {...newObj};
console.log(newObjCopy);
newObjCopy = {...newObj, passed: true};
console.log(newObjCopy);
nums = [5,33,46,34,63,672,35,3,6];
let objFromArray = {...nums};//{0: 5, 1: 33, 2: 46, 3: 34, 4: 63, 5: 672, 6: 35, 7: 3, 8: 6} can also be used for strings

//Rest operator : it allows a function to take indefinite number of arguments.
function addAll(...nums){ //takes all arguments passed from calling function and bundle them into an array.
    return nums.reduce((res, el) => res + el,0);
}
console.log(addAll(4,4,5,3,5));
console.log(addAll(4,24,45,3,5,6,8,6));
console.log(addAll(4,2));
function add2(num1, ...nums){//it will save first argument in num1 and all other in nums array.we can only use starting arguments to store separately.
    console.log(num1);
    return nums.reduce((res, el) => res + el, 0);
}

//arguments inside function
function any(){
    console.log(arguments);// here argument is not a array(i.e. we can not use array methods) but it is a collection.
}

//destructuring : storing value of array into different variables.
let nameList = ["ram", "shyam", "sita", "gita"];
let [winner, runnerup] = nameList;
console.log(winner);
console.log(runnerup);
let [name1, name2, ...otherNames]= nameList;
console.log(otherNames);//['sita', 'gita']

//destructuring in objects
const stu = {
    name: "ram",
    class: "fourth",
    rollno: 88,
    username: "ramram",
    password: "ram123"
}

let {username, rollno: newVariable, password : pass = "default value if password key does not exist in stu"} = stu; //search for the key in the object and saves it's value.
console.log(username, newVariable, pass);//ramram 88 ram123

