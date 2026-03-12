/*
async function greet() {
    setTimeout(() => {
        return "hello";
    }, 3000);
}

function greet2() {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve("hello2");
        }, 2000);
    });
}

let res = await greet();
console.log("result 1 is ", res);

let res2 = await greet2();
console.log("result 2 is ",res2);
console.log("result 1 is ", res);

//in case of greet1() async function will complete its execution and also return undefined as it's return statement is inside setTimeout function it will executer later and by that time line 17 gets executed as await get's the result as undefined. But in the case of greet2() await will wait until resolve is executed inside greet2(). This means either we should return an explicit Promise object or call a async function inside the async function to make it practically work like async function.
// result 1 is  undefined
// result 2 is  hello2
// result 1 is  undefined
*/

/*
hello()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

console.log('I am a line after the hello() function call which  itself called a await function');//this line will get printed first because it will not wait for the above function to complete the execution of the greet() function which is await. it means the await keyword is only able to stop execution of the lines present in the same function after it. if await is inside a hello() function then code will not wait for the execution of the hello() function to execute other statement present after hello() function only the statements inside the hello() function after the await greet() will wait for fulfilled status of the promise returned by greet().

async function hello() {
    return await greet();
}

function greet() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("I am a line inside the setTimeout function of greet()");
            resolve("The promise is fulfiled");
        }, 2000);
    });
}

D:\MineT\mineWD\zzZCheckZzz>node index.js
I am a line after the hello() function call which  itself called a await function
I am a line inside the setTimeout function of greet()
The promise is fulfiled
*/