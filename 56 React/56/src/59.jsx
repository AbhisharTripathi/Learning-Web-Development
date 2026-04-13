import { useState } from "react";
import "./59.css"
import { v4 as uuid} from "uuid";

function LudoBoard() {

    let [moves, setMoves] = useState({green: 0, red: 0, yellow: 0, blue: 0});
    function updateMoves(event) {
        let currColor = event.target.style.backgroundColor;
        setMoves((currMoves) => {
            return {...currMoves, [currColor]: currMoves[currColor] + 1}; //in setMoves we pass a new object using spread operator(...) to make react realize that the state variable is changed, we do the same thing for arrays too.
        });
    }

    return (
        <div className="ludoBoard">
            <h1>LUDO</h1>
            <div>
                <p>Green = {moves.green}</p>
                <button style={{backgroundColor: "green"}} onClick={updateMoves}>+1</button>
            </div>
            <div>
                <p>Red = {moves.red}</p>
                <button style={{backgroundColor: "red"}} onClick={updateMoves}>+1</button>
            </div>
            <div>
                <p>Yellow = {moves.yellow}</p>
                <button style={{backgroundColor: "yellow"}} onClick={updateMoves}>+1</button>
            </div>
            <div>
                <p>Blue = {moves.blue}</p>
                <button style={{backgroundColor: "blue"}} onClick={updateMoves}>+1</button>
            </div>
        </div>
    );
}

function Todo() {

    let [tasks, setTasks] = useState([]);
    let [newTask, setNewTask] = useState("");

    /*
    function addTask(event) {
        if(event.target.previousElementSibling.value == "") return;
        setTasks((currTasks) => { //when you write callback inside the set* function, the next lines of code after this function can execute before it's execution.
            console.log(event.target.previousElementSibling.value);
            return [...currTasks, event.target.previousElementSibling.value];
        });
        event.target.previousElementSibling.value = "";
    }
    */

    function addTask() {
        if(newTask == "") return;
        setTasks((existingTasks) => ([...existingTasks, {id: uuid(), task: newTask, isDone: false}]));
        setNewTask("");
    }

    function updateNewTask(event) {
        setNewTask(event.target.value);
    }

    function delTask(id) {
        setTasks((existingTasks) => {
            return existingTasks.filter(el => el.id != id)
        });
    }

    function upperCase(id) {
        setTasks((existingTasks) => {
            return existingTasks.map((taskObj) => {
                if(taskObj.id == id) {
                    return {
                        ...taskObj,
                        task: taskObj.task.toUpperCase()
                    };
                };
                return taskObj;
            });
        });
    }

    function markDone(id) {
        setTasks((existingTasks) => {
            return existingTasks.map(taskObj => {
                if(taskObj.id == id) {
                    return {
                        ...taskObj,
                        isDone: !taskObj.isDone
                    }
                };
                return taskObj;
            });
        });
    }

    return (
        <div className="todo">
            <h2>Todo App</h2>
            <input type="text" onChange={updateNewTask} value={newTask} />&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={addTask}>Add</button>
            <hr/>
            <ul>
                {tasks.map(el => {
                    return (
                        <li key={el.id} >
                            <span style={{textDecorationLine: el.isDone ? "line-through" : "none"}}>{el.task}</span>
                            <button onClick={() => delTask(el.id)} >Delete</button>
                            <button onClick={() => upperCase(el.id)} >Upper case</button>
                            <button onClick={() => markDone(el.id)} >Done</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export { LudoBoard, Todo };