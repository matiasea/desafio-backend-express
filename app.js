import express from "express";
//import fs from "fs"
//import { FileManager } from "./data/db.js";
//import { validateProduct } from "./data/validate.js";
import productRoute from "./routes/products.route.js";
import fileDirname from "./utils/fileDirname.js";
const {__dirname} = fileDirname(import.meta) ;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))


app.use("/api/products", productRoute)

const port = 8080
app.listen(port, () => console.log(`servidor escuchando en el puerto ${port} `))

