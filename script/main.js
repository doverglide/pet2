let toDoForm = document.querySelector('#form');
let toDoInput = document.querySelector('#input');
let toDoBtn = document.querySelector('#btn');
let toDoList = document.querySelector('#list');
let completeList = document.querySelector('.complete__list');

toDoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let taskText = toDoInput.value;
    let newTask = createTask(taskText);

    toDoList.appendChild(newTask);
    
    toDoInput.value = '';
    toDoInput.focus();

    return taskText;
});

function createTask(taskText) {
    let taskWrap = document.createElement('div');
    taskWrap.classList.add('li-wrapper');

    let taskContent = document.createElement('div');
    taskContent.classList.add('li-wrapper__content');

    let taskControls = document.createElement('div');
    taskControls.classList.add('li-wrapper__btns');

    let newTask = document.createElement('li');
    newTask.textContent = taskText;

    let checkBox = handleCompletion(taskWrap, newTask);
    let removeBtn = removeTask(taskWrap);
    let editBtn = editTask(taskContent, taskControls, newTask, removeBtn, checkBox);

    taskContent.appendChild(checkBox);
    taskContent.appendChild(newTask);

    taskControls.appendChild(editBtn);
    taskControls.appendChild(removeBtn);

    taskWrap.appendChild(taskContent);
    taskWrap.appendChild(taskControls);

    taskWrap.style.opacity = '0';

    requestAnimationFrame(() => {
        taskWrap.style.opacity = '1';
    });


    return taskWrap;
};

function removeTask(taskWrap) {
    let removeBtn = document.createElement('button');
    removeBtn.setAttribute('type', 'button');
    removeBtn.classList.add('btn', 'btn--remove');
    removeBtn.textContent = 'Remove';

    removeBtn.addEventListener('click', function() {
        taskWrap.style.opacity = '0';
    
        setTimeout(() => {
            taskWrap.remove();
        }, 250);
    });
    
    return removeBtn;
};

function handleCompletion(taskWrap, newTask) {
    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');

    checkBox.addEventListener('change', function() {
        if (checkBox.checked) {
            newTask.style.color = 'green';
            newTask.style.textDecoration = 'line-through';
    
            let completeTextTask = newTask;
            let completeTask = document.createElement('li');
    
            setTimeout(() => {
                taskWrap.style.opacity = '0';
    
                setTimeout(() => {
                    taskWrap.remove();
    
                    completeTask.appendChild(completeTextTask);
                    completeList.appendChild(completeTask);
    
                    completeTask.style.opacity = '1';
                }, 600);
            }, 400);
    
        } else {
            newTask.style.color = 'black';
            newTask.style.textDecoration = 'none';
        }
    });

    return checkBox;
};

function editTask(taskContent,  taskControls, newTask, removeBtn, checkBox) {
    let editBtn = document.createElement('button');
    editBtn.setAttribute('type', 'button');
    editBtn.classList.add('btn', 'btn--edit');
    editBtn.textContent = 'Edit';

    editBtn.addEventListener('click', function() {
        checkBox.remove();
        removeBtn.remove();
    
        let saveBtn = document.createElement('button');
        saveBtn.setAttribute('type', 'button');
        saveBtn.classList.add('btn', 'btn--save');
        saveBtn.innerHTML = 'Save';
    
        let inputEdit = document.createElement('input');
        inputEdit.setAttribute('type', 'text');
        inputEdit.classList.add('input--edit');
        inputEdit.value = newTask.textContent;
    
        taskContent.style.width = '85%';
    
        taskContent.replaceChild(inputEdit, newTask);
        taskControls.replaceChild(saveBtn, editBtn);
    
        saveBtn.addEventListener('click', function() {
            saveBtn.remove();
    
            newTask.textContent = inputEdit.value;
    
            taskContent.replaceChild(newTask, inputEdit);
    
            taskContent.appendChild(checkBox);
            taskControls.appendChild(editBtn);
            taskControls.appendChild(removeBtn);
    
            taskContent.replaceChildren(checkBox, newTask);
        });
    });

    return editBtn;
};