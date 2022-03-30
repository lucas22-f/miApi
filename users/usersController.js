let users = require("../data");
const {findUserById} = require("../functions");

//get all users
const listAll = (req, res, next) => {
    users.length ? res.status(200).json(users) : next();
};


//get user by id

const listOne = (req, res, next) => {
    if (isNaN(Number(req.params.id)) || req.params.id < 1) {
        return res.status(400).json({ message: "debe ser un numero entero positivo cracken 😎" });
    }
    const userFound = findUserById(+req.params.id,users);
    userFound? res.status(202).json(userFound): next();

};

const addOne = (req, res) => {
    
    const { name, username, email } = req.body;
    
    if (!name ||!username ||(!email && !name === "") ||username === "" ||email === ""){
        res.status(400).json({ message: "all fields required" });

    } else {
        
        res.status(200).json({message:"resourse created"});
        users.push({ ...req.body });
    }
};

//delete user by id

const removeOne = (req, res, next) => {
    if (isNaN(Number(req.params.id)) || req.params.id < 1) {
        return res.status(400).json({ message: "ID debe ser un número entero positivo mayor que 0" });
    }
    if (findUserById(+req.params.id,users)) {
        let filteredArr = users.filter((user) => user.id !== Number(req.params.id));
        users = filteredArr;
        res.status(200).json({ message: "Resource deleted" });
    } else {
        next();
    }
};

module.exports ={listAll,listOne,addOne,removeOne};