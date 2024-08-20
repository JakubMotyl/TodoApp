const inputEL = document.getElementById('input');
const buttonEl = document.getElementById('button');
const mainEl = document.querySelector('.main');

// Generate Todo

buttonEl.addEventListener('click', () => {
  generateTodo();
  saveTodos();
});

// Load LocalStorage

window.addEventListener('load', () => {
  loadTodos();
});

function generateTodo(todo) {

  // Date

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const fullDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  const fullTime = `${hours < 10 ? '0' + hours : hours}-${minutes < 10 ? '0' + minutes : minutes}`;

  // Check if todo was written
  
  const todoText = todo ? todo.text : inputEL.value.trim();
  const status = todo ? todo.status : 'default';

  if (todoText === '') {
    alert(`You haven't written any task!`);
    return;
  }

  // Todo Item

  const todoItem = document.createElement('div');
  todoItem.classList.add('todo-container');
  todoItem.innerHTML = `
    <div class="todo-tools">
      <p class="progressBtn" id="progress">In Progress</p>
      <p class="doneBtn" id="done">Mark as Done</p>
      <p class="deleteBtn" id="delete">Delete</p>
    </div>
    <div class="todo-content ${status !== 'default' ? status : ''}">
      <div class="todo">
        <p class="todo-text">${todoText}</p>
      </div>
      <div class="date">
        <span>${fullDate}, ${fullTime}</span>
      </div>
    </div>
  `;

  const todoContentEl = todoItem.querySelector('.todo-content');
  const todoToolsEl = todoItem.querySelector('.todo-tools');
  const progressBtn = todoItem.querySelector('.progressBtn');
  const doneBtn = todoItem.querySelector('.doneBtn');
  const deleteBtn = todoItem.querySelector('.deleteBtn');

  // Set default status

  if (status === 'default') {
    todoContentEl.classList.add('default');
  }

  // Make todo default if status is not chosen

  todoContentEl.addEventListener('click', () => {
    if (todoContentEl.classList.contains('progress') || todoContentEl.classList.contains('done')) {
      todoContentEl.classList.remove('progress', 'done');
      todoContentEl.classList.add('default');
      saveTodos();
    }
    todoToolsEl.classList.toggle('active');
  });

  // Progress status button

  progressBtn.addEventListener('click', () => {
    todoContentEl.classList.remove('default', 'done');
    todoContentEl.classList.add('progress');
    todoToolsEl.classList.remove('active');
    saveTodos();
  });

  // Done status button

  doneBtn.addEventListener('click', () => {
    todoContentEl.classList.remove('default', 'progress');
    todoContentEl.classList.add('done');
    todoToolsEl.classList.remove('active');
    saveTodos();
  });

  // Delete status button

  deleteBtn.addEventListener('click', () => {
    todoItem.remove();
    saveTodos();
  });

  mainEl.appendChild(todoItem);
  inputEL.value = '';
}

// Local Storage

function saveTodos() {
  const todos = [];
  document.querySelectorAll('.todo-container').forEach(todoItem => {
    const todoText = todoItem.querySelector('.todo-text').innerText;
    const status = todoItem.querySelector('.todo-content').classList.contains('done') ? 'done' :
                   todoItem.querySelector('.todo-content').classList.contains('progress') ? 'progress' :
                   'default';
    
    todos.push({ text: todoText, status });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  savedTodos.forEach(todo => generateTodo(todo));
}
