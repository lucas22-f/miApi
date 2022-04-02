let users = require("../data");
const {findUserById} = require("../functions");
const { getAllUsers ,getUserbyID, addUser, deleteUserById ,editUserById ,loginUser} = require("./usersModel");
const {notNumber} = require("../utils/userFunctions");
const { encrypt ,compare } = require("../utils/handlePassword");

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

//register 
const register = async (req, res,next ) => {
   const passHash = await encrypt(req.body.password);
   const data = await addUser({ ...req.body, password: passHash  });
   data instanceof Error ? next (data) : res.status(201).json({message: `User ${req.body.name}Created`});
   
};

//login
const login = async(req,res,next) =>{

    const data = await loginUser(req.body.email);
    if(!data.length) return next();
    if( await compare(req.body.password , data[0].password)){
        res.sendStatus(200) 
    } else{
        let error = new Error("Unauthorized")
        error.status = 401;
        next (error);
    }
    

}


//delete user by id

const removeOne = async(req, res, next) => {

    if(notNumber(req.params.id,next)) return
 
    const data = await deleteUserById(+req.params.id)
    
    if(data instanceof Error) return next(data)
    !data.affectedRows ? next() : res.status(204).end();
      

};


const editOne = async (req,res,next) =>{

    if(notNumber(req.params.id,next)) return


    const data = await editUserById(+req.params.id,req.body)
    if(data instanceof Error) return next(data)
    data.affectedRows ? res.status(200).json(req.body) : next();



}
module.exports ={listAll,listOne, register , removeOne , editOne , login};