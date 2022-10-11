const express = require('express')
const Contenedor = require('../classes/contenedor.js')
const routerProductos = express.Router()

const content = new Contenedor('productos')

routerProductos.get('/productos', async (req, res)=>{
  try{
    console.log('Entro en get productos')
    res.send(content.getAll())
  }catch{
    res.status(500).send('Hubo un error en el servidor')
  }
})

routerProductos.get('/productos/:id', async(req, res)=>{
  const {id} = req.params
  const product = await content.getById(id)

  if(product){
    res.json({
      message: 'Producto Encontrado',
      produc: product
    })
  }else{
    res.json({
      message: 'Producto no encontrado'
    })
  }
  
})

routerProductos.post('/productos', (req,res)=>{
  console.log(req.body)
})

module.exports = routerProductos