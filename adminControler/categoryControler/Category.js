const sequelize = require("sequelize");
const connection = require("../../db/connection");

const category = connection.define("categorias", {
    nome: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

category.sync({ force: true }).then(() => {
    console.log("Tabela categorias sincronizada");
}).catch(err => {
    console.log(`Erro ao sincronizar a tabela das categorias | ${err} |`);
})

module.exports = category;