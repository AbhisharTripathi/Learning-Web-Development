let div1 = document.querySelector('#div1');
let ul1 = document.querySelector('#div1 ul');
let lis1 = document.querySelectorAll('#div1 li');

function click(event) {
    console.log(this.localName, " was clicked.");//local name gives the name of the element.
}

div1.addEventListener("click", click);
ul1.addEventListener("click", click);
for(li of lis1){
    li.addEventListener("click", click);
}
/*
In the above example if you click on the div then callback of div is fired.
if you click on the ul callback of ul and div is fired. it means callback of parent is also fired.
if you click on the li callback of li, ul and div is fired. It means callback of all it's ancestors is fired.
This is known as event bubbling.
*/

//To stop event bubbling we use the method known as stopPropagation of event.
let div2 = document.querySelector('#div2');
let ul2 = document.querySelector('#div2 ul');
let lis2 = document.querySelectorAll('#div2 li');

function click2(event) {
    console.log(this.localName, " was clicked.");
    event.stopPropagation();//it will stop the event bubbling.
}
div2.addEventListener("click", click2);
ul2.addEventListener("click", click2);
for(li of lis2){
    li.addEventListener("click", click2);
}


//Event delegation is explained in todo.html

