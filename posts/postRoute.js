const router = require("express").Router();
const {addOne} = require("./postController");
const {isAuth} = require("../middlewares/isAuth")
router.post("/",isAuth,addOne);
module.exports = router;