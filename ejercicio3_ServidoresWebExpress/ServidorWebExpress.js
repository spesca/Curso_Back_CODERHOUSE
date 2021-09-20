const express = require('express')
const { builtinModules } = require('module')
const app = express()
const Contenedor = require('./ClaseContenedor.js')


const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto: ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el servidor ${error}`))

const contenedorProductos = new Contenedor('./productos.txt' )

app.get('/', (req,res) => {
    res.send('<h1 style="color:green;"> Bienvenidos al servidor express </h1>')
})

app.get('/productos', async (req,res) => {
    res.send(`Listado de Productos: ${JSON.stringify(await contenedorProductos.getAll(),null,3)}`)
})

app.get('/productoRandom', async (req,res) => {
    let idMax = await contenedorProductos.getMaxId()
    let idRandom = Math.floor(Math.random() * ((idMax + 1) - 1)) + 1;
    res.send(JSON.stringify(await contenedorProductos.getById(idRandom),null,3))
})



