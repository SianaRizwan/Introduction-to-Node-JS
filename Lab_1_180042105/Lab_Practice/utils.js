const Hellofunc = require("./helloWorld");
Hellofunc.Hello();
console.log(Hellofunc.name);


//setInterval & setTimeout fn both takes CALLBACK FN & TIME as parameters

//setInterval ,callback fn will continously run with an interval of 1s
setInterval(()=>{
    Hellofunc.Hello();
}, 1000);

//setTimeout, after 5s callback fn will run only once
setTimeout(()=>{
    console.log(Hellofunc.name);
}, 5000);