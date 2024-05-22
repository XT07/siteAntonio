const sequelize = require("sequelize");
const connection = require("../../db/connection");
const events = require("../../registerEvent/ReEvent");

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

category.hasMany(events);
events.belongsTo(category);

module.exports = category;