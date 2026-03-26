/*Authentication : It is a process of verifying who someone is.
Authorization : It is a process of verifying what specific application, files and data a user has access to.
- We never store the password as it is. We store their hashed form.
A. Hashing :-
    - For every input there is a fixed output.
    - They are one way function we can not get input from the output.
    - For different input there will be different output but of same length.
    - Small change in input should bring large changes in output.
    - Example of hashing function : SHA256, MD5, CRC, bcrypt
B. Salting : Password salting is a technique to protect passwords stored in the database by adding a string of 32 or more characters and then hashing them.
C. Passport : It is a authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in any Express based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter and more. It is a npm library.

npm i passport = to use passport.
npm i passport-local = to use username and password strategy of auth.
npm i passport-local-mongoose = It is a mongoose plugin that simplifies building username and password login with Passport.
*/