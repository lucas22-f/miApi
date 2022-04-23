const express = require("express");
require("./db/config");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require("dotenv").config();
app.use(express.static("storage"));
const hbs = require("express-handlebars");
const path = require("path");

//bootstrap config
app.use("/css",express.static(path.join(__dirname,"node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname,"node_modules/bootstrap/dist/js")));

//hbs config
app.set("view engine","hbs");
app.set("views",path.join(__dirname,"views"));
app.engine("hbs",hbs.engine({extname: "hbs"}));


//welcome end point
app.get("/", (req, res) => {
    res.send(`<h1> Hola estamos en mi API con express y NODE </h1>`);
});


//rutas users
app.use("/users", require("./users/usersRoutes"));
//rutas posts auth
app.use("/posts",require("./posts/postRoute"));



const PORT =3000;


app.listen(PORT, (err) => {
    err? console.log("error"): console.log(`sv corriendo en http://localhost:${PORT}`);
});
//catch error (404)
app.use((req, res, next) => {

    let error = new Error("Resourse not found")
    error.status = 404;
    next(error);
});


//Error Handler

app.use((error,req,res,next)=>{
    if(!error.status){
        error.status = 500;
    }

    res.status(error.status).json({status : error.status , message: error.message})


})
