import "./App.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {

  let handleClick = () => {
    console.log("Button was clicked.");
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClick} color="error" startIcon={<DeleteIcon/>}>Click</Button>
      <Button variant="outlined" onClick={handleClick} color="error" disabled>Click</Button>
    </div>
  )
}

export default App
