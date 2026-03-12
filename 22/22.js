// console.log(document);
// console.dir(document);//use to print document type of object.
// console.dir(86868);
// console.dir(document.all);//gives all element inside the document.
// let arr = ["Hello", "Namaste", "Swadeka", "Sasreyakal", "SalamWalekum"];
// let i = 0;
// let id1 = setInterval(()=>{
//     document.all[8].innerText=arr[i];
//     i = (i+1) % arr.length;
//     console.log(i);
// },3000);
// setTimeout(()=>{clearInterval(id1)},1000);

let mainTitle = document.getElementById("main-title");//return the object with id.
console.dir(mainTitle);
let elementSet = document.getElementsByClassName('card');//return the collection of all the elements with class name card, in none present returns a empty collection.
console.dir(elementSet);

let allLinks =  document.getElementsByTagName("a");
for(let i = 0; i < allLinks.length; i++) {
    console.dir(allLinks[i]);
}

let firstPTag = document.querySelector("p");
let allPTag = document.querySelectorAll("p");

console.log(firstPTag.innerText);//Takes the text from the screen
console.log(firstPTag.innerHTML);//Takes all the html markup 
console.log(firstPTag.textContent);//Takes the text content from the html document (how you have written the html document).

let firstH1Tag = document.querySelector("h1");
let id = firstH1Tag.getAttribute("id");
console.log(id); //main-title
firstH1Tag.setAttribute("id","newId");
id = firstH1Tag.getAttribute("id");
console.log(id); //newId

// style : property can only be used to access and manipulate inline css. external css or internal css can not be accessed or manipulated.
console.dir(firstH1Tag.style);
firstH1Tag.style.backgroundColor = "green";

//classList : property is used to get the list of all the classes of that element.
console.log(firstH1Tag.classList);
/*
four methods in classList:-
1. add("className") : to add a class in the element.
2. remove("className") : to remove a class in the element.
3. contains("className") : returns true if class is present otherwise false.
4. toggle("className") : if class is present remove it and return false , if class is not present add it and return true.
*/

/*
Navigation: used to navigate dom tree
1. parentElement : return the parent object of the element.
2. childElementCount: return the number of children.
3. children : return a collection of all the children. 
4. previousElementSibling : return the previous sibling element if present or return null.
5. nextElementSibling : return the next sibling element  if present or return null.
*/
let el = document.querySelector("header");
console.dir(el.children); //HTMLCollection(2)

//adding new elements in the document.
let newElement = document.createElement("p");
newElement.innerHTML = "<h3>This is a h3<h3><p>I am a paragraph inside the newly created paragraph. </p>";
let header = document.querySelector("header");
header.appendChild(newElement); //append the element as a child of header.
header.append("we can append anytext or object using this append <h1>hello i am h1</h1>");
header.prepend("this will add anytext or object in the starting of the element.<h1>hello i am h1</h1>&lt;h1&gt;Hello  i am h1 written using entity.&lt;&slash;h1&gt;");
let hello = document.createElement("h4");
hello.innerHTML= "this is the new texxt <br>";
header.prepend(hello);

/*
insertAdjacentElement(position, element)
Four position :-
1. beforebegin : before the calling object as sibling.
2. afterbegin : inside the calling object but in the starting as child.
3. beforeend : inside the calling object but in the end as child.
4. afterend : just after the calling object as sibling.
*/
let btn = document.createElement("button");
btn.innerText = "Click me !";
//header.insertAdjacentElement("beforebegin", btn);
//header.insertAdjacentElement("afterbegin", btn);
// header.insertAdjacentElement("beforeend", btn);
header.insertAdjacentElement("afterend", btn);

//removing existing element from the document.
header.removeChild(hello);//remove the child of the object you passed as argument.
header.remove(); //removes the element from the document.

