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

const validatorEditUser = [
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
    

 

    (req,res,next) =>{
        try {
            validationResult(req).throw()
            return next();
        } catch (error) {
            res.status(400).json({errors : error.array()});
        }
    }


]
const validatorResetPasswod = [
    check("password1")
    .exists()
    .notEmpty().withMessage("este campo no puede estar vacio")
    .isLength({min:8,max:15}).withMessage("caracteres minimos 8 maximos 15")
    .trim(),
    check("password2")
    .custom(async(password2,{req})=>{
        
        const password1 = req.body.password1
        console.log(password1)
        if(password1!==password2){
            throw new Error ("Las contraseñas tienen que ser identicas");
        }
    }),
    (req,res,next) =>{
        const token = req.params.token
        errors = validationResult(req)
        if(!errors.isEmpty()){
            const arrWarnings = errors.array()
            res.render("reset",{arrWarnings,token})

        }else{
            next()
        }
    }
]

module.exports = {validatorCreateUser,validatorEditUser,validatorResetPasswod};