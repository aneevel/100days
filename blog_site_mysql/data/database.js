const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'blog_site',
    user: 'root',
    password: 'A1Pale2Facade3'
});

module.exports = pool;