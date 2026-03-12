let name1 = "World";
console.log("Hello", name1, "!");
console.log("Hello again!");

/*
console.warn("This is a warning using console.warn()");
console.error("This is an error using console.error()");

alert("This is an alert!. using alert()");
let name2 = prompt("Used prompt() for this.!! Enter your Name");

// string methods:-
console.log("split() Method :-");
let date = "12:23:23";
let dateArr = date.split(":");//it will return a array of strings and each element is extracted from date by splitting it using delimitter : passed as argument in string format.
console.log("Seconds = ", dateArr[2]);

console.log("trim() Method :-");
let str = "   Hello World   ";
console.log(str);
let str2 = str.trim(); //tirm the spaces in the begining and the ending not in the middle.
console.log(str2);

console.log("toUpperCase() and toLowerCase() Method :-");
let str3 = str2.toUpperCase();
console.log(str3);
let str4 = str3.toLowerCase();
console.log(str4);

console.log("indexOf() Method :-");
let str5 = "JavaScript";
console.log("String is :", str5);
let index1 = str5.indexOf('J'); //Returns the first index of the occurence of letter J if found otherwise returns -1.
console.log("Index of J is :", index1);
let index2 = str5.indexOf("Script");
console.log("Index of Script is :", index2);
let index3 = str5.indexOf("a");
console.log("Index of a is :", index3);
console.log("Index of x is :", str5.indexOf("x"));

console.log(str5.indexOf("script"));
console.log(str5.toLowerCase().indexOf("script")); //Method chaining 

console.log("slice() Method :-");
console.log("String is :", str5);
console.log(str5.slice()) // returns a copy of the original string.
let str6 = str5.slice(0,4); //returns a string from index 0(including) to 4(not including).
console.log(str6);
console.log(str5.slice(4));
console.log(str5.slice(-6)); //we can also give negative values for giving index from the back side. -1 for last letter .

console.log("replace() Method :-");
console.log(str5.replace("java", "type"));
console.log(str5.replace("Java", "Type"));

console.log("repeat() Method :-");
console.log(str5*3); //gives NaN as result.
console.log(str5.repeat(3));

// Array :-
let arr = [];
let arr2 = [1, 2, 3, "Ram", "Sita", 0, 7]; //heterogeneous
console.log(arr2);
let fruits = ["mango", "apple", "litchi"];
console.log(fruits);
fruits[1]= "banana";
console.log(fruits);
fruits[10] = "papaya";
console.log(fruits);

let roles = ["Ram", "Sita", "Ravan"];
console.log(roles);

roles.push("Lakshaman"); //add element in the last of array and returns the length of the array.
console.log("Pushed role is :", roles.push("Bharat"));
console.log(roles);

let lastRole = roles.pop(); //delete and returns the last element of the array.
console.log("Popped role is :", lastRole);
console.log(roles);

roles.unshift("Dashrath");
console.log(roles.unshift("Kaikae")); //add element in the begining of the array and returns the size of the array.
console.log(roles);

console.log(roles.shift()); //delete and returns the first element of the array.
console.log(roles);

//indexOf() is also available for arrays.
console.log("Index of ravan is : ", roles.indexOf("ravan")); 
console.log("Index of Ravan is : ", roles.indexOf("Ravan"));

//includes() for arrays.
console.log("sita is present in roles", roles.includes("sita")); //returns true or false
console.log("Sita is present in roles", roles.includes("Sita"));

//concat() for arrays.
let weapons = ["Sword", "Katana", "Bow", "M416"];
let required = roles.concat(weapons);//returns a new array with roles element at first and then weapons element.
console.log("Roles are :", roles);
console.log("Weapons are :", weapons);
console.log("Required are :", required);

//reverse() for arrays.
console.log(weapons);
weapons.reverse(); 
console.log(weapons);

//slice() for arrays is exactly similar to slice() method in strings. return the copy of that part of the array.
console.log(roles);
console.log(roles.slice());
console.log(roles.slice(2)); 
console.log(roles.slice(1,4));
console.log(roles.slice(-4));

//splice() for arrays. arr.splice(start_index, how_many_chars_to_delete, elements_to_add,,) also works with original array and returns the deleted elements.
let colors = ["Violet", "Indigo", "Blue", "Green","Yellow", "Orange", "Red"];
console.log(colors); // ['Violet', 'Indigo', 'Blue', 'Green', 'Yellow', 'Orange', 'Red']
console.log(colors.splice(4)); //['Yellow', 'Orange', 'Red']
console.log(colors); //['Violet', 'Indigo', 'Blue', 'Green']
console.log(colors.splice(1,2)); //['Indigo', 'Blue']
console.log(colors); //['Violet', 'Green']
console.log(colors.splice(1, 0, "White", "Black", "Grey")); //[]
console.log(colors); //['Violet', 'White', 'Black', 'Grey', 'Green']
console.log(colors.splice(2, 2, "Purple", "Pink")); //['Black', 'Grey']
console.log(colors); //['Violet', 'White', 'Purple', 'Pink', 'Green']

// sort() in arrays. 
console.log(colors);
colors.sort();
console.log(colors);
let nums = [23, 89, 10, 100, 1000, 210, 22];
console.log(nums);
nums.sort(); //it first converts the elements of the array into string then perform the sorting. that's why not good for sorting numbers.
console.log(nums);

//Array references :-
let arra = ["ram", "shyam"];
let copyArra = arra; //it saves the reference of arra in copyArra i.e. any change in arra will reflect in copyArra copyArra is alias of arra
console.log("array :", arra, "and copyArray :", copyArra);
copyArra.push("ravan");
console.log("array :", arra, "and copyArray :", copyArra);
copyArra = arra.slice(); //it will not work for nested array.
console.log("array :", arra, "and copyArray :", copyArra);
copyArra.push("meghnath");
console.log("array :", arra, "and copyArray :", copyArra);
*/

//Constant arrays :-
const marks = [34, 45, 56, 68];
marks.push(99); //it will work
console.log(marks);
//marks = [3,4]; // it will give us error as marks is a constant array.
