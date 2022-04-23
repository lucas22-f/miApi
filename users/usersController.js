let users = require("../data");
const {findUserById} = require("../functions");
const { getAllUsers ,getUserbyID, addUser, deleteUserById ,editUserById ,loginUser} = require("./usersModel");
const {notNumber} = require("../utils/userFunctions");
const { encrypt ,compare } = require("../utils/handlePassword");
const {matchedData} = require("express-validator");
const {tokenSing,tokenVerify} = require("../utils/handleJWT");
const { use } = require("bcrypt/promises");
const nodemailer = require("nodemailer");
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
        id:cleanBody.id,
        name:cleanBody.name,
        email:cleanBody.email,
    }
    const token = await tokenSing(user,"1h");
    
    const data = await addUser({ ...cleanBody, password,image});
    if( data instanceof Error) return next(data)   

    res.status(201).json({message:"User Created", JWT : token});
    
    
   
};
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "219b0937bbfed7",
      pass: "001643c64936c4"
    }
  });

const forgot = async(req,res,next) =>{


    const data = await loginUser(req.body.email);
    if(!data.length) return next();
    const user ={
        id:data[0].id,
        name:data[0].name,
        email:data[0].email
    }
    const token = await tokenSing(user,"15m");
    const link = `${public_url}/users/reset/${token}`

    let mailDetails = {
        from:"techsupport@lukin.com",
        to:user.email,
        subject:"password recovery",
        html:`<h2> Reset de contraseña</h2> 
        <p> restablece tu contraseña, hace click en el siguiente link: <a href="${link}"> click to recover your password "</a>`
    
    }

    transport.sendMail(mailDetails,(err,data)=>{
        if(err){
            err.message = "Internal Server Error"
            res.next(err)
        }else{
            res.status(200).json({message:`Hola! ${user.name} te mandamos un mail con las instrucciones para reestablecer tu contraseña a ${user.email}`})
        }
    })


}
//FORM -> reset password

const reset = async(req,res,next)=> {

    const {token} = req.params;
    const tokenStatus = await tokenVerify(token);
    if(tokenStatus instanceof Error){
        res.send(tokenStatus);
    }else{
        res.render("reset",{tokenStatus , token});
    }

}

const saveNewPass = async(req,res,next) => {
    const {token} = req.params;
    const tokenStatus = await tokenVerify(token);
    if(tokenStatus instanceof Error) return res.send(tokenStatus);
    const newPassword = await encrypt(req.body.password1);
    const data = await editUserById(tokenStatus.id,{password: newPassword});
    data instanceof Error ? next(data) : res.status(200).json({message: "Contraseña correctamente actualizada"})

};



//login
const login = async(req,res,next) =>{

    const data = await loginUser(req.body.email);
    if(!data.length) return next();
    if( await compare(req.body.password , data[0].password)){

        const user  = {
            id:data[0].id,
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
module.exports ={listAll,listOne, register , removeOne , editOne , login , forgot , reset , saveNewPass};