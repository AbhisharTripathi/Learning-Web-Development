import "./AmazonProduct.css";

export default function AmazonProduct({title , descriptions, oldPrice, newPrice}) {
    return (
        <div className="AmazonProduct">
            <h4>{title}</h4>
            <ul>
                {descriptions.map(description => <li>{description}</li>)}
            </ul>
            <div className="price">
                <sup>$</sup><span style={{textDecorationLine: "line-through"}} >{oldPrice.toLocaleString("en-IN")}</span>
                &nbsp;&nbsp;<sup>$</sup><span style={{fontWeight: "bold"}}>{newPrice.toLocaleString("en-IN")}</span>
            </div>
        </div>
    );
}