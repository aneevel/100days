const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');

const db = require('../data/database');

class User {
    constructor(email, password, fullname, street, postal, city) {
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }

    static findByID(userID) {
        const uid = new mongodb.ObjectId(userID);

        // Uses projection to omit password
        return db.getDB().collection('users').findOne({ _id: uid}, { projection: { password: 0 } });
    }

    getUserWithSameEmail() {
        return db.getDB().collection('users').findOne({ email: this.email });
    }

    async existsAlready() {
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) 
            return true;
        return false;
    }

    async signup() {
        const encryptedPassword = await bcrypt.hash(this.password, 12);

        await db.getDB().collection('users').insertOne({
            email: this.email,
            password: encryptedPassword,
            name: this.name,
            address: this.address
        });
    }

    hasMatchingPassword(hashedPassword) {
        return bcrypt.compare(this.password, hashedPassword);
    }
}

module.exports = User;