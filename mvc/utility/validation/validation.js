const bcrypt = require("bcryptjs/dist/bcrypt");

const postIsValid = (title, content) => {
    return (
        title &&
        content &&
        title.trim() !== "" &&
        content.trim() !== ""
    );
}

const signupDataIsValid = (email, confirmEmail, password) => {
    
    return (
        email &&
        confirmEmail &&
        password &&
        email === confirmEmail &&
        email.trim().length >= 6 &&
        email.includes("@")
    );
}

const passwordsMatch = (enteredPassword, savedPassword) => {
    return bcrypt.compare(enteredPassword, savedPassword);
}

const getLoginErrorData = (req, defaultValues) => {
    let inputData = req.session.inputData;
    if (!inputData) {
      inputData = {
        hasError: false,
        ...defaultValues
      };
    }
    req.session.inputData = null;

    return inputData;
}

module.exports = {
    postIsValid: postIsValid,
    getLoginErrorData: getLoginErrorData,
    signupDataIsValid: signupDataIsValid,
    passwordsMatch: passwordsMatch
}