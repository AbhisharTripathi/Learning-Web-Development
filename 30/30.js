//window object in browser is simmilar to global object in node.js
//.help, .exit

//process: This object provides information about and control over, the current node.js process.
/*
process.version; //gives version of node.js
process.cwd(); //gives the current working directory.
*/
// console.log(process.argv);//This will return an array of all the arguments passed using command line, first element will always be the path of node.exe and second will always be the path of the js file that is running and other arguments can be passed using command line after the file name while running the code.
// console.log(process.release);
// let args = process.argv;
// for(let i = 2; i < args.length; i++) {
//     console.log("Hello ", args[i]);
// }

// const someCode = require("./exportCode");//It is a inbuilt function to include modules that exist in separate file.
//console.log(someCode);//if exportCode does not exports anything then a empty object will be printed.

// const apple = require("./Fruits/apple");//This will require only one file info.
//console.log(apple);

// const dirInfo = require("./Fruits");//This will require the module.exports object from index.js of Fruits directory. Fruits should contain the file index.js
//console.log(dirInfo);

/*
npm = node package manager is a command line tool and kind of library to install packages.
commands :-
npm install <-packagename-> = to install package on local working directory.
npm install -g <-packagename-> = to install package globally.
npm link <-package-name-> = to use a globally installed package in your js file.
npm uninstall <-packagename-> = to unistall a package from local directory.
npm uninstall -g <-packagename-> = to uninstall globally installed package.
npm list = to know all the installed packages in working directory.
npm list -g --depth=0 = to know all globally installed primary packages.
npm list -g = to know all globally installed packages recursively.
npm init = to initialize our package and create our package.json
npm init -y = to initialize a package with all default values.


packages have only limited scope as only in the directory you installed it.
if you install a package it will update or create 2 files and 1 directory.
node_modules : it contains every installed dependency for your project.
package-lock.json : it records the installed version of every dependency, icluding it's subdependency and it's versions
package.json : it contains descriptive and functional metadata about a project such as name, versions and dependencies.

to use a package we require("<-packagename->") it and save it in a varable. we do not need to write ./<-packagename->
*/

//export and import
//to use export and import we first need to define "type": "module" in package.json
//WE can either use module.exports or export both can not be used, strictly followed
//loading is synchronous for require but can be asynchronous for import.
import {hello, a} from "./exportCode.js";
console.log(hello());
console.log(a);