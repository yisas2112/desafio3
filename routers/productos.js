const express = require('express')
const Contenedor = require('../classes/contenedor.js')
const routerProductos = express.Router()

const content = new Contenedor('productos')


// routerProductos.get('/productos', async (req, res)=>{
//   res.render('home')      
// })


//ejs
routerProductos.get('/productos', async (req, res)=>{  
  let result = content.getAll()
  console.log(result)
  res.render('home',{
    productos : result
  })
  
  
})


routerProductos.get('/productos/listaProductos', async (req, res)=>{
  let result = content.getAll()
  console.log(result)
  res.render('listproductos',{
    productos : result
  })    
  
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
  content.save(req.body)
  
  res.redirect("/api/productos")

})


routerProductos.put('/productos/:id', async(req,res)=>{
  const {id} = req.params  
  const objeto = req.body  

  let result = content.updateProduct(id, objeto)
  console.log(result)
  res.json({
    message: result.mensaje,
    response: result.dataReturn
  })  
  
})

routerProductos.delete('/productos/:id', async(req,res)=>{
  const {id} = req.params  
  let result = content.deleteProduct(id)
  console.log(result)
  res.json({
    message: result.mensaje  
  })  
  
})

module.exports = routerProductos