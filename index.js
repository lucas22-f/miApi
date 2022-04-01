const express = require("express");
const port = 3000;
require("./db/config");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
require("dotenv").config();
//welcome end point
app.get("/", (req, res) => {
    res.send(`<h1> Hola estamos en mi API con express y NODE </h1>`);
});



app.use("/users", require("./users/usersRoutes"));






app.listen(port, (err) => {
    err? console.log("error"): console.log(`sv corriendo en http://localhost:${port}`);
});

app.use((req, res) => {
    res.status(404).json({ message: "Resourse Not Found" });
});
