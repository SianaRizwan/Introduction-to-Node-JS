const http = require("http");

const server = http.createServer((req,res) => {

    if (req.url == "/") {
        res.write("<h1>This is the base URL </h1>");
        res.end();
    } 
    else if (req.url == "/home") {
        res.write("<h1> This is Home Page </h1>");
        res.end();
    } else {
        res.write("<h1> This page doesn't exist  </h1><br><a href = '/'> <h3> Go to Base </h3> </a>");
        res.end();
    } 

//    console.log(req);
//    res.writeHead(201, {"Content-type": "text/html"});
//    res.write("<h1> Hello Users </h1> \n Welcome to the Browser");
//    res.end();    // end na korle browser er tab er icon e loading dekhate thakbe
});

//server.listen(7777);
module.exports = { server };