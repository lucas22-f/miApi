const { matchedData } = require("express-validator");
const { getAllposts,addNewPost, getPostWith } = require("./postModel")




const listAll = async(req,res,next) =>{

    let data = null;
    if (req.query.title){
        data = await getPostWith(req.query.title);
    }else{
        data = await getAllposts();
    }
    if(data instanceof Error) return next(data);
    data.length ? res.status(200).json({data}) : next()
    

}


const addOne = async(req, res, next) => {
    
    const cleanData = matchedData(req)
    const data = await addNewPost({userid : req.token.id,  ...cleanData});
    data instanceof Error ? next(data) : res.status(201).json({message:`post created by ${req.token.name}`});

}





module.exports = { addOne ,listAll}