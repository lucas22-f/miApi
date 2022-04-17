const connection = require("../db/config");

const getAllposts = () =>{
    
    try {
        const query = "SELECT * from posts"
        return connection.query(query)

    } catch (error) {
        error.message = error.code
    }
    
}

const getPostWith = (string) => {
    const query = `SELECT * from posts where title LIKE '%${string}%'`
     try {
        
        return connection.query(query);
    } catch (error) {
        error.message = error.code;
    }
}

const addNewPost = (post) => {

    try {
        const query = "INSERT INTO posts SET ?"
        return connection.query(query,post);
    } catch (error) {
        error.message = error.code;
    }


}
module.exports = {getAllposts, addNewPost, getPostWith};