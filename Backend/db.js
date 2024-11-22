const mysql = require('mysql');

// Configure database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '123456', 
    database: 'todo_list'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

module.exports = db;
