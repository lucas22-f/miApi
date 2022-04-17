const router = require("express").Router();
const {addOne, listAll} = require("./postController");
const {isAuth} = require("../middlewares/isAuth");
const validationCreatePost = require("../validators/post");
 

router.post("/",isAuth,validationCreatePost,addOne);
router.get("/",listAll);

module.exports = router;