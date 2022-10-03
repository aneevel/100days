const addCSRFToken = (req, res, next) => {
    const csrfToken = req.csrfToken();
    res.locals.csrfToken = csrfToken;
    next();
}

module.exports = addCSRFToken;