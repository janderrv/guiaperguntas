//importando modulo express
const express = require("express");
//instancia o express
const app = express();
//importa body-parser = traduz dados enviados no form em uma estrutura javascript
const bodyParser = require("body-parser");
//carrega conexao
const connection = require("./database/database");
//importa model pergunta
const perguntaModel = require("./database/Pergunta");
//database
connection
    .authenticate()
    .then(()=>{
        console.log("conexao feita com o banco de dados");
    })
    .catch((erro)=>{
        console.log(erro);
    });

//configurar ejs como view engine
app.set("view engine","ejs");
//usar arquivos estaticos
app.use(express.static("public"));
//usa bodyparser
app.use(bodyParser.urlencoded({extended: false}));//ler via javascript
app.use(bodyParser.json());//ler via json


//rota da pagina inicial
app.get("/", (req,res)=>{
    //desenha o arquivo na tela
    res.render("index");
});

//rota da pagina de pergunta
app.get("/perguntar", (req,res)=>{
    res.render("perguntar");
})

//rota do formulario de pergunta
app.post("/salvarpergunta", (req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("formulario recebido! titulo: " + titulo + " descricao: " +descricao);
});

//roda app
app.listen(8000,()=>{
    console.log("app rodando");
});