const express = require("express")
const app = express()

app.get("/", (req, res) => {
    console.log("Petición recibida")
    res.status(200).send("Hola desde servidor de prueba")
})

app.listen(3000, () => {
    console.log("Servidor Express en puerto 8080")
})