const sequelize = require("sequelize");
const connection = require("../../db/connection");
const event = require("../../registerEvent/ReEvent");

const cidade = connection.define("cidades", {
    nome: {
        type: sequelize.TEXT,
        allowNull: false
    },
    estadoId: {
        type: sequelize.INTEGER,
        allowNull: true
    }
})

cidade.sync({ force: false }).then(() => {
    console.log("Tabela cidades sincronizada");
}).catch(err => {
    console.log(`Erro ao sincronizar a tabela cidades | ${err} |`);
})

cidade.hasMany(event);
event.belongsTo(cidade);

module.exports = cidade;