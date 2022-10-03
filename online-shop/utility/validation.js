const isEmpty = (value) => {
  return !value || value.trim() === "";
};

const userCredentialsAreValid = (email, password) => {
  return email && email.includes("@") && password && password.trim().length > 5;
};

const userDetailsAreValid = (email, password, name, street, postal, city) => {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
};

const emailIsConfirmed = (email, confirmEmail) => {
    return email === confirmEmail;
}

module.exports = {
    userDetailsAreValid: userCredentialsAreValid,
    emailIsConfirmed: emailIsConfirmed
}