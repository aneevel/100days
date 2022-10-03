const { get } = require('express/lib/response');
const Product = require('../models/product-model');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('customer/products/all-products', { products: products });

    } catch (error) {
        next(error);
    }

}

const getProductDetails = async (req, res, next) => {
    try {
     const product = await Product.findByID(req.params.id);
    res.render('customer/products/product-details', { product: product });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductDetails: getProductDetails
};