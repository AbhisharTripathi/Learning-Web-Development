//axios : it is a library used to send http request.

let url = "https://catfact.ninja/fact";
async function getFact() {
    try {
        let response = await axios.get(url);
        return response.data.fact;//This getFact() is a async function so it will return a promise object with response.data.fact value as PromiseResult.
    }
    catch(err) {
        console.log("Error is :", err);
    }
}

let btn = document.querySelector("#cat");
btn.addEventListener("click", async () => {
    let p = document.querySelector("p");
    let fact = await getFact();
    p.innerText = fact;
});

//Passing headers with the api call using axios.
let url2 = "https://icanhazdadjoke.com";
let config = {headers: {Accept: "application/json"}};//This is how we create a object which can be passed as an argument in axios.get() to pass the header.
async function getJokes() {
    let response = await axios.get(url, config);
    console.log(response.data); //response.data gives a JS object, it is what we get back from response.json()'s PromiseResult.
}
// getJokes();

//Updating query string
let url3 = "https://universities.hipolabs.com/search?name=";//we can also use `${}`

async function getUniversities(country) {
    try {
        let response = axios.get(url3 + country);
        return response.data;//it will be a array of objects of all colleges.
    }
    catch(err) {
        console.log("Error is :", err);
    }
}

let btn2 = document.querySelector("#college");
btn2.addEventListener("click", async () => {
    let inpVal = document.querySelector("input").value;
    let colArray = await getUniversities(inpVal);
    let list = document.querySelector("ul");
    list.innerText = "";
    for(col of colArray) {//iterate over all the objects of college present in the array.
        let li = document.createElement("li");
        li.innerText = `${col.name} in ${col["state-province"]}`;//check if it will work or not as state-province contain a - between the words.
        list.appendChild(li);
    }
});
