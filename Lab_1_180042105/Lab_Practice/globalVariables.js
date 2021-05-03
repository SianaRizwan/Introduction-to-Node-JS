// __dirname = path to the current directory
const currentDirectory = __dirname;
console.log(currentDirectory);

// filename = path to the current filename
console.log(__filename);

//require = function (also a global variable) to use modules
const fs = require("fs");
console.log(fs);

//module = info about current module
console.log(module);

//process = info about where the program is being executed
console.log(process);