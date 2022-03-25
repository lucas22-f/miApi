const express = require("express");
const port = 5000;
const app = express();


app.get("/",(req,res)=>{
    res.send(`<h1> Hola estamos en mi API con express y NODE </h1>`);
})


app.listen(port,(err)=>{
    err? console.log("error") : console.log(`sv corriendo en http://localhost:${port}`);
})