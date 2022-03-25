
const express = require("express");
const port = 3000;
const app = express();
const users = require("./data");

app.get("/",(req,res)=>{
    res.send(`<h1> Hola estamos en mi API con express y NODE </h1>`);


})
//get all users
app.get("/users",(req,res)=>{

    if( users.length > 0){
       return res.status(200).json(users);
    }   
    res.status(404).json({message:"resourse not found"}); 

})
// get user BY id 
app.get("/users/:id",(req,res)=>{
   
    const userFound = users.find((user) => user.id === parseInt(req.params.id));
    userFound ? res.status(202).json(userFound) : res.status(404).json({message :"error"});
      
})



app.listen(port,(err)=>{
    err? console.log("error") : console.log(`sv corriendo en http://localhost:${port}`);
})