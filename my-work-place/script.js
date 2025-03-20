// === LOGIN LOGIC ===
const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginEmail = document.getElementById('loginEmail');

// Check if user is already "logged in"
let storedEmail = localStorage.getItem('myWorkPlaceEmail');
if (!storedEmail) {
  // Show modal
  loginModal.style.display = 'flex';
} else {
  // Hide modal, show logout
  loginModal.style.display = 'none';
  logoutBtn.style.display = 'block';
}

loginBtn.addEventListener('click', () => {
  const emailValue = loginEmail.value.trim();
  if (emailValue) {
    localStorage.setItem('myWorkPlaceEmail', emailValue);
    loginModal.style.display = 'none';
    logoutBtn.style.display = 'block';
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('myWorkPlaceEmail');
  location.reload();
});

// === THEME TOGGLE (DARK/LIGHT) ===
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light-mode', themeToggle.checked);
});

// If user had a preference, you could store it in localStorage as well
// For simplicity, it's not stored here, but you can add that if you wish.

// === TIMER LOGIC (SIMPLE STOPWATCH) ===
let timerInterval;
let elapsedSeconds = 0;

const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimer');
const stopTimerBtn = document.getElementById('stopTimer');
const resetTimerBtn = document.getElementById('resetTimer');

function updateTimerDisplay() {
  let hrs = Math.floor(elapsedSeconds / 3600);
  let mins = Math.floor((elapsedSeconds % 3600) / 60);
  let secs = elapsedSeconds % 60;

  hrs = hrs < 10 ? '0' + hrs : hrs;
  mins = mins < 10 ? '0' + mins : mins;
  secs = secs < 10 ? '0' + secs : secs;

  timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

startTimerBtn.addEventListener('click', () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      updateTimerDisplay();
    }, 1000);
  }
});

stopTimerBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

resetTimerBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedSeconds = 0;
  updateTimerDisplay();
});

// === TASKS LOGIC ===
const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');

let tasks = JSON.parse(localStorage.getItem('myWorkPlaceTasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.classList.add('task-text');

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('task-buttons');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);
  });

  // Update stats
  document.getElementById('taskCount').textContent = `Tasks: ${tasks.length}`;
}

function saveTasks() {
  localStorage.setItem('myWorkPlaceTasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText });
    saveTasks();
    renderTasks();
    newTaskInput.value = '';
  }
});

// === CHECKLIST LOGIC ===
const checklistContainer = document.getElementById('checklistContainer');
const newChecklistInput = document.getElementById('newChecklistInput');
const addChecklistBtn = document.getElementById('addChecklistBtn');

let checklists = JSON.parse(localStorage.getItem('myWorkPlaceChecklists')) || [];

function renderChecklists() {
  checklistContainer.innerHTML = '';
  checklists.forEach((checklist, index) => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = checklist.text;
    span.classList.add('checklist-text');

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('checklist-buttons');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit checklist:', checklist.text);
      if (newText !== null && newText.trim() !== '') {
        checklists[index].text = newText.trim();
        saveChecklists();
        renderChecklists();
      }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      checklists.splice(index, 1);
      saveChecklists();
      renderChecklists();
    });

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);
    checklistContainer.appendChild(li);
  });

  // Update stats
  document.getElementById('checklistCount').textContent = `Checklists: ${checklists.length}`;
}

function saveChecklists() {
  localStorage.setItem('myWorkPlaceChecklists', JSON.stringify(checklists));
}

addChecklistBtn.addEventListener('click', () => {
  const checklistText = newChecklistInput.value.trim();
  if (checklistText) {
    checklists.push({ text: checklistText });
    saveChecklists();
    renderChecklists();
    newChecklistInput.value = '';
  }
});

// === INIT ===
function init() {
  updateTimerDisplay();
  renderTasks();
  renderChecklists();
}

init();
