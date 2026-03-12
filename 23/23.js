function sayHello(){
    alert("hello ji how are you");
}

function like() {
    alert("You likes this post");
}

function touch() {
    console.log("You touched this button");
}

let btns = document.querySelectorAll(".likebtn");

for(btn of btns) {
    btn.onclick = like; //we assign the value of function i.e. without parenthesis().
    btn.onclick = sayHello; //only one function can be assigned to this type of event. 
    btn.onmouseenter = touch;

    btn.addEventListener("click", () =>{ //takes two arguments first is event and second is callback.
        console.log("first event listener Callback");
    });
    btn.addEventListener("click", () =>{ //we can assign as many function as we want to a single event unlike the (onclick, onmouseenter etc.)
        console.log("second event listener Callback");
    });
};

//this : When this is used in the callback of event handler of something, it refers to that something.
function help(){
    alert(`${this} calling for help`);
    console.log(`content of ${this} is ${this.innerText}`);
}

let h2 = document.querySelector("h2");
let p = document.querySelector("p");

h2.addEventListener("click", help);
p.addEventListener("click", help);

//Default argument in callback of addEventListener() is event object .
let inp = document.querySelector("input");
inp.addEventListener("keydown", function(ev) { //keybord event : keydown, keyup, keypress
    console.log(`${ev.type} event is fired.`);//keydown
    console.dir(`Key is ${ev.key} and Code is ${ev.code}`);//key gives the key that is pressed e.g(" ", "k", "K") it respects the case of letter.
    //code gives the code of the key that is pressed.
});

//Form events
let form = document.querySelector("form");
form.addEventListener("submit", function(ev) {
    ev.preventDefault(); //prevents the defualt action performed when this event is fired.
    alert("Form is submitted.");

    alert(`Hii ${this.elements[0].value} your password is set to ${this.elements[1].value}`);//value is used to access the value inside the input tag at that time.
});

let inp2 = document.querySelector("#inp2");
inp2.addEventListener("change", function(ev) {//change event is fired when the final value is different from the initial value. only works on input, textarea and select.
    console.log("New value is ", this.value, "Event : ",ev.type); 
});

inp2.addEventListener("input", function(ev) {//input event is fired when the value is change even inermediate change can fire it. only works on input, textarea and select.
    console.log("New value is ", this.value, "Event : ", ev.type);
});



