//importando modulo express
const express = require("express");
//instancia o express
const app = express();

//configurar ejs como view engine
app.set("view engine","ejs");
//usar arquivos estaticos
app.use(express.static("public"));

//rota de teste
app.get("/", (req,res)=>{

    //desenha o arquivo na tela
    res.render("index");
});

app.get("/perguntar", (req,res)=>{
    res.render("perguntar");
})

//roda app
app.listen(8000,()=>{
    console.log("app rodando");
});