import * as fs from "fs"

import { Router } from "express";
import { Cart } from "../data/dbCart.js";
import { FileManager } from "../data/db.js";

const productManager = new FileManager("./data/cart.json");
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

 route.post("/:cid/products/:pid" , async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const allCarts = await carts.getAllCarts();
    const searchIdCart = allCarts.find( cart => cart.id == cid);
    console.log(searchIdCart)
    if(!searchIdCart){
        res.status(404).send({error: `Carrito con Id ${cid} no encontrado`});
        return;
    }
    const allProducts = await productManager.getAll();
    const searchIdProduct = allProducts.find( product => product.id == pid);
    console.log(searchIdProduct)
    if(!searchIdProduct){
        res.status(404).send({error: `Producto con Id ${pid} no encontrado`});
        return;
    }
    //searchIdCart.productsCart[{searchIdCart}];
   

 })


 export default route;