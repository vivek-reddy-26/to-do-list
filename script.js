document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const taskText = todoInput.value.trim(); 
        if (taskText) {
            addTask(taskText); 
            todoInput.value = ''; 
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li'); 
        li.innerHTML = `
            <span>${taskText}</span>
            <input type="text">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        todoList.appendChild(li);

        li.classList.add('new-task');
        setTimeout(() => li.classList.remove('new-task'), 300);

        li.querySelector('.delete').addEventListener('click', () => {
            li.classList.add('removed-task');
            li.addEventListener('transitionend', () => li.remove());
        });

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        const editButton = li.querySelector('.edit');
        const saveButton = document.createElement('button');
        saveButton.classList.add('save');
        saveButton.textContent = 'Save';
        saveButton.style.display = 'none';
        li.appendChild(saveButton);

        const span = li.querySelector('span');
        const input = li.querySelector('input[type="text"]');

        editButton.addEventListener('click', () => {
            input.style.display = 'block';
            input.value = span.textContent;
            span.style.display = 'none';
            editButton.style.display = 'none';
            saveButton.style.display = 'inline';
        });

        saveButton.addEventListener('click', () => {
            span.textContent = input.value;
            input.style.display = 'none';
            span.style.display = 'inline';
            editButton.style.display = 'inline';
            saveButton.style.display = 'none';
        });
    }
});
