const expressSession = require('express-session');
const mongoDBStore = require('connect-mongodb-session');

const createSessionStore = () => {
    const MongoDBStore = mongoDBStore(expressSession);

    const store = new MongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store;
};

const createSessionConfig = () => {
    return {
        secret: 'aEKE82n19!alkHJw&1*(l1zASZA3',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}

module.exports = createSessionConfig;