const sequelize = require("sequelize");
const connection = require("../../db/connection");
const cidade = require("../cidadeControler/Cidade");

const estado = connection.define("estado", {
    nome: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

estado.sync({ force: false }).then(() => {
    console.log("Tabela de estados sincronizada");
}).catch(err => {
    console.log(`Erro ao sincronizar tabela estados | ${err} |`);
})

cidade.belongsTo(estado);
estado.hasMany(cidade);

module.exports = estado;