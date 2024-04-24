const sequelize = require("sequelize");

const connection = new sequelize("siteantonio", "root", "89171304", {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
})

module.exports = connection;