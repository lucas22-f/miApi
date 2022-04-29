const mysql = require("mysql");
const util = require("util");
require("dotenv").config();

const connection = mysql.createPool({

    user : process.env.db_user,
    pass : process.env.db_pass,
    host: process.env.db_host,
    database: process.env.db_name
})

connection.getConnection((err)=>{
    err?console.warn("no conectado",{"error":err.message}):console.log(`"Conexión establecida"`);
})


connection.query = util.promisify(connection.query);

module.exports = connection; 