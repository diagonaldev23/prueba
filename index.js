require('dotenv').config()
const http = require('http')

const server = http.createServer(requestController)

// Configurar nuestro servidor
function requestController (req, res) {
    console.log('Hello, World desde RENDER!')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('<h1>Hello, World desde RENDER!</h1>')

}

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log("Servidor en ejecución en el puerto", PORT)
})
