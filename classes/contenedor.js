const fs = require('fs')

module.exports = class Contenedor {
  constructor(nombre){
    this.nombre = nombre
  }

  save(objeto){    
    let obj ={}      
    let array = []
    let lastId = 0
    let mensaje = "No se pudo agregar el producto"

    //Verificamos que el archivo exista
    if(fs.existsSync(`./productos/${this.nombre}.json`)){                          
        array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`))
        array.map((e)=>{          
        lastId = e.id
        })
        //Verificamos que la cantidad de campos sea el correcto
        if (Object.keys(objeto).length == 9){          
          obj = {
            id : lastId + 1,
            title : objeto.title,            
            price: objeto.price,
            discountPercentage: objeto.discountPercentage,
            rating: objeto.rating,
            stock: objeto.stock,
            brand: objeto.brand,
            category: objeto.category,
            thumbnail: objeto.thumbnail,
            images: objeto.images
          }        
          
          array.push(obj)        
          
          fs.writeFile(`./productos/${this.nombre}.json`, JSON.stringify(array), () =>{})
          
          mensaje = 'Se agregó correctamente el producto'
          
        }else{
          mensaje = 'Cantidad de Campos inválido'
        }   
      }else{                   
          obj = {
            id : lastId + 1,
            title : objeto.title,
            descripcion : objeto.descripcion,
            price: objeto.price,
            discountPercentage: objeto.discountPercentage,
            rating: objeto.rating,
            stock: objeto.stock,
            brand: objeto.brand,
            category: objeto.category,
            thumbnail: objeto.thumbnail,
            images: objeto.images
          }          
          array.push(obj)
          
          fs.appendFileSync(`./productos/${this.nombre}.json`, JSON.stringify(array), () =>{})    

          mensaje = 'Se agregó correctamente el producto'
      }
      
      return {obj , mensaje}
      
    }
    
    getAll(){            
      let array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`))       
       return array.length == 0 ? 'No se encontraron elementos dentro del archivo' : array

    }


    getProductRandom(){

      let array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`)) 

      const keys = Object.keys(array);

      let randomn = keys[Math.floor(Math.random() * keys.length)]
      
      let result =  array.map((e)=>{
        if(e.id == randomn){          
          return e
        }
      })

      return result
    }

    getById(id){            
      let array = []
      let dataReturn
      array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`))      
        array.map((data)=>{          
          if(data.id == id){
            dataReturn = data
          }
        })
        
        return dataReturn
    }

    updateProduct(id, objecto){
      console.log(id,objecto)
      let array = []
      let dataReturn      
      array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`))  
      console.log(Object.keys(objecto))
      console.log(Object.values(objecto))
      
        array.map((data)=>{          
          if(data.id == id){
            array[Object.keys(objecto)] = Object.values(objecto)
          }
        })
        
        return dataReturn

    }

}