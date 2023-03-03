import * as fs from "fs"
//const path = "./Products.json"
import { randomUUID } from "crypto";

export class FileManager {
    //static id = 1

    constructor(path){
        this.path = path
    }    
    
    async add(generic){
        //AGREGA PRODUCTOS AL ARRAY
        const id = randomUUID()
        const genericOk = await this.getAll();
        const newGeneric = [...genericOk, {id, status: true, ...generic}];
        const dataStr = JSON.stringify(newGeneric);

        await fs.promises.writeFile(this.path, dataStr);
        return id;
    }

    async getAll(){
        //NOS MUESTRA EL ARRAY DE PRODUCTOS
        try {
            const allGeneric = await fs.promises.readFile(this.path);
        return JSON.parse(allGeneric)
            
        } catch (error) {
            console.error(error)
            return [];          
        }

    }

    async getById(id){
        //RECIBE UN ID, Y CHEKEA QUE ESTE EN EL ARRAY, SI LO ENCUNTRA LO DEVUELVE POR CONSOLA
            const allGeneric = await this.getAll();
            //console.log(products)
            const idFound = allGeneric.find(search => (search.id === id));
            if (idFound) {
                return console.log(idFound)            
            } else {
                console.error("El producto no existe")                
            }
               
    }

    async updateProduct (id, prop, newValue){
        //PERMITE EDITAR INFORMACION DE LOS PRODUCTOS POR MEDIO DEL ID DEL PRODUCTO A ACTUALIZAR
        const allGeneric = await this.getAll();
        const idFound = allGeneric.find((product) => {
            return product.id === id
        })
        if (idFound) {
            idFound[prop] = newValue
            //console.log(idFound)
            const dataStr = JSON.stringify(idFound)
            fs.promises.writeFile(this.path, dataStr)            
        } else{
            console.log("El id no se encuentra")  
        }   
    }

    async deleteProduct(id){
        //ELIMINA UN PRODUCTO DEL ARRAY 
        const allGeneric = await this.getAll();
        const genericOut = allGeneric.filter(e => e.id !== id);
        /* const idFound = allGeneric.filter(function(product){
            return product.id != id
        }) */
      /*   
        if(products.length === idFound.length){
            console.log("no se encontro id Producto")
        } else {
            console.log(idFound)

        } */
        const dataStr = JSON.stringify(genericOut);

        await fs.promises.writeFile(this.path, dataStr)
    }

    async modify (id, data) {
        const generic = await this.getById(id);
        if(!generic){
            console.log("Product not found");
            return;
        }
        const allGeneric = await this.getAll();
        const modifyGeneric = {...generic, ...data};
        const genericOut = allGeneric.filter(e => e.id !== id);
        const newModify = [...genericOut, modifyGeneric];
        const dataStr = JSON.stringify(newModify);

        await fs.promises.writeFile(this.path, dataStr);
        


    }

}
