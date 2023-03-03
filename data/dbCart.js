import * as fs from "fs"
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
        //const id = randomUUID()
        const genericOk = await this.getAllCarts();
        const newGeneric = [...genericOk, {id: Cart.id++, ...generic}];
        const dataStr = JSON.stringify(newGeneric);

        await fs.promises.writeFile(this.path, dataStr);
        /* return id; */
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
}