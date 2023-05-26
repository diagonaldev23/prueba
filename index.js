require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Conexion a la base de datos realizada correctamente!');
  })
  .catch((err) => {
    console.log('ERROR al conectarse a la base de datos.', err);
  });

const taskSchema = new Schema({
  name: String,
  done: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

// Devolver archivos tipo json()
app.use(express.json());

// Servir archivos estaticos
app.use(express.static('public'));

// probando un middleware
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

// Configurar rutas
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/tasks', (req, res) => {
  Task.find()
    .then((tasks) => {
      res.status(200).json({ ok: true, data: tasks });
    })
    .catch((err) => {
      res.status(400).json({ ok: false, message: 'Hubo un error al obtener las tareas' });
    });
});

app.post('/api/tasks', (req, res) => {
  const body = req.body;
  console.log(body);
  const task1 = Task.create({
    name: body.text,
    done: false,
  })
    .then((createdTask) => {
      res.status(201).json({ ok: true, message: 'Tarea creada con éxito', data: createdTask });
    })
    .catch((err) => {
      res.status(400).json({ ok: false, message: 'Error al crear la tarea' });
    });
});

app.put('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body);
  const task1 = Task.findByIdAndUpdate(id, {
    name: body.text,
  })
    .then((updatedTask) => {
      res.status(200).json({ ok: true, message: 'Tarea editada con éxito', data: updatedTask });
    })
    .catch((err) => {
      res.status(400).json({ ok: false, message: 'Error al editar la tarea' });
    });
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  Task.findByIdAndRemove(id)
    .then((deletedTask) => {
      res.status(200).json({ ok: true, data: deletedTask });
    })
    .catch((err) => {
      res.status(400).json({ ok: false, message: 'Hubo un error al eliminar la tarea' });
    });
});

// Poner a escuchar la APP en un puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
