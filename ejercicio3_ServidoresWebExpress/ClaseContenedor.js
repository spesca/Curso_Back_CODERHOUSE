const { Console } = require('console')
const fs = require('fs')

class Contenedor {

    constructor(nombre){
        this.nombreArchivo = nombre 
    }

    async getMaxId(){
        const array = await this.getAll()
        const arrayId = array.map(function(x) {
            return x.id
        })
        let maxId = 0
        if(arrayId.length > 0) {
            maxId = Math.max.apply(null, arrayId)
        }
        return maxId
    }

    async save(objeto){
        let id = await this.getMaxId()
        id += 1
        Object.assign(objeto, {id: id})
        const array = await this.getAll()
        array.push(objeto)
        await this.write(array)
        return id
    }

    async getAll(){
        try {
            const json = await fs.promises.readFile(this.nombreArchivo)
            return JSON.parse(json,'utf-8') 
        } catch(error){
            return []
        }
    }

    async write(arrayProductos =[]){
        try {
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(arrayProductos,null,2),'utf-8') 
        } catch(error){
            console.log('Error al escribir')
        }
    }

    async getById(id){
        const array = await this.getAll()
        const objeto = array.filter(function (array) { return array.id == id; })
        return (objeto.length > 0) ? objeto[0] : null
    }

    async deleteById(id){
        const array = await this.getAll()
        await this.write(array.filter(function (array) { return array.id !== id; }))
    }

    async deleteAll(){
        await this.write()
    }
}

module.exports = Contenedor
