const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const jwt_key = process.env.jwt_secret;

const tokenSing = async( user, time )=>{    //creamos la function que hace la firma de un nuevo token

    return jwt.sign(user,jwt_key,{expiresIn : time});

}

const tokenVerify = async(token) =>{   //creamos la funcion que verifica el token 

    try {
        return jwt.verify(token,jwt_key);
    } catch (error) {
        return error
    }

}


module.exports = {tokenSing , tokenVerify};