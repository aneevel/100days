const DB = require('../data/database');

class Order {
    // Status => pending, fulfilled, cancelled
    constructor(cart, userData, date, orderID, status = 'pending') {
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date);
        this.formattedDate = this.date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        this.id = orderID;
    }

    save()  {
        if (this.id) {
            //Updating order
        } else {
            const orderDocument = {
                userData: this.userData,
                productData: this.productData,
                date: new Date(),
                status: this.status
            };

            return DB.getDB().collection('orders').insertOne(orderDocument);
        }
    }
}

module.exports = Order;