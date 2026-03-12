let h1 = document.querySelector("h1");
function changeColor(color, delay, nextChangeColor) {
    setTimeout(()=>{
        h1.style.color = color;
        if (nextChangeColor) nextChangeColor();       
    }, delay);
}

//callback nesting known as callback hell.
// changeColor("orange", 1000, ()=>{
//     changeColor("red", 1000, ()=> {
//         changeColor("green", 1000, () => {
//             changeColor("blue", 1000);
//         });
//     });
// });


/*
function saveToDB(data, resolve, reject) {
    let internetSpeed = Math.floor(Math.random() * 10 + 1);
    if(internetSpeed > 4) {
        console.log(data);
        resolve(data);
    }
    else reject(internetSpeed);
}

saveToDB("1Hello!", (d) => {
    console.log("fulfilled :", d);
    saveToDB("2Hii..", () =>{
        console.log("2fulfilled");
        saveToDB("3Salam Walekum", () => {
            console.log("3fulfilled");
        }, () => {
            console.log("3rejected");
        })
    }, () => {
        console.log("2rejected");
    })
}, (is) =>{
    console.log("rejected :", is);
}); 
*/
//The above code is an example of callback hell. We are going to optimize it using promises.

//promise : The promise object represents the actual completion or rejection of an asynchronous operation and it's resulting value, its constructor takes a callback with two arguments(resolve, reject). There could be multiple(3) states of a promise : pending(if resolve or reject is not executed), fulfilled(if resolve is executed) and rejected(if reject is executed).
function saveToDBUsingPromise(data) {
    return new Promise((resolve, reject) => { 
        let internetSpeed = Math.floor(Math.random() * 10 + 1);
        if(internetSpeed > 7) resolve(data);//shown in PromiseResult and can be accessed using argument in then()
        else if(internetSpeed > 4) {
            console.log("I guess it went to pending.", internetSpeed," ", data);
        }
        else { 
            reject(`${internetSpeed} : ${data} `); //it is shown in error and PromiseResult and can be accessed using argument in catch()
        }
    });
}

// let request = saveToDBUsingPromise("Informations send using saveToDBUsingPromise"); //request is promise object.
// console.log(request);
/*
request
    .then(() => {
        console.log("Got success, status is fulfilled.");
    })
    .catch((err) => {
        console.log("this is the error: ",err);
    })
*/

//we can write the above code in compact form as wrtten below :-
// saveToDBUsingPromise("promise pura karo")
//     .then(() => {
//         console.log("Got success, status is fulfilled.");
//     })
//     .catch((err) => {
//         console.log("this is the error: ",err);
//     });


/*
//promise chaining
saveToDBUsingPromise("Data 1") //if it went to pending state neither then() nor catch() will execute it's callback.
    .then(() => {
        console.log("Data 1 saved!");       //if any code written inside then() generate an error it will be catched by the catch()
        return saveToDBUsingPromise("Data 2");
    })
    .then(() => {
        console.log("Data 2 saved.");
        return saveToDBUsingPromise("Data 3");
    })
    .then(() => {
        console.log("Data 3 saved!");
    })
    .catch((err) => {
        console.log("Saving failed!", err);
    });
*/


function changeColorUsingPromise(color, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            h1.style.color = color;
            resolve(`Color changed to ${color}`); //shown in PromiseResult and can be accessed using argument in then()
             console.log("statement after resolve.");//This will also get executed.
        }, delay);
    });
}

changeColorUsingPromise("red", 1000)
    .then((result) => {
        console.log(result);
        return changeColorUsingPromise("yellow", 1000);
    })
    .then((result) => {
        console.log(result);
        return changeColorUsingPromise("green", 1000);
    })
    .then((result) => {
        console.log(result);
        console.log("All color change is completed.");
    })
    .catch((err) => {
        console.log("I know this will never get executed because no error can be generated.", err);
    });



/* random gyan :-
you cannot pass arguments in the callback of setTimeout() or setInerval() because they accept function values and no one calls this function.
but you can pass arguments to callback function where you call these functions explicitly using your code.
*/