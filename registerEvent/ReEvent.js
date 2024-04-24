const sequelize = require("sequelize");
const connection = require("../db/connection");

const event = connection.define("events", {
    Nome_evento: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    Slug: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: false
    },
    endereco: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    Av_Rua: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: false
    },
    numero: {
        type: sequelize.NUMBER,
        allowNull: false,
        defaultValue: false
    },
    complemento: {
        type: sequelize.TEXT,
        allowNull: true,
        defaultValue: false
    },
    bairro: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: false
    },
    cidade: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    estado: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    imagem: {
        type: sequelize.BLOB,
        allowNull: true,
        defaultValue: false
    },
    dvPago: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    assunto: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    detalhesEvento: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    dataInicio: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: false
    },
    dataFim: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: false
    },
    horaInicio: {
        type: sequelize.TIME,
        allowNull: false,
        defaultValue: false
    },
    horaFim: {
        type: sequelize.TIME,
        allowNull: false,
        defaultValue: false
    },
    produtor: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: false
    },
    sobreProdutor: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    termos: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    categoriaId: {
        type: sequelize.INTEGER,
        allowNull: true,
        defaultValue: false
    }
})

event.synv({ force: false }).then(() => {
    console.log("Tabela eventos sincronizada");
}).catch(err => {
    console.log("Erro na sincronização da tabela de ventos");
})