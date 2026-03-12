//object prototype: Prototypes are the mechanism by which JavaScript objects inherit features from one another. It is like a single template object that all objects inherit methods and properties from without having their own copy.
//Every object in JavaScript has a built in property, which is called it's prototype. The prototype is itself an object so the prototype will have it's own prototype making what's called a prototype chain. The chain ends when we reach a prototype that has null for it's prototype.
let arr = [1,2,3];
console.log(arr.__proto__);//this will give the refernce of the prototype of array.
arr.__proto__.push = (n) => {console.log("Pushing number : ", n)};//This will change the definition of the push function for all the arrays as you are changing the prototype. This way you can also add new function into the prototype.
delete arr.__proto__.pop;//this will delete the pop function from the prototype.

console.log(Array.prototype);//this is actual object of array prototype. Above one was the reference.
console.log(String.prototype);//this is actual object of string prototype.

//factory function :-
function PersonMaker(name, age){
    const person = {
        name: name,
        age: age,
        talk() {
            console.log(`Hi my name is ${this.name}`);
        }
    }
    return person;
}

let p1 = PersonMaker("Ram", 79);
let p2 = PersonMaker("Sita", 57);
//factory function will create copy of all the function that exist in the factory even if the indivisual person share the same function.

//constructor :- Doesn't return anything & Starts with capital letter
function Person1(name, age) {
    this.name = name;
    this.age = age;
}
Person1.prototype.talk = function() {
    console.log(`Hi, my name is ${this.name}`);
}
//the new operator lets create an instance of a user-defined object type or of one of the buult-in object types that has a constructor function.
/*
new keyword will create a newinstance (empty object).
it will assign the [[prototype]] value as Person.prototype.
it will make the function treat this as the newinstance.
it will return the newinstance if the constructor function doesn't return anything.
*/
let p3 = new Person1("Ravan", 89);
let p4 = new Person1("Mandodari", 46);

//Classes :- Classes are templates for creating objects. The constructor method is a special method of a class for creating and initializing new object instance of that class.
class Student1 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    talk() {
        console.log(`Hi my name is ${this.name}.`);
    }
}

// let s1 = new Student1("Luv", 23);
// let s2 = new Student1("Kush", 22);

//Inheritance :- It is a mechanism that allows us to create new classes on the basis of already existing classes.
class Person {
    constructor(name, age) {
        console.log("Person class constructor");
        this.name = name;
        this.age = age;
    }
    sit() {
        console.log(`${this.name} is sitting.`);
    }
}

class Student extends Person {
    constructor(name, age, marks) {
        console.log("Student class constructor");//First child constructor is called then super() will call the parent constructor.
        super(name, age);//parent class constructor is being called.
        this.marks = marks;
    }
    greet() {
        console.log("Hello Teacher");
    }

    //Method overridding
    sit() {//It will execute if we call using Student object instead of Person's sit implementation.
        console.log("Student is sitting.");
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);//parent class constructor is being called.
        this.subject = subject;
    }
    greet() {
        console.log("Hello Students");
    }
}





