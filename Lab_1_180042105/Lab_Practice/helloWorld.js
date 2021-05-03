const Hello = () => {
    console.log("Hello World!");
};

const name = "Siana";                 //module.exports.name = "Siana"; (line 5,6 merging to one line) 
module.exports = { Hello, name }; 
//console.log(module);
//Hello();