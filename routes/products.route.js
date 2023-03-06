import { Router } from "express";
import { FileManager } from "../data/db.js";
import { validateProduct } from "../data/validate.js";
import { uploader } from "../utils/uploader.js";

const productManager = new FileManager("./data/products.json")
const route = Router();

route.get('/', async (req, res)=> {
    const {limit} = req.query;
    const allProducts = await productManager.getAll();
    if (!limit){
        res.send(allProducts)
    res.send(allProducts)
}
else{
    const limitProduct = allProducts.slice(0,limit)
    res.send(limitProduct)
}
    
})


route.get("/:pid", async (req, res) => {
    const pid = req.params.pid; 
    const product = await productManager.getAll();
    const searchId = product.find( product => product.id == pid)
    res.send({searchId})
 
 }) 
 
 route.post("/", uploader.array("files") , async (req, res) => {
    const files = req.files?.path;
    //console.log=(files);
    const product = req.body;
    const isValid = validateProduct(product);
    if(!isValid){
        res.status(400).send({error: "datos invalidos"});
        return
    }
    const id = await productManager.add({...product, status: true, thumbnail: files})
    res.status(201).send({id});

 })



 route.put("/:pid", async (req, res) => {
    const pid = req.params.pid; 
    newData = req.body;
    const isValid = validateProduct(newData);
        if(!isValid){
        res.status(400).send({error: "datos invalidos",
    });
        return;
    }
     await productManager.modify(pid, newData);
     res.send({ok: true})

 })

 route.delete("/:pid", async (req, res) => {
    const pid = req.params.pid; 
     await productManager.deleteProduct(pid);
    res.send({ok: true})
    }
 
 )


 





export default route;
