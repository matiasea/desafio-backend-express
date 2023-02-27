import fs from "fs"
const path = "./Products.json"

export class ProductManager {
    static id = 1

    constructor(){
        this.path = path
    }    
    
    async addProduct(product){
        //AGREGA PRODUCTOS AL ARRAY
        const productsOk = await this.getProduct();
        const newProduct = [...productsOk, product];
        const dataStr = JSON.stringify(newProduct)

        await fs.promises.writeFile(this.path, dataStr);
    }

    async getProduct(){
        //NOS MUESTRA EL ARRAY DE PRODUCTOS
        try {
            const products = await fs.promises.readFile(this.path);
        return JSON.parse(products)
            
        } catch (error) {
            console.error(error)
            return [];          
        }

    }

    async getProductById(id){
        //RECIBE UN ID, Y CHEKEA QUE ESTE EN EL ARRAY, SI LO ENCUNTRA LO DEVUELVE POR CONSOLA
            const products = await this.getProduct();
            //console.log(products)
            const idFound = products.find(search => (search.id === id));
            if (idFound) {
                return console.log(idFound)            
            } else {
                console.error("El producto no existe")                
            }
               
    }

    async updateProduct (id, prop, newValue){
        //PERMITE EDITAR INFORMACION DE LOS PRODUCTOS POR MEDIO DEL ID DEL PRODUCTO A ACTUALIZAR
        const products = await await this.getProduct();
        const idFound = products.find((product) => {
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
        const products = await await this.getProduct();
        const idFound = products.filter(function(product){
            return product.id != id
        })
        
        if(products.length === idFound.length){
            console.log("no se encontro id Producto")
        } else {
            console.log(idFound)

        }
        const dataStr = JSON.stringify(idFound)
        await fs.promises.writeFile(this.path, dataStr)
    }

}




/* const heladera = { 
    title: "Heladera Samgung",
    descripcion: "Acero Inox - 365 Lts",
    price: 259878,
    thumbnail: "imgheladera.com",
    code: "rt38",
    stock: 11,
    id: ProductManager.id++
 }

 const cocina = { 
    title: "Cocina Longvie",
    descripcion: "Facil Limpieza - Encendido Electrico",
    price: 111587,
    thumbnail: "imgcocina.com",
    code: "15338",
    stock: 3,
    id: ProductManager.id++
 }

 const tv = { 
    title: "Tv Hitachi",
    descripcion: "55 pulgadas - 4k",
    price: 141589,
    thumbnail: "imgtv.com",
    code: "55HTV4K",
    stock: 5,
    id: ProductManager.id++
 }

 const celular = { 
    title: "Smartphone Samsung",
    descripcion: "a13",
    price: 73890,
    thumbnail: "imgcel.com",
    code: "A13HS",
    stock: 2,
    id: ProductManager.id++
 }

 const lavarropas = { 
    title: "Lavarropas Longvie",
    descripcion: "8kg - 1400rpm",
    price: 179589,
    thumbnail: "imglavarropas.com",
    code: "18014",
    stock: 21,
    id: ProductManager.id++
 }

 const dispenser = { 
    title: "Dispenser de agua Ushuaia",
    descripcion: "Bidon - Agua Fria y caliente",
    price: 71490,
    thumbnail: "imgdisp.com",
    code: "USHU15",
    stock: 7,
    id: ProductManager.id++
 }

 const lavavajillas = { 
    title: "Lavavajillas Whirlpooll",
    descripcion: "10 cubiertos - Inverter",
    price: 180580,
    thumbnail: "imglavavajillas.com",
    code: "OF3010N",
    stock: 5,
    id: ProductManager.id++
 }

 const parlante = { 
    title: "Parlante Philips",
    descripcion: "Bluetooth - 5w",
    price: 14190,
    thumbnail: "imgparlante.com",
    code: "HC3505",
    stock: 3,
    id: ProductManager.id++
 }

 const pileta = { 
    title: "Pileta Pelopincho",
    descripcion: "260 x 160 x 70 - 4500lts ",
    price: 39870,
    thumbnail: "imgpileta.com",
    code: "1055",
    stock: 11,
    id: ProductManager.id++
 }

 const termo = { 
    title: "termo Stanley",
    descripcion: "Acero - 1.2lts",
    price: 28970,
    thumbnail: "imgtermo.com",
    code: "ST12",
    stock: 9,
    id: ProductManager.id++
 }



 async function main(){
    const newProduct = new ProductManager();
 await newProduct.addProduct(heladera);
 await newProduct.addProduct(cocina);
 await newProduct.addProduct(tv);
 await newProduct.addProduct(celular);
 await newProduct.addProduct(lavarropas);
 await newProduct.addProduct(dispenser);
 await newProduct.addProduct(lavavajillas);
 await newProduct.addProduct(parlante);
 await newProduct.addProduct(pileta);
 await newProduct.addProduct(termo)
 //const allProducts = await newProduct.getProduct();
 //console.log(allProducts)
 //await newProduct.updateProduct(2, "title", "Smart Tv")
 //console.log(allProducts)
 //await newProduct.getProductById(20);
 //await newProduct.deleteProduct(1)
 
 }
 
 main(); */
