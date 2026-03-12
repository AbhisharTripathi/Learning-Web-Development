/*
let myObj = {
    name: "ram",
    age: "bahutJyada",
    kam: "nothing",
    bata() {
        console.log(`${this.name}'s age is ${this.age} and he does ${this.kam}.`);
    }
}

myObj.bata();

console.log(this);

//try and catch
try {
    console.log(a);
}
catch(err) {
    console.log("this statement is under catch block.");
    console.log(err);
}
console.log("I am statement after the catch block.");

//arrow function.
const sum = (a, b) => {
    let s = a + b;
    console.log(a + b);
    return s;
};
sum(1,3);

let isAdult = x => { //we can ignore parenthesis if there is only one argument.
    return x >= 18;
};
console.log(isAdult(18));

let sub = (a, b) => a - b;// or(a-b) //it has implicit return and we use only one statement inside () or ignore it, rather than {}.
console.log(sub(5,3));

let hello = () => ("hello doston swagat hai apka."); //we have to write () if there is no arguments.
console.log(hello());

//setTimeout.
setTimeout( () => {
    console.log("this is log function inside callback of setTimeout i will get executed after 3000ms");
}, 3000);
console.log("I am statement after the setTimeout function.");//it will get executed before the setTimeout callback function.

//setInterval.
let id = setInterval(func, 2000);
function func() {
    console.log("Hello I am inside the callback function of setInterval. i will get executed after every 2000ms");
}

console.log("I am after the setInterval.");

let id2 = setTimeout( () => {
    clearInterval(id);
}, 6000);

setTimeout( () => {
    clearTimeout(id2);
}, 6000);
*/

//this in normal and arrow function.
let obbj = {
    name: "sita",
    age: "kuch to hogi",
    this: this, //window
    getName() {
        console.log(this); //obbj
        console.log(this.name);
    },
    getAge : () => {
        console.log(this); //window
        console.log(this.age);
    },
    getName2() {
        setTimeout(function() {
            console.log(this); //window
            console.log(this.name);
        }, 2000);
    },
    getAge2() {
        setTimeout( () => {
            console.log(this); //obbj
            console.log(this.age);
        }, 2000);
    }
}

console.log(obbj.this);
obbj.getName();
obbj.getAge();
obbj.getName2();
obbj.getAge2();

