const bcrypt = require('bcryptjs');

const db = require("../data/database");
const validation = require("../utility/validation/validation");
const validationSession = require("../utility/validation/validation-session");

const get401 = (req, res) => {
  res.status(401).render('401');
}

const getSignup = (req, res) => {
  let inputErrorData = validation.getLoginErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("signup", { inputData: inputErrorData });
};

const getLogin = (req, res) => {
  let inputErrorData = validation.getLoginErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("login", { inputData: inputErrorData });
};

const createUser = async (req, res) => {

  // Retrieve form data
  const formData = req.body;
  const emailData = formData["email"];
  const confirmEmailData = formData["confirm-email"];
  const passwordData = formData["password"];

  /**
   * Handle invalid signup data
   */
  if (
    !validation.signupDataIsValid(emailData, confirmEmailData, passwordData)
  ) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid signup data - please check your information",
        email: emailData,
        confirmEmail: confirmEmailData,
        password: passwordData,
      },
      () => {
        res.redirect("signup");
      }
    );

    return;
  }

  /**
   * Handle existing user
   */
  const userData = await db.getUserData(db, emailData);
  if (userData) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Invalid email address - user already exists with email",
        email: "",
        confirmEmail: "",
        password: "",
      },
      () => {
        res.redirect("signup");
      }
    );

    return;
  }

  /**
   * Handle happy path
   */

  // Hash password first
  const hashedPassword = await bcrypt.hash(passwordData, 12);

  // Insert user information
  const newUserData = {
    email: emailData,
    password: hashedPassword,
  };

  await db.getDB().collection("users").insertOne(newUserData);
  res.redirect("login");
};

const loginUser = async (req, res) => {

  // Retrieve form data
  const formData = req.body;
  const enteredEmail = formData["email"];
  const enteredPassword = formData["password"];

  /**
   * Handle missing user
   */
  const userData = await db.getUserData(enteredEmail);
  if (!userData) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Incorrect login credentials - please check your information!",
        email: enteredEmail,
        password: enteredPassword,
      },
      () => {
        res.redirect("login");
      }
    );

    return;
  }

  /**
   * Handle incorrect password
   */
  if (!validation.passwordsMatch) {
    validationSession.flashErrorsToSession(
      req,
      {
        message: "Incorrect login credentials - please check your information!",
        email: enteredEmail,
        password: enteredPassword,
      },
      () => {
        res.redirect("login");
      }
    );
    return;
  }

  /**
   * Handle happy path
   */

  validationSession.flashUserData(
    req,
    {
      id: userData._id,
      email: userData.email,
    },
    () => {
      res.locals.isAuth = true;
      res.redirect("admin");
    }
  );
};

const logoutUser = (req, res) => {
  req.session.user = null;
  res.locals.isAuthenticated = false;
  res.redirect("/");
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  createUser: createUser,
  loginUser: loginUser,
  logoutUser: logoutUser,
  get401: get401
};
