const mongoDB = require('mongodb');

const DB = require('../data/database');

class Product {
    constructor(productData) {
        this.title = productData.title;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.image = productData.image;
        this.updateImageData();

        if (productData._id) {
            this.id = productData._id.toString();
        }
    }

    static async findByID(productID) {
        let prodID;
        try {
            prodID = new mongoDB.ObjectId(productID);
        } catch (error) {
            error.code = 404;
            throw error;
        }

        const product = await DB.getDB().collection('products').findOne({ _id: prodID });

        if(!product) {
            const error = new Error('Could not find product with provided id.');
            error.code = 404;
            throw error;
        }

        return new Product(product);
    }

    static async findAll() {
        const products = await DB.getDB().collection('products').find().toArray();

        return products.map((productDocument) => {
            return new Product(productDocument);
        });
    }

    updateImageData() {
        this.imagePath = `product-data/images/${this.image}`;
        this.imageUrl = `/products/assets/images/${this.image}`;
    }

    async save() {  
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
            image: this.image
        };

        if (this.id) {
            const productID = new mongoDB.ObjectId(this.id);

            if (!this.image) {
                delete productData.image;
            }

            await DB.getDB().collection('products').updateOne({_id: productID}, {
                $set: productData
            });
        } else {
            const result = await DB.getDB().collection('products').insertOne(productData);
        }

    }

    async replaceImage(newImage) {
        this.image = newImage;
        this.updateImageData();
    }

    async remove() {
        const productID = new mongoDB.ObjectId(this.id);
        await DB.getDB().collection('products').deleteOne({ _id: productID});
    }
}

module.exports = Product;