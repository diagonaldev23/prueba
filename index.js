require('dotenv').config()
const fs = require('fs');
const express = require('express')
const app = express()

// Devolver archivos tipo json()
app.use(express.json())

// Servir archivos estaticos
app.use(express.static('public'));

// probando un middleware
app.use((req, res, next) => {
    console.log("Middleware 1")
    next();
})

// Configurar rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', (req, res) => {
  res.json([{name:'Juan', edad: 20}, {name:'Maria', edad: 22}])
})

app.get('/api/tasks', (req, res) => {
    const data = require('./tareas.json')
    console.log(data. tareas)
    res.json(data.tareas)
  })

app.post("/api/tasks", (req, res) => {
    const body = req.body
    console.log(body)
    fs.readFile('./tareas.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error al leer el archivo:', err);
          return;
        }
      
        // Parsear el contenido JSON en un objeto JavaScript
        const tareas = JSON.parse(data);
      
        // Crear la nueva tarea
        const nuevaTarea = {
          id: 5,
          titulo: body.text,
          descripcion: 'Realizar ejercicio físico durante 30 minutos',
          estado: 'pendiente',
          fechaCreacion: '2023-05-22',
          fechaLimite: '2023-05-25'
        };
      
        // Agregar la nueva tarea al arreglo de tareas existentes
        tareas.tareas.push(nuevaTarea);
      
        // Escribir el contenido actualizado en el archivo
        fs.writeFile('tareas.json', JSON.stringify(tareas), 'utf8', (err) => {
          if (err) {
            console.error('Error al agregar la tarea:', err);
            return;
          }
          console.log('Nueva tarea agregada correctamente.');
        });
      });
    res.status(201).json({ok: true, message: 'Tarea creada con éxito'})
})

// Poner a escuchar la APP en un puerto
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})