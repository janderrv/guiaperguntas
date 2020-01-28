//importando modulo express
const express = require("express");
//instancia o express
const app = express();

//configurar ejs como view engine
app.set("view engine","ejs");

//rota de teste
app.get("/", (req,res)=>{
    //desenha o arquivo na tela
    res.render("index");
});

//roda app
app.listen(8000,()=>{
    console.log("app rodando");
});