require('dotenv').config()
const http = require('http')
const fs = require('fs')

const server = http.createServer(requestController)

// Configurar nuestro servidor
function requestController (req, res) {
    const url = req.url
    const method = req.method

    if(method === 'GET' && url === '/') {
        fs.readFile('./public/index.html', (err, file) => {
            if(err) {
                console.log('Hubo un error')
                return
            }

            res.write(file)
            res.end()
        })
        return

    }
    if(method === 'GET' && url === '/about') {
        res.setHeader("Content-type", "text/html; charset=utf-8")
        res.write("<h1>Pagina about</h1>")
        res.end()
        return
    }
    
    res.setHeader("Content-type", "text/html; charset=utf-8")
    res.write("<h1>Pagina no encontrada</h1>")
    res.end()
    return
    // console.log('Hello, World desde RENDER!')
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('<h1>Hello, World desde RENDER!</h1>')

}

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log("Servidor en ejecución en el puerto", PORT)
})
