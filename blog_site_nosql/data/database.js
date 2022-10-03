const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

let connect = async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017');

    database = client.db('blog');
}

let getDB = () => {
    if (!database) {
        throw { message: 'Database connection not established!' };
    }
    return database;
}

module.exports = {
    connectToDatabase: connect,
    getDB: getDB
};