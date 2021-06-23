const express = require('express');
const app = express();
const userRoutes = require("./routes/userRoutes.routes");
const { urlencoded } = require('body-parser');

app.use(userRoutes);
app.use(express.json());
app.use(urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.sendFile("home.html", {root: "./views"});
});

app.use((req,res)=>{
    res.status(404).send("Page doesn't exist");
    });

module.exports = app;