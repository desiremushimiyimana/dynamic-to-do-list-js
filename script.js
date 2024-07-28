document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage on page load
    loadTasks();

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            removeTaskFromStorage(taskText);
        };

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        saveTaskToStorage(taskText);

        taskInput.value = '';
    }

    function saveTaskToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const taskItem = document.createElement('li');
            taskItem.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            removeButton.onclick = () => {
                taskList.removeChild(taskItem);
                removeTaskFromStorage(taskText);
            };

            taskItem.appendChild(removeButton);
            taskList.appendChild(taskItem);
        });
    }
});
