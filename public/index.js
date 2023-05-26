window.addEventListener('load', function () {
  console.log('La página ha terminado de cargarse!!');
});

const createEditBtn = document.querySelector('#create-task');
const input = document.querySelector('#task-name');
const tasksContainer = document.querySelector('#tasks-container');

let TASK_TO_EDIT = null;

console.log(window);
const baseURL = '/api';

createEditBtn.addEventListener('click', async () => {
  const creating = !TASK_TO_EDIT;
  try {
    const path = creating ? 'tasks' : `tasks/${TASK_TO_EDIT._id}`;
    const methodToDo = creating ? 'POST' : 'PUT';
    const res = await fetch(`${baseURL}/${path}`, {
      method: methodToDo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input.value }),
    });
    if (!res.ok) {
      throw new Error('Error al crear tarea');
    }
    const data = await res.json();
    input.value = '';
    createEditBtn.innerText = 'Crear tarea';
    getTasks();
    console.log(data);
  } catch (error) {}
});

async function getTasks() {
  tasksContainer.innerHTML = '';
  try {
    const response = await fetch(`${baseURL}/tasks`);
    if (!response.ok) {
      throw new Error('Error al obtener datos');
    }
    const { data } = await response.json();
    data.forEach((element) => {
      const taskContainerDiv = document.createElement('div');
      const taskParagraph = document.createElement('p');
      const deleteTaskBtn = document.createElement('button');

      taskContainerDiv.classList.add('container-div');

      taskParagraph.innerText = element.name;
      taskParagraph.addEventListener('click', () => {
        input.value = element.name;
        createEditBtn.innerText = 'Editar tarea';
        TASK_TO_EDIT = element;
      });

      deleteTaskBtn.innerText = 'Borrar Tarea';
      deleteTaskBtn.setAttribute('id', element._id);
      deleteTaskBtn.classList.add('button', 'button-red');
      deleteTaskBtn.addEventListener('click', (event) => {
        const taskId = event.target.id;
        deleteTaskBtn.innerText = 'Borrando...';
        fetch(`${baseURL}/tasks/${taskId}`, {
          method: 'DELETE',
        }).then(() => {
          const taskDiv = deleteTaskBtn.parentElement;
          taskDiv.remove();
        });
      });

      taskContainerDiv.appendChild(taskParagraph);
      taskContainerDiv.appendChild(deleteTaskBtn);

      tasksContainer.appendChild(taskContainerDiv);
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

input.addEventListener('input', (event) => {
  console.log('Evento del input', event);
  if (event.target.value.trim() === '') {
    createEditBtn.innerText = 'Crear tarea';
    TASK_TO_EDIT = null;
  }
});

getTasks();
