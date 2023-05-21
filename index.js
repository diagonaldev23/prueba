require('dotenv').config()
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
    res.json([{fecha: "20/05/2023", todo: "Compras"},{fecha: "20/05/2023", todo: "Cocinar"}, {fecha: "20/05/2023", todo: "Estudiar"}])
  })

app.post("/api/tasks", (req, res) => {
    const body = req.body
    console.log(body)
    res.status(201).json({ok: true, message: 'Tarea creada con éxito'})
})

// Poner a escuchar la APP en un puerto
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})