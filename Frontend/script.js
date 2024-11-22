const API_URL = 'http://localhost:3000/api/tasks';

document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
        document.getElementById('task-form').reset();
        loadTasks();
    } else {
        alert('Failed to create task');
    }
});

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.title} - ${task.description} ${task.completed ? '(Completed)' : ''}
            </span>
            <button onclick="markCompleted(${task.id}, ${task.completed})">
                ${task.completed ? 'Unmark' : 'Mark as Completed'}
            </button>
            <button onclick="editTask(${task.id}, '${task.title}', '${task.description}')">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

async function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            loadTasks();
        } else {
            alert('Failed to delete task');
        }
    }
}

function editTask(id, title, description) {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'block';

    document.getElementById('edit-title').value = title;
    document.getElementById('edit-description').value = description;

    document.getElementById('edit-task-form').onsubmit = async (e) => {
        e.preventDefault();
        const updatedTitle = document.getElementById('edit-title').value;
        const updatedDescription = document.getElementById('edit-description').value;

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
        });

        if (response.ok) {
            closeModal();
            loadTasks();
        } else {
            alert('Failed to update task');
        }
    };

    document.getElementById('cancel-edit').onclick = closeModal;
}

async function markCompleted(id, isCompleted) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !isCompleted }),
    });

    if (response.ok) {
        loadTasks();
    } else {
        alert('Failed to update task status');
    }
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Load tasks when the page is loaded
loadTasks();
