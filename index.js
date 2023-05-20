const http = require('http')

const server = http.createServer(requestController)

// Configurar nuestro servidor
function requestController (req, res) {
    console.log("hola")

}

server.listen(3001)
