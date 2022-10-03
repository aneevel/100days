const res = require("express/lib/response");

const getSessionErrorData = (req, defaultValues) => {
    let sessionInputData = req.session.inputData;

    if (!sessionInputData) {
      sessionInputData = {
        hasError: false,
        ...defaultValues
      };
    }
    req.session.inputData = null;

    return sessionInputData;
}

const flashErrorsToSession = (req, data, next) => {
    req.session.inputData = {
        hasError: true,
        ...data
      };

    req.session.save(next);
}

const flashUserData = (req, data, next) => {
  req.session.user = {
    ...data
  };
  req.session.isAuthenticated = true;

  req.session.save(() => {
    next();
  });
}

module.exports = {
    getSessionErrorData: getSessionErrorData,
    flashErrorsToSession: flashErrorsToSession,
    flashUserData: flashUserData
}