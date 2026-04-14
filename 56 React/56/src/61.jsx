import "./61.css";
import { useState } from "react";

function Form() {

    // let [fullName, setFullName] = useState("");
    // let handleNameChange = (event) => {
    //     setFullName(event.target.value);
    // }

    let [formData, setFormData] = useState({
        fullName: "",
        username: "",
    });

    let handleInputChange = (event) => {
        let fieldName = event.target.name;
        let newValue = event.target.value;
        setFormData((currData) => {
            return {
                ...currData,
                [fieldName]: newValue
            };
        });
    };

    let handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name: </label>
            <input id="fullName" type="text" value={formData.fullName} onChange={handleInputChange} name="fullName" />
            <button>Submit</button>
        </form>
    )
}

export { Form };