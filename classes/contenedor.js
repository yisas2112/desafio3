const fs = require('fs')

module.exports = class Contenedor {
  constructor(nombre){
    this.nombre = nombre
  }

  save(objeto){    
    let obj ={}      
    let array = []
    let lastId = 0
      if(fs.existsSync(`./productos/${this.nombre}.json`)){        
        array = JSON.parse(fs.readFileSync(`./${this.nombre}.json`))
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
          "category": "smartphones",
          "thumbnail": "https://dummyjson.com/image/i/products/5/thumbnail.jpg",
          "images": [
            "https://dummyjson.com/image/i/products/5/1.jpg",
            "https://dummyjson.com/image/i/products/5/2.jpg",
            "https://dummyjson.com/image/i/products/5/3.jpg"
    ]
        }        
        
        array.push(obj)        

        fs.writeFile(`./productos/${this.nombre}.json`, JSON.stringify(array) , err =>{
          err ? console.log('Hubo un error al agregar el objeto al archivo') : console.log('Se agregó el obj correctamente al json')         
        })    
      }else{                  
          obj = {
            title : objeto.title,
            price : objeto.price,
            id : lastId + 1
          }          
          array.push(obj)
          
          fs.appendFileSync(`./productos/${this.nombre}.json`, JSON.stringify(array) , err =>{
            err ? console.log('Ocurrió un error al crear el archivo') : console.log('Se creó el archivo con éxito')
            
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