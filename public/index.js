window.addEventListener('load', function() {
    console.log('La página ha terminado de cargarse!!');
});

const getBtn = document.querySelector('#get-tasks')
const createBtn = document.querySelector('#create-task')
const input = document.querySelector('#task-name')

getBtn.addEventListener('click', async () => {
    console.log('GET TAREAS')
    let data = ''
    try {
        const response = await fetch('http://localhost:4000/api/tasks')
        if(!response.ok) {
            throw new Error('Error al obtener datos')
        }
        data = await response.json();
        console.log(data)
        
    } catch (error) {
        console.error(error)
    }

    data.forEach(element => {
        
        const respuesta = document.createElement('div')
        respuesta.innerHTML = `
        <h2>${element.titulo}</h2>
        <p>${element.descripcion}</p>
        <p>Estado: ${element.estado}</p>
        <p>Fecha de creación: ${element.fechaCreacion}</p>
        <p>Fecha límite: ${element.fechaLimite}</p>
      `;
        document.querySelector('body').appendChild(respuesta)
    });
    
})

createBtn.addEventListener('click', async () => {
    console.log('CREATE TAREAS')
    console.log({input})
    fetch('http://localhost:4000/api/tasks', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text: input.value})
    })

})
