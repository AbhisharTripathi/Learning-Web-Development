// let num = 89;
// let prediction =0;
// let ch = prompt("Do you want to play number guessing game ? 0 or 1")
// if(ch == 1){
//     do {
//         prediction = prompt("Guess the number :");
//         if(prediction == -1) alert("Chullu bhar pani me jake dub mar.....");
//         else if(prediction > num) alert("Your prediction is greater than actual number.");
//         else if(prediction < num) alert("Your prediction is lower than the actual number.");
//         else {
//             alert("YOU ARE Right !");
//             break;
//         }
//     }while(prediction != -1);
// }

let arr = [1,2,3,4,5,6,7];

let sum = 0;
for(num of arr) {
    sum += num;
}
console.log(sum);