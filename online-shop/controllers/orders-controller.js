const stripe = require('stripe')('sk_test_51KnEHYESHu34W35t28fNQt9qyXTexV9PdNvxtWtJ425DaC1VmfL8QdupaKEQOFlzouT0UN3pOIauyTXI6VmmNJN00090ceVidB');

const Order = require ('../models/order-model');
const User = require('../models/user-model');

const getOrders = (req, res) => {
    res.render('customer/orders/all-orders');
}

const addOrder = async (req, res, enxt) => {
    const cart = res.locals.cart;

    let userDocument;
    try {
        userDocument = await User.findByID(res.locals.uid);
    } catch (error) {
        return next(error);
    }

    const order = new Order(cart, userDocument);

    try {
        await order.save();

        req.session.cart = null;
        
        res.redirect('/orders');
    } catch (error) {
        next(error);
        return
    }

    req.session.cart = null;

    const session = await stripe.checkout.sessions.create({
        line_items: cart.items.map((item) => {
            return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.product.title,
              },
              unit_amount: +item.product.price.toFixed(2) * 100
            },
            quantity: item.quantity,
          }
        }),
        mode: 'payment',
        success_url: 'http://localhost:3000/orders/success',
        cancel_url: 'http://localhost:3000/orders/failure',
    });

    res.redirect(303, session.url);
}

const getSuccess = (req, res) => {
    res.render('customer/orders/success');
}

const getFailure = (req, res) => {
    res.render('customer/orders/failure');
}

module.exports = {
    addOrder: addOrder,
    getOrders: getOrders,
    getSuccess: getSuccess,
    getFailure: getFailure
};