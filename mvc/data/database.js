const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

const connectToDatabase = async () => {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("mvc");
};

const getDB = () => {
  if (!database)
    throw { message: "You must connect to the database before using it!" };

  return database;
};

const getUserData = async (email) => {
  return await getDB().collection("users").findOne({ email: email });
};

module.exports = {
  connectToDatabase: connectToDatabase,
  getDB: getDB,
  getUserData: getUserData,
};
