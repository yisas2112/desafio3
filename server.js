const express = require('express')
const app = express()


let Contenedor = require('./classes/contenedor.js')

const content = new Contenedor('productos')

const server = app.listen(8080, ()=>{
  console.log('Servidor escuchando en el puerto 8080')  
})

server.on("error", error =>console.log(`Error en el servidor ${error}`))


app.get('/productos', (req, res)=>{
  res.send(content.getAll())
 
})

app.get('/productoRandom', (req, res)=>{
  res.send(content.getProductRandom())
})