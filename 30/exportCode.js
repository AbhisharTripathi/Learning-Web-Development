/*
const sum = (a, b) => (a + b);
let mul = (a, b) => (a * b);
const PI = 3.14;

//module.exports = it is a object which contains all the info that this file wants to export.
//methods to assign value to module.exports object.
//1. create a separate object
let obj = {
    sum: sum,
    mul: mul,
    PI: PI
};
module.exports = obj;

//2. pass value directly 
/*module.exports = {
    sum : sum,
    mul: mul,
    PI: PI
    };
*/
/*
//3. creating new members of object.
module.exports.div = (a, b) => (a / b);
module.exports.g = 9,8;
exports.e = 2.2222; //we can also ommit module if we use esports as object. i.e. exports = 7 will not give required result.
*/

//WE can either use module.exports or export, strictly followed
export const k = 99;
export const hello = () => ("hello world!");
export const a = 1;
export const fun = () => ("funny!");