const http = require('http')

const server = http.createServer(requestController)

// Configurar nuestro servidor
function requestController (req, res) {
    res.send("<h1>Hola Mundo desde render</h1>");
    res.end();

}

server.listen(3001, () => {
    console.log("Servidor en ejecución")
})
