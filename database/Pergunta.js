const Sequelize = require("sequelize");
const connection = require("./database");

//cria model
const Pergunta = connection.define("pergunta",{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//nao vai forçar a criação da tabela caso já exista a mesma
Pergunta.sync({force: false}).then(()=>{
});