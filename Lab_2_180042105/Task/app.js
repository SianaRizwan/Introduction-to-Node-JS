const express = require('express');
const app = express();

app.get("/", (req,res)=>{
    res.sendFile("Hello");
});

app.use((req,res)=>{
    
        res.status(301).send("Page doesn't exist");
    });

module.exports = app;