const getSessionData = (req) => {
    const sessionData = req.session.sessionData;

    req.session.sessionData = null;

    return sessionData;
}

const flashDataToSession = (req, data, action) => {
    req.session.sessionData = data;
    req.session.save(action);
}

module.exports = {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
}