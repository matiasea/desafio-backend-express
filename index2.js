import express from "express";
//import fs from "fs"
//import { FileManager } from "./data/db.js";
//import { validateProduct } from "./data/validate.js";
import productRoute from "./products.route.js";
import fileDirname from "./utils/fileDirname.js";
const {__dirname} = fileDirname(import.meta) ;
console.log(__dirname)
 


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))


app.use("/api/products", productRoute)

/* app.get('/api/products', async (req, res)=> {
    const allProducts = await productManager.getAll();
    res.send(allProducts)
    
})


app.get("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid; 
    const product = await productManager.getAll();
    const searchId = product.find( product => product.id == pid)
     if(!searchId){
         res.status(404).send({error: `producto con Id ${pid} no encontrado`});
         return;
     }
     res.send({searchId})
 
 }) 
 
 app.post("/api/products", async (req, res) => {
    const product = req.body;
    const isValid = validateProduct(product);
    if(!isValid){
        res.status(400).send({error: "datos invalidos"});
        return

    }
    const id = await productManager.add(product)
    res.status(201).send({id});
    
    /* const mesa = { title: "Mesa Gardenlife", 
        descripcion: "Redonda, plastica",
        price: 14520,
        thumbnail: "iimgmesa.com",
        code: "GUINEA",
        stock: 4,
        //id: productManager.id++
     } */

    //res.send (await productManager.add(mesa))
    /*
 })

 app.put("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid; 
    const product = await productManager.getAll();
    const searchId = product.find( product => product.id == pid)
     if(!searchId){
         res.status(404).send({error: `producto con Id ${pid} no encontrado`});
         return;
     }
     const newData = req.body;
     const isValid = validateProduct(newData);
        if(!isValid){
        res.status(400).send({error: "datos invalidos",
    });
        return;
    }
     
     await productManager.modify(pid, newData);
     res.send({ok: true})

 })

 app.delete("/api/products/:pid", async (req, res) => {
    const pid = req.params.pid; 
    const product = await productManager.getAll();
    const searchId = product.find( product => product.id == pid)
     if(!searchId){
         res.status(404).send({error: `producto con Id ${pid} no encontrado`});
         return;
     }
     await productManager.deleteProduct(pid);
    res.send({ok: true})
    }
 
 )

 */




const port = 3000
app.listen(port, () => console.log(`servidor escuchando en el puerto ${port} `))
