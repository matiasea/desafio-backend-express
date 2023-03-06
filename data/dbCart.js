import * as fs from "fs"
import { randomUUID } from "crypto";
//const path = "./cart.json"

export class Cart {
    static id = 1;
    constructor(path){
        this.path = path
    }

    async getAllCarts(){
        //NOS MUESTRA EL ARRAY DE CARRITOS
        try {
            const allGeneric = await fs.promises.readFile(this.path);
        return JSON.parse(allGeneric)
            
        } catch (error) {
            console.error(error)
            return [];          
        }
    }

    async addCart(generic){
        //AGREGA UN NUEVO CARRITO
        const id = randomUUID()
       // const productCart = [];
        const genericOk = await this.getAllCarts();
        const newGeneric = [...genericOk,{id, ...generic}];
        const dataStr = JSON.stringify(newGeneric);
        await fs.promises.writeFile(this.path, dataStr);
         return id; 
    }
    

    async getCartById(id){
             const allGeneric = await this.getAllCarts();
            //console.log(products)
            const idFound = allGeneric.find(search => (search.id === id));
            if (idFound) {
                return console.log(idFound)            
            } else {
                console.error("El Carrito no existe")                
            }
               
    }

    async addToCart() {
        const generic = await this.getAllCarts();
        const idFoundCarts = generic.find((product) => {
            return product.id === id
        })

    }

    async modify (id, data) {
        const generic = await this.getAllCarts();
        const idFound = generic.find((product) => {
            return product.id == id
        });
        if(!idFound){
            res.status(404).send({error: `producto con Id ${id} no encontrado`});
            return;
        }
        ///*  */const allGeneric = await this.getAll();
        const modifyGeneric = {...idFound, ...data};
        const genericOut = generic.filter(e => e.id !== id);
        const newModify = [...genericOut, modifyGeneric];
        const dataStr = JSON.stringify(newModify, null, 2);

        await fs.promises.writeFile(this.path, dataStr);
        return id;

    }
}