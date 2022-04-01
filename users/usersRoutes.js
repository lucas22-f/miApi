const router = require("express").Router();
let users = require("../data");

const {addOne,listOne,listAll,removeOne, editOne} = require("./usersController");

//get all users
router.get("/",listAll)

//get user by id
router.get("/:id",listOne)

//post user
router.post("/",addOne)

//delete user by id
router.delete("/:id",removeOne)


//patch user by id
router.patch("/:id",editOne);

module.exports = router;