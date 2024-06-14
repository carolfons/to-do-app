document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    addTaskButton.addEventListener('click', addTask);
    loadTasks(); // Carrega as tarefas do Local Storage ao carregar a página

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const listItem = createTaskItem(taskText);
            taskList.appendChild(listItem);
            taskInput.value = '';
            taskInput.focus();
            saveTasks(); // Salva as tarefas no Local Storage
        }
    }

    function createTaskItem(taskText, completed = false) {
        const listItem = document.createElement('li');

        if (completed) {
            listItem.classList.add('completed');
        }

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔';
        completeButton.className = 'complete';
        completeButton.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            saveTasks(); // Salva as tarefas no Local Storage
        });
        listItem.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = '✏';
        editButton.className = 'edit';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edite a tarefa:', taskSpan.textContent);
            if (newTaskText !== null) {
                taskSpan.textContent = newTaskText;
                saveTasks(); // Salva as tarefas no Local Storage
            }
        });
        listItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            saveTasks(); // Salva as tarefas no Local Storage
        });
        listItem.appendChild(deleteButton);

        return listItem;
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            const taskText = listItem.querySelector('span').textContent;
            const completed = listItem.classList.contains('completed');
            tasks.push({ text: taskText, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const listItem = createTaskItem(task.text, task.completed);
            taskList.appendChild(listItem);
        });
    }
});
