const sequelize = require("sequelize");
const connection = require("../db/connection");
const category = require("../adminControler/categoryControler/Category");

const event = connection.define("events", {
    Nome_evento: {
        type: sequelize.TEXT,
        allowNull: false
    },
    Slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: sequelize.TEXT,
        allowNull: false
    },
    cep: {
        type: sequelize.TEXT,
        allowNull: false
    },
    LocalDoEvento: {
        type: sequelize.TEXT,
        allowNull: false
    },
    numero: {
        type: sequelize.TEXT,
        allowNull: false
    },
    bairro: {
        type: sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: sequelize.TEXT,
        allowNull: false
    },
    estado: {
        type: sequelize.TEXT,
        allowNull: false
    },
    imagem: {
        type: sequelize.BLOB,
        allowNull: false
    },
    dvPago: {
        type: sequelize.BOOLEAN
    },
    detalhesEvento: {
        type: sequelize.TEXT,
        allowNull: false
    },
    dataInicio: {
        type: sequelize.DATE,
        allowNull: false
    },
    dataFim: {
        type: sequelize.DATE,
        allowNull: false
    },
    horaInicio: {
        type: sequelize.TIME,
        allowNull: false
    },
    horaFim: {
        type: sequelize.TIME,
        allowNull: false
    },
    produtor: {
        type: sequelize.STRING,
        allowNull: false
    },
    sobreProdutor: {
        type: sequelize.TEXT,
        allowNull: false
    },
    termos: {
        type: sequelize.BOOLEAN,
        allowNull: false
    },
    categoriaId: {
        type: sequelize.INTEGER,
        allowNull: true
    }
})

event.sync({ force: true }).then(() => {
    console.log("Tabela eventos sincronizada");
}).catch(err => {
    console.log(`Erro na sincronização da tabela de eventos | erro | ${err}`);
})

category.hasMany(event);
event.belongsTo(category);

module.exports = event;