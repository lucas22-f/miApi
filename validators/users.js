const {check , validationResult} = require("express-validator");
const validatorCreateUser = [
    check("name")
    .exists().withMessage("campo requerido")
    .trim()
    .isAlpha("es-ES",{ignore:' '}).withMessage("solo letras")
    .isLength({min:2 ,max: 90}).withMessage("min 2 char"),
    check("email")
    .exists().withMessage("email requerido")
    .trim()
    .isEmail().withMessage("formato email requerido")
    .normalizeEmail(),
    check("password")
    .exists().withMessage("requerido")
    .trim()
    .isLength({min:8,max:15}).withMessage("min 2 char"),
    

 

    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next();
        } catch (error) {
            res.status(400).json({errors : error.array()});
        }
    }


]

module.exports = {validatorCreateUser};