import { Router } from "express";
import { FileManager } from "../data/db.js";
import { validateProduct } from "../data/validate.js";

const productManager = new FileManager("./data/products.json")
const route = Router();
/* const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true})); */

route.get('/', async (req, res)=> {
    const allProducts = await productManager.getAll();
    res.send(allProducts)
    
})


route.get("/:pid", async (req, res) => {
    const pid = req.params.pid; 
    const product = await productManager.getAll();
    const searchId = product.find( product => product.id == pid)
     if(!searchId){
         res.status(404).send({error: `producto con Id ${pid} no encontrado`});
         return;
     }
     res.send({searchId})
 
 }) 
 
 route.post("/", async (req, res) => {
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
 })

 route.put("/:pid", async (req, res) => {
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

 route.delete("/:pid", async (req, res) => {
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


 





export default route;
