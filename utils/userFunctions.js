
const notNumber = (id,next) => {

  if (isNaN(Number(id)) || Number (id) < 1){

    let error = new Error("debe ser un numero entero positivo cracken 😎");
    error.status = 400
     next(error);  

     return true;


  }else{
      return false;
  }


}

module.exports = {notNumber}