const router = require("express").Router();
let users = require("../data");

const {register,listOne,listAll,removeOne, editOne , login , forgot , reset , saveNewPass} = require("./usersController");
const {validatorCreateUser, validatorEditUser,validatorResetPasswod} = require("../validators/users");
const uploadFile = require("../utils/handleImg");
//get all users
router.get("/",listAll)

//get user by id
router.get("/:id",listOne)

//post user
router.post("/register" ,uploadFile.single("file"),validatorCreateUser, register ) 

//post user
router.post("/login", login)

//delete user by id
router.delete("/:id",removeOne)

//patch user by id
router.patch("/:id",uploadFile.single("file"),validatorEditUser, editOne);

//forgot Password
router.post("/forgot-password",forgot);
//get link para reset
router.get("/reset/:token",reset);
router.post("/reset/:token",validatorResetPasswod, saveNewPass);

module.exports = router;