const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database; 

const connectToDatabase = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017');    
    database = client.db('online-shop');
}

const getDB = () => {
    if (!database) {
        throw new Error('Not connected to database!');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDB: getDB
}