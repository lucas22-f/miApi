const express = require("express");
const port = 5000;
const app = express();


app.listen(port,(err)=>{
    err? console.log("error") : console.log(`sv corriendo en http://localhost:${port}`);
})