import { useState } from "react";

export default function CommentsForm() {

    let [formData, setFormData] = useState({
        username: "",
        remark: "",
        rating: ""
    });

    let handleInputChange = (event) => {
        setFormData((currData) => {
            return {
                ...currData,
                [event.target.name]: event.target.value
            };
        });
    }

    let handleSubmit = (event) => {
        console.log(formData);
        event.preventDefault();
        setFormData({
            username: "",
            remark: "",
            rating: ""
        });
    }

    return (
        <div>
            <h2>Give your Opinion.</h2>
            <form onSubmit={handleSubmit} style={{display: "flex", alignItems: "center", justifyContent: "space-evenly", margin: "2rem"}}>
                <label htmlFor="username">Username :</label>
                <input type="text" placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} id="username"/>
                <br />
                <label htmlFor="remark">Remark :</label>
                <textarea placeholder="Write your opinion here." name="remark" value={formData.remark} onChange={handleInputChange} id="remark"/>
                <br />
                <label htmlFor="rating">Rating :</label>
                <input type="number" placeholder="Rating" min={1} max={5} name="review" value={formData.review} onChange={handleInputChange}id="rating" />
                <br />
                <button>Add review</button>
            </form>
        </div>
    );
}