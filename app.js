import express from "express";

import productRoute from "./routes/products.route.js";
import cartRoute from "./routes/cart.route.js"
import fileDirname from "./utils/fileDirname.js";
import { uploader } from "./utils/uploader.js";
const {__dirname} = fileDirname(import.meta) ;


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))
/* app.post("/file", uploader.single("file"), (req, res) => {
    res.send({file: req.file, body: req.body})
}) */

app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)

const port = 8080
app.listen(port, () => console.log(`servidor escuchando en el puerto ${port} `))

