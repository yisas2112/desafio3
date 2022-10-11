const express = require("express");
const routerProductos = require('./routers/productos')

const app = express()

app.listen(8080, ()=>console.log('Servidor Activo'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api', routerProductos)






