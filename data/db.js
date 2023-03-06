import * as fs from "fs"
//const path = "./Products.json"
import { randomUUID } from "crypto";

export class FileManager {
    //static idCart = 1

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
            const allGeneric = await this.getAll();
            const idFound = allGeneric.find((search) => search.id === id);
           /*  if (!idFound) {
                res.status(404).send({error: `producto con Id ${pid} no encontrado`});
            return;          
            }  */
            return idFound;
    }

 /*    async updateProduct (id, prop, newValue){
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
    } */

    async update(id, data) {
        const generic = await this.getById(id);
        if (!entidadCargada) {
          throw new Error('Entidad no encontrada');
        }
        const allGeneric = await this.getAll();
        const genericModify = { ...entidadCargada, ...data };
        const genericOut = allGeneric.filter((e) => e.id !== id);
        const newGeneric = [...genericOut, genericModify];
        const dataStr = JSON.stringify(newGeneric, null, 2);
        await fs.promises.writeFile(this.path, dataStr);
      }





    async deleteProduct(id){
        //ELIMINA UN PRODUCTO DEL ARRAY 
        const allGeneric = await this.getAll();
        const genericOut = allGeneric.filter(e => e.id !== id);
            if(allGeneric.length === genericOut.length){
            res.status(404).send({error: `producto con Id ${id} no encontrado`});
         return;
        } 
        const dataStr = JSON.stringify(genericOut);

        await fs.promises.writeFile(this.path, dataStr)
    }

    async modify (id, data) {
        const generic = await this.getAll();
        const idFound = generic.find((product) => {
            return product.id == id
        });
        if(!idFound){
            res.status(404).send({error: `producto con Id ${id} no encontrado`});
            return;
        }
        ///*  */const allGeneric = await this.getAll();
        const modifyGeneric = {...idFound, ...data};
        const genericOut = allGeneric.filter(e => e.id !== id);
        const newModify = [...genericOut, modifyGeneric];
        const dataStr = JSON.stringify(newModify);

        await fs.promises.writeFile(this.path, dataStr);
        return id;

    }
    
    async addCart(generic){
        //AGREGA PRODUCTOS AL ARRAY
        const genericOk = await this.getAll();
        const newGeneric = [...genericOk, {id, status: true, ...generic}];
        const dataStr = JSON.stringify(newGeneric);

        await fs.promises.writeFile(this.path, dataStr);
        return id;
    }


}
