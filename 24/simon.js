let body = document.querySelector("body");

body.addEventListener('click', start);
document.addEventListener('keydown', start);
let isRunning = false;

function start(){
    if(isRunning) return; //game is already running.
    isRunning = true; //new game started;

    let up = document.querySelector(".up");
    let left = document.querySelector(".left");
    let right = document.querySelector(".right");
    let down = document.querySelector(".down");

    let counter = 0; //counts the input.
    let lockKey = true;//to lock the keys used to play the game.
    let level = 1; //level of game
    let isCorrect = true;
    let res = "";
    let inp = "";

    while(isCorrect) {
        let newColor = Math.floor(Math.random() * 4 + 1);
        console.log("elloo")
        res += newColor;
        for(char of res) {
            switch(char) {
                case 1: up.classList.add("flash");
                        warn1;
                        up.classList.remove("flash");
                        warn2;
                        break;
                case 2: left.classList.add("flash");
                        warn1;
                        left.classList.remove("flash");
                        warn2;
                        break;
                case 3: right.classList.add("flash");
                        warn1;
                        right.classList.remove("flash");
                        warn2;
                        break;
                case 4: down.classList.add("flash");
                        warn1;
                        down.classList.remove("flash");
                        warn2;
                        break;
            }
        }
        lockKey  = false;
        function takeInput(event){
            if(lockKey) return;
            lockKey = true;
            switch(event.code) {
                case "ArrowUp": 
                        up.classList.add("flash");
                        warn1;
                        inp += "1";
                        up.classList.remove("flash");
                        warn2;
                        break;
                case "ArrowLeft": 
                        left.classList.add("flash");
                        warn1;
                        inp += "2";
                        left.classList.remove("flash");
                        warn2;
                        break;
                case "ArrowRight": 
                        right.classList.add("flash");
                        warn1;
                        inp += "3";
                        right.classList.remove("flash");
                        warn2;
                        break;
                case "ArrowDown": 
                        down.classList.add("flash");
                        warn1;
                        inp += "4";
                        down.classList.remove("flash");
                        warn2;
                        break;

            }
            counter++;
            lockKey = false;
        }
        document.addEventListener("keydown", takeInput);
        //while(counter < level);
    }
}