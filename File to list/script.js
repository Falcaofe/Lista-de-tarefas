// Script para Lista de Tarefas
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((tarefa, i) => {
    const li = document.createElement('li');
    li.className = tarefa.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${tarefa.text}</span>
      <div class="actions">
        <button class="complete">${tarefa.completed ? 'Desfazer' : 'Concluir'}</button>
        <button class="remove">Remover</button>
      </div>
    `;
    // Botão de concluir/desfazer
    li.querySelector('.complete').onclick = () => {
      tasks[i].completed = !tasks[i].completed;
      saveTasks();
      renderTasks();
    };
    // Botão de remover
    li.querySelector('.remove').onclick = () => {
      tasks.splice(i, 1);
      saveTasks();
      renderTasks();
    };
    list.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({text, completed: false});
    input.value = '';
    saveTasks();
    renderTasks();
  }
};

renderTasks();