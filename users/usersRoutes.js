const router = require("express").Router();
let users = require("../data");

const {register,listOne,listAll,removeOne, editOne , login} = require("./usersController");
const {validatorCreateUser} = require("../validators/users");
const uploadFile = require("../utils/handleImg");
//get all users
router.get("/",listAll)

//get user by id
router.get("/:id",listOne)

//post user
router.post("/register" ,uploadFile.single("file"),register)

//post user
router.post("/login", login)

//delete user by id
router.delete("/:id",removeOne)


//patch user by id
router.patch("/:id",editOne);

module.exports = router;