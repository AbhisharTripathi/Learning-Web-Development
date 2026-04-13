import { useState } from "react";
import "./60.css";
import { getRandomNumbers, sum } from "./lotteryHelper";

function Lottery() {
    let [ticket, setTicket] = useState([]);

    function newGame() {
        setTicket(getRandomNumbers(3));
    }

    let isWinning = sum(ticket) === 15;
    
    return (
        <div className="lottery">
            <h2>Lottery Game</h2>
            <div className="ticket">
                {ticket.map(el => <span>{el}</span>)}
            </div>
            <div className="play"><button onClick={newGame}>Play</button></div>
            <h2>{isWinning ? "Congratulation! you won." : "Better luck next time."}</h2>
        </div>
    )
}

export {Lottery};