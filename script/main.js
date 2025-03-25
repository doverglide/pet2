let toDoForm = document.querySelector('#form');
let toDoInput = document.querySelector('#input');
let toDoBtn = document.querySelector('#btn');
let toDoList = document.querySelector('#list');
let completeList = document.querySelector('.container__list');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
};


document.addEventListener('DOMContentLoaded', function() {
    if (tasks.length > 0) {
        tasks.forEach(task => {
            cssClass = task.done ? 'task__value task__value-task--done' : 'task__value'; 
            
            const HTML = `<div class="task" id="${task.id}">
            <div class="task__content">
            ${task.done ? '' : '<input type="checkbox">'}
            <li class="${cssClass}">${task.text}</li>
            </div>
            <button type="button" class="btn btn--remove">Remove</button>
            </div>`
            
            toDoList.insertAdjacentHTML("beforeend", HTML); 
        });
    }

    removeTask();
    doneTask();
});

toDoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let taskText = toDoInput.value.trim();

    if (taskText === '') {
        return;
    }
    
    createTask(taskText);
});

function createTask(taskText) {
    
    const newTaskObject = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    createHTML(taskText, newTaskObject);
    removeTask();
    doneTask();

    toDoInput.value = '';

    tasks.push(newTaskObject);
    
    saveToLocalStorage();
};

function createHTML(taskText, newTaskObject) {

    cssClass = newTaskObject.done ? 'task__value task__value-task--done' : 'task__value';

    const taskHTML = `<div class="task" id="${newTaskObject.id}">
            <div class="task__content">
            <input type="checkbox">
            <li class="${cssClass}">${taskText}</li>
            </div>
            <button type="button" class="btn btn--remove">Remove</button>
            </div>`

        toDoList.insertAdjacentHTML('beforeend', taskHTML);
};

function removeTask() {
    let removeBtns = document.querySelectorAll('.btn--remove');

    removeBtns.forEach(btn => {
        btn.onclick = function() {
            let taskElement = this.closest('.task');
            
            if (taskElement) {
                taskElement.remove();

                const taskId = Number(taskElement.getAttribute('id'));

                tasks = tasks.filter(task => task.id !== taskId);

                saveToLocalStorage();
            }
        }
    });
};

function doneTask () {
    let doneBtns = document.querySelectorAll('input[type="checkbox"]');
    
    doneBtns.forEach(btn => {
        btn.addEventListener('change', function() {
            let taskTextElement = this.closest('.task').querySelector('.task__value');

            let taskElement = this.closest('.task').getAttribute('id');

            if (btn.checked) {
                taskTextElement.classList.add('task__value-task--done');

                btn.remove();

                const taskId = Number(taskElement);

                const task = tasks.find(task => task.id === taskId);

                if (task) {
                    task.done = true;
                }

                saveToLocalStorage();
            } 
        });
    });
};

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}