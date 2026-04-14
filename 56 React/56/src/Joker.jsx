import { useState, useEffect} from "react";

export default function Joker() {
    let [joke, setJoke] = useState({});
    
    const URL = "https://official-joke-api.appspot.com/random_joke";
    
    let getJoke = async () => {
        let response = await fetch(URL);
        let jsonResponse = await response.json();
        setJoke(jsonResponse);
    }

    useEffect(() => {
        getJoke();
    }, []); //use [] for only first time execution , [state_variable_name, ...] for execution when these variable changes and leave it to execute when any state variable changes and component renders.
    

    return (
        <div>
            <h3>Joker!</h3>
            { joke.setup ? 
                <>
                <h4>{joke.setup}</h4>
                <h4>{joke.punchline}</h4>
                </> : <h4>loading ...</h4>
            }
            <button onClick={getJoke}>Get Joke</button>
        </div>
    )
}