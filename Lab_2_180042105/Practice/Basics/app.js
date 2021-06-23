//will be using this file for routing so that index.js doesn't get messy

const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoutes.routes");
const { logger, printSomething } = require("./middlewares/app.middlewares");
const morgan = require("morgan");


//app.use([logger, printSomething]);
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(userRoutes);



app.get("/", (req,res)=>{
    res.sendFile("home.html", {root: "./views"});
});

app.get("/about", (req,res)=>{
//storing cookie (sending data to the server using cookie)
    res.cookie("username", "siana");
//clearing cookie
    res.clearCookie("username");
//sending data through the header
    //res.append("id", "105");

    res.send("<H1> About Page </H1>");
});

app.get("/contact", (req,res)=>{
    //res.send("<H1> Contact Page </H1>");

//returning json with response
    res.json({name: "John reese", proffessional: "Teacher"});
});

//if navigated to any other url except the specified ones then the following error will be shown
app.use((req,res)=>{
//manually setting the status code 
    res.status(301).send("Page doesn't exist");
    //res.send("<H1> Error 404! Page doesn't exist </H1>");
});

module.exports = app;