require('dotenv').config()
const http = require('http')

const server = http.createServer(requestController)

// Configurar nuestro servidor
function requestController (req, res) {
    res.send("<h1>Hola Mundo desde render</h1>");
    res.end();

}

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log("Servidor en ejecución en el puerto", PORT)
})
