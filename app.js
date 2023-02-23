import fs from "fs"

const data = fs.readFileSync("./Products.json")
const productsJson = JSON.parse(data)



import express from "express"

const app = express()
app.use(express.urlencoded({extended:true}))


app.get("/products", (req, res) => {
    res.send(productsJson)
})

app.get("/products/:limit", (req, res) => {
    const { limit } = req.params
    const limitProduct = productsJson.slice (0, +limit);

     res.send(limitProduct)
    
})
 

app.get("/:pid", (req, res) => {
   const { pid } = req.params   
   const searchId = productsElectro.find( product => product.id === +pid)
    if(!searchId){
        res.send({error: `usaurio con Id ${pid} no encontrado`});
        return
    }
    res.send({searchId})

})
const port = 8080
app.listen(port, () => console.log(`servidor escuchando en el puerto ${port} `))

