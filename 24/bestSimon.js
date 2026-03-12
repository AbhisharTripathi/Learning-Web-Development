let mode = "start";
let level = 1;
let seq = "";
let inp = "";
let charNo=0;
// let id;
let highScore = "00";
let inpCounter = 0;

let map = {
    "ArrowUp" : 0,
    "ArrowLeft" : 1,
    "ArrowRight" : 2,
    "ArrowDown" : 3
};



let body = document.querySelector("body");
let colors = document.querySelectorAll("#box div");
let info = document.querySelector("#info");
let lev = document.querySelector("#level");
let score = document.querySelector(".score");

document.addEventListener("keydown", simon);

function simon(event) {
    // lev.innerText = `Level ${level}`;
    if(mode === "wait") return;
    else if(mode === "input") {
        console.log("entered input.");
        mode = "wait";
        inpCounter++;
        inp += map[event.code];
        colors[map[event.code]].classList.add("flash");
        setTimeout(()=>{colors[map[event.code]].classList.remove("flash");}, 200);
        if(inp[inpCounter - 1] !== seq[inpCounter - 1]){
            body.classList.add("red");
            info.innerText = "Wrong Input! 🔫 Press any key to show result...🎬";
            mode = "showResult";
        }
        else if(inpCounter === level) {
            body.classList.add("green");
            info.innerText = "Correct Input! 👍 Press any key to play next level...⏭️";
            mode = "start";
            level++;
            inpCounter = 0;
        }
        else mode = "input";
    }
    else if(mode === "start") {
        console.log("entered start.");
        body.classList.remove("green");
        body.classList.add("brown");
        lev.innerText = `Level ${level}`;
        info.innerText = `Level: ${level} started... Observe the Sequence... 👀👀`;
        mode = "wait";
        let random = Math.floor(Math.random() * 4);
        seq += random;
        charNo = 0;
        let id = setInterval(showColor, 1000);

        function showColor() {
            //console.log("showColor");
            colors[seq[charNo]].classList.add("flash");
            setTimeout(function() {colors[seq[charNo - 1]].classList.remove("flash");}, 200);
            if(charNo === seq.length - 1) {
                //console.log("charNo == seq.length - 1");
                mode = "input";
                setTimeout(()=>{
                    body.classList.remove("brown");
                    info.innerText = "Repeat the sequence using arrow key...";
                }, 800);
                inp = '';
                inpCounter = 0;
            }
            charNo++;
            //console.log("charno increased;")
        }
        setTimeout(()=>{clearInterval(id);}, 1000 * (seq.length));
    }
    else if(mode === "showResult") {
        console.log("entered showResult.");
        body.classList.remove("red");
        info.innerText = `Your Score is ${level - 1}. Press any key to continue.👏`;
        //highScore = "" + (level-1 > 9) ? (level - 1) : "0" + (level - 1);
        if(level - 1 > highScore) {
            if(level-1 > 9) highScore = "HS: " + (level - 1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            else highScore = "HS: 0" + (level - 1) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        }
        // console.log(highScore);
        score.innerHTML = highScore;
        mode = 'reset';
        
    }
    else if(mode === "reset") {
        console.log("entered reset.");
        level = 1;
        inp = "";
        mode = "start";
        seq = "";
        info.innerText = "Press any button to Start new game...🔄️";
        lev.innerText = `Level ${level}`;
    }
}