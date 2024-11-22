const db = require('../db');

// Create Task Model Functions
const Task = {
    create: (title, description, callback) => {
        const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
        db.query(query, [title, description], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM tasks';
        db.query(query, callback);
    },
    update: (id, updates, callback) => {
        const query = 'UPDATE tasks SET ? WHERE id = ?';
        db.query(query, [updates, id], callback);
    },
    markCompleted: (id, completed, callback) => {
        const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
        db.query(query, [completed, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM tasks WHERE id = ?';
        db.query(query, [id], callback);
    },
};

module.exports = Task;
