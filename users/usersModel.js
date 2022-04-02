const connection = require("../db/config");


const getAllUsers = async() =>{

    const query = "SELECT * FROM users"
    try {

        return await connection.query(query)

        
    } catch (error) {
        error.message = error.code
        return error
    }

    

}

const getUserbyID = async (id) =>{

    const query = `SELECT * FROM users where id = ${id}`

    try {

        return await connection.query(query)

        
    } catch (error) {
        error.message = error.code
        return error
    }


}


const addUser = async (user) =>{
    const query = `INSERT INTO users SET ?`

    try {

        return await connection.query(query,user)

        
    } catch (error) {
        error.message = error.code
        return error
    }
}

const deleteUserById = async(id) =>{
    const query = `DELETE FROM users WHERE id = ${id}`

    try {

        return await connection.query(query,id)

        
    } catch (error) {
        error.message = error.code
        return error
    }


}

const editUserById = async(id,user) =>{

    const query = `UPDATE users set ? WHERE id = ${id}`

    try {

        return await connection.query(query,user)

        
    } catch (error) {
        error.message = error.code
        return error
    }


}

const loginUser = async(email) =>{

    const query = `SELECT * FROM users WHERE email = "${email}" LIMIT 1`

    try {
        return await connection.query(query);
    } catch (error) {
        error.message = error.code
        return error;
    }


}




module.exports = {getAllUsers ,getUserbyID, addUser , deleteUserById, editUserById, loginUser} 