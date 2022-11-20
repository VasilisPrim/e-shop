

function emailIsValid(email){
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function postalIsValid(postalCode){
    return  /(^\d{5}$)|(^\d{5}-\d{4}$)/.test("90210");
}




function userCredentialsAreValid (userInput){
    const enteredEmail = userInput.email;
    const enteredConfirmEmail = userInput["confirm-email"];
    const enteredPassword = userInput.password;
    const enteredFullname = userInput.fullname;
    const street = userInput.street;
    const postalCode = userInput["postal-code"];
    const password = userInput.password;
    const city = userInput.city;

   if(enteredEmail &&
    enteredConfirmEmail &&
    enteredPassword &&
    enteredFullname &&
    street &&
    postalCode &&
    city &&
    emailIsValid(enteredEmail.trim())&&
    enteredEmail === enteredConfirmEmail&&
    password.trim().length>5 &&
    postalCode.trim().length === 5 &&
    postalCode.length === 5 &&
    //postalIsValid(postalCode)&&
    enteredFullname.length < 40 &&
    enteredEmail.trim().length <40 &&
    enteredEmail.trim().length>3&&
    enteredEmail.length < 40 &&
    city.length < 20 &&
    street.length < 20 
    ){
        return true
    }
    return false;


}





module.exports = {
    userCredentialsAreValid:userCredentialsAreValid,
}