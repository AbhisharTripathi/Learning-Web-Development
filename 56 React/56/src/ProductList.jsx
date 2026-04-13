import AmazonProduct from "./AmazonProduct.jsx";

export default function ProcuctList() {
    return (
        <div style={{backgroundColor: "white", color: "black"}}>
            <h3>Blockbuster Deals</h3>
            <AmazonProduct title="Logitech MS master 3S" descriptions={["8,000 DPI", "5 Programmable Buttons"]} oldPrice={12495} newPrice={8999} />
            <AmazonProduct title="Apple Pencil (2nd gen)" descriptions={["Intuitive Touch surface", "Designed for iPad Pro"]} oldPrice={11900} newPrice={9199} />
            <AmazonProduct title="Logitech MS master 3S" descriptions={["8,000 DPI", "5 Programmable Buttons"]} oldPrice={12495} newPrice={8999} />
        </div>
    );
}