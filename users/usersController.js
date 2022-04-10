let users = require("../data");
const {findUserById} = require("../functions");
const { getAllUsers ,getUserbyID, addUser, deleteUserById ,editUserById ,loginUser} = require("./usersModel");
const {notNumber} = require("../utils/userFunctions");
const { encrypt ,compare } = require("../utils/handlePassword");
const {matchedData} = require("express-validator");
const public_url = process.env.public_url;


//get all users
const listAll = async (req, res, next) => {


    const data = await getAllUsers();

    if(data instanceof Error) return next(data)
    
    
    const datav1 = data.map((user)=>{
        const filteredUsers = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
        }
        return filteredUsers
    })
    data.length ? res.status(200).json(datav1) : next()
    
};


//get user by id

const listOne = async (req, res, next) => {
    
    if(notNumber(req.params.id,next)) return
    const data = await getUserbyID(+req.params.id);
    if(data instanceof Error) return next(data)
    if(!data.length)return next();
    const {id,name,email,image} = data[0];
    const user = {
        id,
        name,
        email,
        image
    }
    
    
    res.status(200).json(user);

};

//register 
const register = async (req, res, next) => {

    const cleanBody = matchedData(req);
     const image =`${public_url}/${req.file.filename}`
     const password = await encrypt(req.body.password);
     const data = await addUser({ ...cleanBody, password,image});
     data instanceof Error ? next(data) : res.sendStatus(201)
   
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
    
    const image =`${public_url}/${req.file.filename}`
    const data = await editUserById( +req.params.id , {...req.body  , image})
    if(data instanceof Error) return next(data)
    data.affectedRows ? res.status(200).json(req.body) : next();



}
module.exports ={listAll,listOne, register , removeOne , editOne , login};