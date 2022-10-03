const { application } = require('express');
const express = require('express');

const DB = require('./data/database');
const quoteRoutes = require('./routes/quotes.routes');

const app = express();

app.use('/quote', quoteRoutes);

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error
    });

    next();
});

DB.initDB().then(() => {
    app.listen(3000);
}).catch((error) => {
    console.error('Connecting to the database failed.');
});