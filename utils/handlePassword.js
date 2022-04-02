

const bcrypt = require("bcrypt");
const saltRounds  = 10;


const encrypt = async(passwordPlain) => {
    return  await bcrypt.hash(passwordPlain,saltRounds)
}

const compare = async(passwordPlain,dbPass) =>{
    return await bcrypt.compare(passwordPlain,dbPass);
}


module.exports = {encrypt , compare }




