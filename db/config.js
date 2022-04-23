const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

const connection = mysql.createPool({
    host: "us-cdbr-east-05.cleardb.net",
    database: "heroku_eb9ce2a7c6fee52",
    user : "bdf2116239405c",
    pass : "224ccf7a",
})

connection.getConnection((err)=>{
    err?console.warn("no conectado",{"error":err.message}):console.log(`"Conexión establecida"`);
})


connection.query = util.promisify(connection.query);

module.exports = connection; 