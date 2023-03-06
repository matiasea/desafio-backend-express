import * as fs from "fs"

import { Router } from "express";
import { Cart } from "../data/dbCart.js";
import { FileManager } from "../data/db.js";

const productManager = new FileManager("./data/products.json");
const carts = new Cart("./data/cart.json");
const route = Router();


route.get('/', async (req, res)=> {
    const allCarts = await carts.getAllCarts();
    res.send(allCarts)
    
})

route.post("/" , async (req, res) => {
    //const productsCart = []
    const id = await carts.addCart();
    res.status(201).send({id});

 })

 route.get("/:cid", async(req, res) => {
    const cid = req.params.cid;
    const allCarts = await carts.getAllCarts();
    const searchId = allCarts.find( cart => cart.id == cid);
    if(!searchId){
        res.status(404).send({error: `Carrito con Id ${cid} no encontrado`});
        return;
    }res.send({searchId})
 })


    route.post('/:cid/product/:pid', async (req, res) => {
        const {cid, pid} = req.params;
        const allCarts = await carts.getAllCarts();
        const cartFound = allCarts.find(cart => cart.id == cid);
        if (!cartFound){
            res.status(404).send({ error: `no existe el carrito con el id  ${cid}`});
            return
        }
    
        const productFound = await productManager.getById(pid);
        if (!productFound){
            res.status(404).send({ error: `no existe el producto con el id  ${pid}`});
            return
        }
    
        const productInCart = cartFound.productCart.filter(productCart =>productCart.productCart == pid)
        const productOutCart = cartFound.productCart.filter(productCart =>productCart.productCart != pid)
        let quantityUpdate = 1;
        if (productInCart.length > 0){
            const {quantity} = productInCart[0];
            quantityUpdate = quantity +1;
        }
    
        const newProduct = {"product": pid, "quantity": quantityUpdate}
        const products = { productCart: [...productOutCart, newProduct]}
        await productManager.update(cid, products);
        
        res.status(200).send({ok: true});
    });

 


 export default route;