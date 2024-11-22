const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Create a task
router.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Task title cannot be empty' });
    }
    Task.create(title, description, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to create task' });
        res.status(201).json({ message: 'Task created successfully' });
    });
});

// Get all tasks
router.get('/tasks', (req, res) => {
    Task.getAll((err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch tasks' });
        res.json(results);
    });
});

// Update a task
router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    Task.update(id, updates, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update task' });
        res.json({ message: 'Task updated successfully' });
    });
});

// Mark a task as completed or uncompleted
router.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    if (typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid value for completed' });
    }

    Task.markCompleted(id, completed, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update task status' });
        res.json({ message: `Task marked as ${completed ? 'completed' : 'not completed'}` });
    });
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    Task.delete(id, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete task' });
        res.json({ message: 'Task deleted successfully' });
    });
});

module.exports = router;
