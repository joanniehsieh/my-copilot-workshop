const STORAGE_KEY = 'offline-todo-items';
const FILTER_STORAGE_KEY = 'offline-todo-filter';
const VALID_FILTERS = ['all', 'active', 'completed'];

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const emptyMessage = document.querySelector('#empty-message');
const remainingCount = document.querySelector('#remaining-count');
const clearCompletedButton = document.querySelector('#clear-completed');
const filterButtons = document.querySelectorAll('.filter-button');
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('#theme-icon');
const themeLabel = document.querySelector('#theme-label');

let todos = loadTodos();
let currentFilter = loadFilter();
const themePreference = localStorage.getItem('offline-todo-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// 從瀏覽器儲存空間載入待辦事項。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

// 將目前的待辦事項保存到瀏覽器儲存空間。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 從瀏覽器儲存空間載入篩選條件，無效值則回到全部。
function loadFilter() {
  const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY);
  return VALID_FILTERS.includes(savedFilter) ? savedFilter : 'all';
}

// 更新篩選按鈕的選中狀態。
function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

// 依照手動選擇或作業系統偏好套用主題。
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? '淺色模式' : '深色模式';
  themeToggle.setAttribute('aria-label', isDark ? '切換至淺色模式' : '切換至深色模式');
}

function getPreferredTheme() {
  return themePreference || (systemPrefersDark.matches ? 'dark' : 'light');
}

// 取得目前篩選條件下要顯示的待辦事項。
function getVisibleTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

// 更新清單畫面與未完成數量。
function renderTodos() {
  todoList.replaceChildren();

  const visibleTodos = getVisibleTodos();
  visibleTodos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    if (todo.completed) {
      listItem.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.className = 'todo-check';
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `標記「${todo.text}」為${todo.completed ? '未完成' : '已完成'}`);
    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.textContent = '刪除';
    deleteButton.setAttribute('aria-label', `刪除「${todo.text}」`);
    deleteButton.addEventListener('click', () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    listItem.append(checkbox, text, deleteButton);
    todoList.append(listItem);
  });

  const incompleteCount = todos.filter((todo) => !todo.completed).length;
  remainingCount.textContent = `未完成：${incompleteCount} 項`;
  emptyMessage.textContent = visibleTodos.length === 0 && todos.length > 0
    ? currentFilter === 'active' ? '目前沒有未完成的待辦事項。' : '目前沒有已完成的待辦事項。'
    : '還沒有任何待辦事項，新增一個吧!';
  emptyMessage.hidden = visibleTodos.length > 0;
  clearCompletedButton.hidden = !todos.some((todo) => todo.completed);
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  todoForm.reset();
  todoInput.focus();
});

clearCompletedButton.addEventListener('click', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    localStorage.setItem(FILTER_STORAGE_KEY, currentFilter);
    updateFilterButtons();
    renderTodos();
  });
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  localStorage.setItem('offline-todo-theme', nextTheme);
  applyTheme(nextTheme);
});

systemPrefersDark.addEventListener('change', (event) => {
  if (!localStorage.getItem('offline-todo-theme')) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});

applyTheme(getPreferredTheme());
updateFilterButtons();
renderTodos();
