const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItem = document.querySelectorAll('.todo-item');

function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);
   // console.log(tag, children);
    if (children.length > 0){
        children.forEach(child => {
           //console.log(child);
            //.appendChild(); принимает только DOM елементы

            if (typeof child === 'string'){
                child = document.createTextNode(child); //создаем  узел/(DOM елемент) => (в данный момент текстовый)
            }
            element.appendChild(child);
        });
    }

    return element;
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);
}

function toggleTodoItem() {
   // console.log(event.target);
   // console.log(this);
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editTodoItem() {
    const editItem = this.parentNode;
    const title = editItem.querySelector('.title');
    const editInput = editItem.querySelector('.textfield');
    const isEditing = editItem.classList.contains('editing');
    
    if (isEditing){
        title.innerText = editInput.value;
        this.innerText = 'Изменить';
    }
    else {
        editInput.value = title.innerText;
        this.innerText = 'Сохранить';
    }

    editItem.classList.toggle('editing');
}

function deleteTodoItem() {
    const deleteItem = this.parentNode;
    todoList.removeChild(deleteItem);
}

function createTodoItem(title) {
    const checkBox = createElement('input', {type: 'checkbox', className: 'checkbox'});

    const label = createElement('label', {className: 'title'}, title);

    const editInput = createElement('input', {className: 'textfield', type: 'text'});

    const editButton = createElement('button', {className: 'edit'}, 'Изменить');

    const deleteButton = createElement('button', {className: 'delete'}, 'Delete');

    const listItem = createElement('li', {className: 'todo-item'}, checkBox, label, editInput, editButton, deleteButton);

   // console.log(listItem);
    bindEvents(listItem);

    return listItem;
}

function addTodoItem(){
    event.preventDefault(); // Для остановки отправки данных на всервер (в данный момент не нужно)
    
    if (addInput.value == ''){
        return alert ('Error');
    }
    else {
        const todoItem = createTodoItem(addInput.value);
        todoList.appendChild(todoItem);
        addInput.value = '';
    }
}

function maim(){
    todoForm.addEventListener('submit', addTodoItem);
    todoItem.forEach(item => bindEvents(item));
}
maim();

