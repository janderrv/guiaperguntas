//importando modulo express
const express = require("express");
//instancia o express
const app = express();
//importa body-parser = traduz dados enviados no form em uma estrutura javascript
const bodyParser = require("body-parser");
//carrega conexao
const connection = require("./database/database");
//importa model pergunta
const Pergunta = require("./database/Pergunta");
//importa model respota
const Resposta = require("./database/Resposta");

//database
connection
    .authenticate()
    .then(() => {
        console.log("conexao feita com o banco de dados");
    })
    .catch((erro) => {
        console.log(erro);
    });

//configurar ejs como view engine
app.set("view engine", "ejs");
//usar arquivos estaticos
app.use(express.static("public"));
//usa bodyparser
app.use(bodyParser.urlencoded({ extended: false }));//ler via javascript
app.use(bodyParser.json());//ler via json


//rota da pagina inicial
app.get("/", (req, res) => {
    Pergunta.findAll({
        row: true, order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        //desenha o arquivo na tela
        res.render("index", {
            perguntas: perguntas
        });
    });
});

//rota da pagina de pergunta
app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

//rota do formulario de pergunta
app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //chama o model
    Pergunta.create({
        //faz o insert
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        //redireciona para pagina inicial
        res.redirect("/");
    });
});

//rota pergunta por id
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        //busca uma pergunta
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {//pergunta encontrada
            res.render("pergunta", {
                pergunta: pergunta
            });
        } else {//pergunta nao encontrada
            res.redirect("/");
        }
    });
});

//rota formulario responder
app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

//roda app
app.listen(8000, () => {
    console.log("app rodando");
});