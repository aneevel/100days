const mongodbStore = require("connect-mongodb-session");

const createSessionStore = (session) => {
  const MongoDBStore = mongodbStore(session);

  // Setup mongodbstore
  const sessionStore = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "mvc",
    collection: "sessions",
  });

  return sessionStore
};

const createSessionConfig = (sessionStore) => {
    return {
        secret: 'mvc-secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}

module.exports = {
  createSessionStore: createSessionStore,
  createSessionConfig: createSessionConfig
};
