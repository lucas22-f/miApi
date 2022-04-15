let users = require("../data");
const {findUserById} = require("../functions");
const { getAllUsers ,getUserbyID, addUser, deleteUserById ,editUserById ,loginUser} = require("./usersModel");
const {notNumber} = require("../utils/userFunctions");
const { encrypt ,compare } = require("../utils/handlePassword");
const {matchedData} = require("express-validator");
const {tokenSing,tokenVerify} = require("../utils/handleJWT");
const { use } = require("bcrypt/promises");
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
    
    const user  = {
        name:cleanBody.name,
        email:cleanBody.email,
    }
    const token = await tokenSing(user,"1h");
    
    const data = await addUser({ ...cleanBody, password,image});
    if( data instanceof Error) return next(data)   

    res.status(201).json({message:"User Created", JWT : token});
    
    
   
};

//login
const login = async(req,res,next) =>{

    const data = await loginUser(req.body.email);
    if(!data.length) return next();
    if( await compare(req.body.password , data[0].password)){

        const user  = {
            name:data[0].name,
            email:data[0].email,
        }
        const token = await tokenSing(user,"1h");
        res.status(200).json({message:"User Logged", JWT : token});

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