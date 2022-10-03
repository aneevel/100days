const auth = async (req, res, next) => {
    const user = req.session.user;
    const isAuth = req.session.isAuth;

    if (!user || !isAuth)
        return next();


    res.locals.isAuth = isAuth;

    next();
};

module.exports = auth; 