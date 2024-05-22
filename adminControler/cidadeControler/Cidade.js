const sequelize = require("sequelize");
const connection = require("../../db/connection");

const cidade = connection.define("cidades", {
    nome: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

cidade.sync({ force: true }).then(() => {
    console.log("Tabela cidades sincronizada");
}).catch(err => {
    console.log(`Erro ao sincronizar a tabela cidades | ${err} |`);
})

module.exports = cidade;