function getRandomNumbers(n) {
    let result = new Array(n);
    for(let i = 0; i < n; i++) {
        result[i] = Math.floor(Math.random() * 10);
    }
    return result;
}

function sum(arr) {
    return arr.reduce((acc, el) => {
        return acc + el;
    }, 0);
}

export {getRandomNumbers, sum};