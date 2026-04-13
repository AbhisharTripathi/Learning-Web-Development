import "./Product.css"

function Product({title, price = 20000}) {
    let name = "Dashrath";
    let isDiscount = price > 15000;
    let styles = {backgroundColor: isDiscount ? "green" : null, borderColor: "red"};
    return (
        // the className of root element should be same as component name.
        <div className="Product dark" style={styles}> 
        <h3>{title}</h3>
        <p>Price : {price}</p>
        { isDiscount ? <p>Discount of 5%</p> : null}
        {/* this line will also do the same thing. */}
        {/* {price > 1500 && <p>Discount of 5%</p>} */}
        <p>Hello {name} I am the paragraph.</p>
        </div>
    )
}

export default Product;