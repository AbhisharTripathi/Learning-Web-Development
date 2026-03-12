let hour = 0;
let min = 0;
let sec = 55;
setInterval(() => {
    sec += 1;
    if(sec == 60){
        sec = 0;
        min += 1;
    }
    if(min == 60){
        min = 0;
        hour += 1;
    }
    document.getElementById("hour").innerHTML =  hour;
    document.getElementById("sec").innerHTML =  sec;
    document.getElementById("min").innerHTML =  min;

},1000);

