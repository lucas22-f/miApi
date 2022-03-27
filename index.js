const express = require("express");
const port = 3000;
const app = express();
let users = require("./data");

app.get("/", (req, res) => {
    res.send(`<h1> Hola estamos en mi API con express y NODE </h1>`);
});
//get all users
app.get("/users", (req, res) => {


    if (users.length > 0) {
        return res.status(200).json(users);

    }
    res.status(404).json({ message: "resourse not found" });


});
// get user BY id
app.get("/users/:id", (req, res) => {


    if (isNaN(Number(req.params.id))) {

        return res.status(400).json({ message: "debe ser un numero entero positivo cracken 😎" });

    }

    const userFound = users.find((user) => user.id === parseInt(req.params.id));

    userFound? res.status(202).json(userFound): res.status(404).json({ message: "error" });


});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/users", (req, res) => {
    const { name, username, email } = req.body;
    if (!name ||!username ||(!email && !name === "") ||username === "" ||email === ""){

        res.status(400).json({ message: "all fields required" });

    } else {
        console.log(req.body);
        users.push({ ...req.body });
    }
});

//delete user by id
app.delete("/users/:id", (req, res, next) => {
    if (isNaN(Number(req.params.id)) || req.params.id < 1) {
        return res.status(400).json({ message: "ID debe ser un número entero positivo mayor que 0" });
    }
    if (users.find((user) => user.id === Number(req.params.id))) {
        let filteredArr = users.filter((user) => user.id !== Number(req.params.id));
        users = filteredArr;
        res.status(200).json({ message: "Resource deleted" });
    } else {
        next();
    }
});

app.listen(port, (err) => {
    err? console.log("error"): console.log(`sv corriendo en http://localhost:${port}`);
});

app.use((req, res) => {
    res.status(404).json({ message: "Resourse Not Found" });
});
