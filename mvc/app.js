const path = require('path');

const express = require('express');
const session = require('express-session');
const csurf = require('csurf');

/**
 * Variable initialization
 */

const app = express();
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog')
const db = require('./data/database');
const sessionConfig = require('./config/session');
const authMiddleware = require('./middlewares/auth-middleware')
const addCSRFTokenMiddleware = require('./middlewares/csrf-token-middleware');
const res = require('express/lib/response');

const mongoDBSessionStore = sessionConfig.createSessionStore(session);

// Set the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve any static content (styles, images, etc.,)
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))

// Setup session storage
app.use(session(sessionConfig.createSessionConfig(mongoDBSessionStore)));

/** 
 * Set up all middleware
 */

// Setup authentication
app.use(authMiddleware);

// Setup csrf
app.use(csurf());
app.use(addCSRFTokenMiddleware);

// Attach routes
app.use(authRoutes);
app.use(blogRoutes);

// Setup error handling 
app.use((req, res, next) => {
    res.render('500');
});

// Start listening
db.connectToDatabase().then(() => {
    app.listen(3000);
});