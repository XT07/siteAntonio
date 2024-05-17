const connection = require("../db/connection");
const sequelize = require("sequelize");

const users = connection.define("users", {
    nomeUser:  {
        type: sequelize.TEXT,
        allowNull: false
    },
    empresa:  {
        type: sequelize.BOOLEAN
    },
    email:  {
        type: sequelize.TEXT,
        allowNull: false
    },
    cpf_cnpj_pj:  {
        type: sequelize.TEXT,
        allowNull: false
    },
    senha:  {
        type: sequelize.TEXT,
        allowNull: false
    },
})

users.sync({ force: false }).then(() => {
    console.log("Tabela de usuários sincronizada");
}).catch(err => {
    console.log(`Erro ao sincronizar a tabela de usuários | ${err} |`);
})

module.exports = users;