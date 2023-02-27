import express from "express";
import fs from "fs"
import { ProductManager } from "./index.js";
const productManager = new ProductManager("./Products.json");

//const data = fs.readFileSync("./Products.json")
//const productsJson = JSON.parse(data)


const app = express()
app.use(express.urlencoded({extended:true}))


app.get('/products', async (req, res)=> {
    const allProducts = await productManager.getProduct();
    res.send(allProducts)
    
})

app.get("/products/:limit", async (req, res) => {
    const { limit } = req.params
    const allProducts = await productManager.getProduct();

    const limitProduct = allProducts.slice (0, +limit);

     res.send(limitProduct)
    
})
 

 app.get("/:pid", async (req, res) => {
   const { pid } = req.params   
   const allProducts = await productManager.getProduct();
   const searchId = allProducts.find( product => product.id === +pid)
    if(!searchId){
        res.send({error: `producto con Id ${pid} no encontrado`});
        return
    }
    res.send({searchId})

}) 


const port = 8080
app.listen(port, () => console.log(`servidor escuchando en el puerto ${port} `))

