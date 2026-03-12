/*
function hello(str) {
    console.log("Hello", str, "Welcome !");
    return true;
}

let inp = prompt("Enter your name.");
let bool = hello(inp);
console.log(bool);

let ar = ["ram", "shyam", "sita"];
console.log(concat(ar)); //the function is written after it is called but works due to hoisting.

function concat(arr) {
    let res = "";
    for(let i = 0; i < arr.length; i++) {
        res += arr[i];
    }
    return res;
}
*/

function outerFunc() {
    let x = 7;
    let y = 8;
    innerFunc();
    function innerFunc() { //this function can only be accessed inside outerFunc.
        console.log(x);
    }
    
}

//theree types of scope 1.Functional scope.  2.Global scope.  3.Lexical scope.

//Functional expression.

let sub = function(a, b) { //hoisting does not work with these function.
    return a - b;
}

// console.log(sub(3,5));

//function inside a object is known as method.
let obj = {
    nam: "ram",
    kam: "berojgar",
    batao: function(x) { //to use this function write obj.batao(56);
        console.log(obj.nam);
        console.log(x);
    },

    jaldibatao(){
        console.log("This is a shorthand to define a method inside a object.");
    }
}

function greet() {  //we can use functional expression type of functional declararion.
    console.log("hii!");
}

//this is a higher order function because it takes one or more function as arguments or return a function.
//the function that is passed as arguments are known as callback function.
function multi(func, count) {
    for(let i = 0; i < count; i++) {
        func();
    }
}

multi(greet, 5);

//higher order function that returns a function.
function creatorOfFunction(request) {
    if(request == "even") {
        return function(num){
            return (num % 2 == 0);
        }
    }
    if(request == "odd") {
        return function(num) {
            return (num % 2 != 0);
        }
    }
}

let createFunc = creatorOfFunction("even");
console.log(createFunc(5));