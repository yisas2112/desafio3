const express = require("express");
const routerProductos = require('./routers/productos')
const handlebars= require("express-handlebars")
const path = require("path")
const app = express()

app.listen(8080, ()=>console.log('Servidor Activo'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine("handlebars", handlebars.engine())
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

app.use('/api', routerProductos)







