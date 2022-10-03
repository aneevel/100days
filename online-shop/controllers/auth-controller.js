const User = require("../models/user-model");
const AuthUtil = require("../utility/authentication");
const ValidationUtil = require("../utility/validation");
const sessionFlash = require("../utility/session-flash");

const getSignup = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData)
  {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: ''
    };
  }

  res.render("customer/auth/signup", { inputData: sessionData });
};

const getLogin = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      password: ''
    };
  }

  res.render("customer/auth/login", { inputData: sessionData });
};

const signup = async (req, res, next) => {

  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city 
  };

  if (
    !ValidationUtil.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) || !ValidationUtil.emailIsConfirmed(req.body.email, req.body['confirm-email'])
  ) {
    sessionFlash.flashDataToSession(req, {
      errorMessage: 'Please check your input - some information is invalid.',
      ...enteredData
    }, () => {
      res.redirect("/signup");
    });
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      sessionFlash.flashDataToSession(req, {
        errorMessage: 'User exists already! Try logging in instead.',
        ...enteredData
      }, () => {
        res.redirect('/signup')
      });
      return;
    }

    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
};

const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);
  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(error);
  }

  const sessionErrorData = {
    errorMessage: 'Invalid credentials - please double-check your credentials and try again.',
      email: user.email,
      password: user.password
  }

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, {
      ...sessionErrorData
    }, () => {
      res.redirect('/login');
    });
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, {
      ...sessionErrorData
    }, () => {
      res.redirect('/login');
    });
    return;
  }

  AuthUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

const logout = async (req, res) => {
  AuthUtil.resetUserSession(req);
  res.redirect("/login");
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
