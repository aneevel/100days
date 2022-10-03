const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

const initDB = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    database = client.db('first-api');
}

const getDB = () => {
    if (!database) {
        throw new Error('Database not connected!');
    }

    return database;
}

module.exports = {
    initDB: initDB,
    getDB: getDB
};