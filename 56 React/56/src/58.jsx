import {useState} from "react";

function Button1() {
    return (
        <div>
            <button onClick={printHello}>Click me!</button>
            <p onMouseOver={printBye}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime modi sit rem consequatur repudiandae minus debitis ab, exercitationem nulla aspernatur voluptate nam beatae tenetur, voluptatum animi hic magnam maiores aut. Voluptas, facere? Accusamus, consequatur!</p>
            <button onDoubleClick={handleBblClick}>Click me twice</button>
        </div>
    )
}

function printHello(event) {
    console.log("hello");
    console.log(event.target);
}

function printBye() {
    console.log("bye");
}

function handleBblClick() {
    console.log("you double clicked me!");
}

function Counter() {
    const [count, setCount] = useState(0);
    //const [count, setCount] = useState(initFunc); we can also pass a function without parnthesis which returns a inital value for the state, if we pass the function with the parentheses then the function will execute every time the component is rendered but the initial state value will not change.
    console.log("rerendered.");
    function incCount() {
        /*
        setCount(count + 2);
        setCount(count + 1); //the last setCount will be accountable to change the value.
        */

        // setCount((currCount) => currCount + 1); //callback is used when the new value depends upon the older value of the state variable.
        // setCount((currCount2) => currCount2 + 1);

        setCount(5);
    }
    
    return <button onClick={incCount} style={{height: "3rem", width: "5rem", margin: "1rem auto"}}>Count = {count}</button>;
}

export {Button1, Counter};