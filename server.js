const express = require("express");
const routerProductos = require('./routers/productos')
const app = express()
const {Server} = require("socket.io");



const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=>console.log(`listening on port ${PORT}`));

const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next)=>{
  req.io = io

  return next
})

app.use('/api', routerProductos)











