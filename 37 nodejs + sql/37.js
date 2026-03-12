//npm i @faker-js/faker
//npm install mysql2
const {faker} = require("@faker-js/faker");//this helps in creating random user data.
const mysql = require("mysql2");//this package is used to make connection with the database.

let randomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        // faker.image.avatar(),
        faker.internet.password(),
        // faker.date.birthdate(),
        // faker.date.past()
    ];
};

// const connection = mysql.createConnection({ //this creates a connection with the database from node.
//     host: "localhost",
//     user: "root",
//     database: "college",
//     password: "1234567"
// });

// let q = "SHOW TABLES";
// try {
//     connection.query(q, (err, results, fields) => {//used to query in the database. It takes three argument first is a SQL Query and second is a array which contains element that will replace the ? in query and third is a callback function with three arguments. You can skip the second argument i.e. array.
//         if(err) throw err;
//         console.log(results);//results contain rows returned by server. It returns an array of objects in which each row will be an object with column name as key and value as it's value.
//         console.log(fields);//fields contains extra metadata about results
//     });
// }
// catch(err) {
//     console.log(err);
// }

//inserting new data.
// let q = "INSERT INTO students (id, name, courseid, year) VALUES (?, ?, ?, ?)";
// arr = [9, "Aman", "2", 2];//you can only pass values in array to replace ?.
// try {
//     connection.query(q, arr, (err, results, fields) => {//the array passed as a argument will replace the ? in the q
//         if(err) throw err;
//         console.log(results);
//     });
// }
// catch(err) {
//     console.log(err);
// }

//inserting data in bulk

const connection2 = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "instagram",
    password: "1234567"
});

let q = "INSERT INTO user (id, name, email, password) VALUES ?";//this ? will be replaced by array of arrays with each array has elements which are values to insert in the table.
let data = [];
for(let i = 0; i < 100; i++) {
    data.push(randomUser());
}

try{
    connection2.query(q, [data], (err, results, fields) => {//here data itself is a array of arrays and places inside a array. This means data itself will replace the ?
        if(err) throw err;
        console.log(results);
    });
}
catch(err) {
    console.log(err);
}

// connection.end(); // to close the connection.
connection2.end();



//to use sql in CLI
// /usr/local/mysql/bin/mysql -u root -p
// "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql" -u root -p
// after setting its path in system variable just give command: mysql -u root -p
// create a file name schema.sql in the same folder from where you have opened sql shell in cli and in the sql shell of CLI type command: source schema.sql;