const fs = require('fs')

module.exports = class Contenedor {
  constructor(nombre){
    this.nombre = nombre
  }

  save(objeto){    
    let obj ={}      
    let array = []
    let lastId = 0
      if(fs.existsSync(`./${this.nombre}.json`)){        
        array = JSON.parse(fs.readFileSync(`./${this.nombre}.json`))
        array.map((e)=>{
          lastId = e.id
        })

        obj = {
          title : objeto.title,
          price : objeto.price,
          id : lastId + 1
        }        
        
        array.push(obj)        

        fs.writeFile(`./${this.nombre}.json`, JSON.stringify(array) , err =>{
          err ? console.log('Hubo un error al agregar el objeto al archivo') : console.log('Se agregó el obj correctamente al json')         
        })    
      }else{                  
          obj = {
            title : objeto.title,
            price : objeto.price,
            id : lastId + 1
          }          
          array.push(obj)
          
          fs.appendFileSync(`./${this.nombre}.json`, JSON.stringify(array) , err =>{
            err ? console.log('Ocurrió un error al crear el archivo') : console.log('Se creó el archivo con éxito')
            
          })    
      }
    }

    getById(id){      
      let array = []
      let dataReturn
      array = JSON.parse(fs.readFileSync(`./${this.nombre}.json`))      
        array.map((data)=>{          
          data.id == id ? (dataReturn = data) : dataReturn = 'El elemento no existe'          
        })
        
        return console.log(dataReturn)
    }

    getAll(){            
      let array = JSON.parse(fs.readFileSync(`./productos/${this.nombre}.json`)) 
                       
       return array.length == 0 ? 'No se encontraron elementos dentro del archivo' : array
      
      

    }

    deleteById(id){
      
      let newArry = []
      let data = fs.readFileSync(`./${this.nombre}.json`)                    
      let array = JSON.parse(data)                

        array.map((e,index)=>{
          if(e.id !== id){
            newArry.push(e)
          }
        })

        fs.writeFile(`./${this.nombre}.json`, JSON.stringify(newArry) , err =>{
          err ? console.log('Ocurrió un error al eliminar el elemento') : console.log('Se eliminó el objeto correctamente')
        })    
    }

    deleteAll(){
      let arrayVacio = []

      fs.writeFile(`./${this.nombre}.json`, JSON.stringify(arrayVacio) , err =>{
        err ? console.log('Ocurrió un error al eliminar todos los elementos') : console.log('Se eliminaron todos los elementos')
     
      })    

    }




}