let users = require("../data");
const {findUserById} = require("../functions");
const { getAllUsers ,getUserbyID, addUser, deleteUserById ,editUserById } = require("./usersModel");

//get all users
const listAll = async (req, res, next) => {
    const data = await getAllUsers();
    data.hasOwnProperty("error") ? res.status(500).json(data):res.status(200).json(data);


};


//get user by id

const listOne = async (req, res, next) => {
    if (isNaN(Number(req.params.id)) || req.params.id < 1) {
        return res.status(400).json({ message: "debe ser un numero entero positivo cracken 😎" });
    }

    const data = await getUserbyID(+req.params.id);
    if(data.hasOwnProperty("error"))return res.status(500).json(data)
    data.length ? res.status(200).json(data) : next()

};

const addOne = async (req, res) => {

    const user = {
        name:req.body.name,
        userName:req.body.userName,
        email:req.body.email
    }

   const data = await addUser(user)

   data.hasOwnProperty("error") ? res.status(500).json(data) : res.status(201).json(user);

   
};

//delete user by id

const removeOne = async(req, res, next) => {
    if (isNaN(Number(req.params.id)) || req.params.id < 1) {
        return res.status(400).json({ message: "ID debe ser un número entero positivo mayor que 0" });
    }
 
    const data = await deleteUserById(+req.params.id)
    
    if(data.hasOwnProperty("error")) return res.status(500).json(data)
    data.affectedRows ?  res.status(204).end():next();
      

};


const editOne = async (req,res,next) =>{
    if (isNaN(Number(req.params.id)) || req.params.id < 1) {
        return res.status(400).json({ message: "ID debe ser un número entero positivo mayor que 0" });
    }


    const data = await editUserById(+req.params.id,req.body)
    if(data.hasOwnProperty("error")) return res.status(500).json(data)
    data.affectedRows ? res.status(200).json(req.body) : next() ;



}
module.exports ={listAll,listOne,addOne,removeOne , editOne};