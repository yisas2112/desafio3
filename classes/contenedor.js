const fs = require('fs')

module.exports = class Contenedor {
  constructor(nombre){
    this.nombre = nombre
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

  




}