const connection = require("../db/connection");
const sequelize = require("sequelize");

const User = connection.define("users", {
    nome: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: sequelize.STRING,
        allowNull: false
    }
})

User.sync({ force: false }).then(() => {
    console.log("Tabela usuários sincronizada");
}).catch(err => {
    console.log(`Erro ao sincronizar a tabela usuários | ERRO | ${err}`);
})

module.exports = User;