let users = require("../data");
const {findUserById} = require("../functions");
const { getAllUsers ,getUserbyID, addUser, deleteUserById ,editUserById } = require("./usersModel");
const {notNumber} = require("../utils/userFunctions");
const { end } = require("../db/config");
//get all users
const listAll = async (req, res, next) => {
    const data = await getAllUsers();
    if(data instanceof Error) return next(data)
    data.length ? res.status(200).json(data) : next();
};


//get user by id

const listOne = async (req, res, next) => {
    
    if(notNumber(req.params.id,next)) return

    const data = await getUserbyID(+req.params.id);
    if(data instanceof Error) return next(data)
    data.length ? res.status(200).json(data) : next();

};

const addOne = async (req, res,next ) => {

   const data = await addUser(req.body)
   data instanceof Error ? next (data) : res.status(201).json(req.body);
   
};

//delete user by id

const removeOne = async(req, res, next) => {

    if(notNumber(req.params.id,next)) return
 
    const data = await deleteUserById(+req.params.id)
    
    if(data instanceof Error) return next(data)
    !data.length ? next() : res.status(200).json(data);
      

};


const editOne = async (req,res,next) =>{

    if(notNumber(req.params.id,next)) return


    const data = await editUserById(+req.params.id,req.body)
    if(data instanceof Error) return next(data)
    data.affectedRows ? res.status(200).json(req.body) : next();



}
module.exports ={listAll,listOne,addOne,removeOne , editOne};