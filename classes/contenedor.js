const fs = require('fs')

module.exports = class Contenedor {
  constructor(nombre){
    this.nombre = nombre
  }

  save(objeto){    
    let obj ={}      
    let array = []
    let lastId = 0
    let mensaje = ""
    
      if(fs.existsSync(`./productos/${this.nombre}.json`)){              
        array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`))
         array.map((e)=>{          
          lastId = e.id

        })

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

        fs.writeFile(`./productos/${this.nombre}.json`, JSON.stringify(array) , err =>{
          err ? mensaje =  'Hubo un error al agregar el objeto al archivo' : mensaje = 'Se agregó el obj correctamente al json'    
          return obj
        })    
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
          
          fs.appendFileSync(`./productos/${this.nombre}.json`, JSON.stringify(array) , err =>{
            err ? mensaje = 'Ocurrió un error al crear el archivo' : mensaje = 'Se creó el archivo con éxito'
            return mensaje
          })    
      }
      
      
      
    }
    
    getAll(){            
      let array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`)) 
      console.log(array)
       return array.length == 0 ? 'No se encontraron elementos dentro del archivo' : array

    }


    getProductRandom(){

      let array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`)) 

      const keys = Object.keys(array);

      let randomn = keys[Math.floor(Math.random() * keys.length)]
      
      let result =  array.map((e)=>{
        if(e.id == randomn){
          console.log(e)
          return e
        }
      })

      return result
    }

    getById(id){      
      console.log(id)
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

  




}