const Sequelize = require("sequelize");
module.exports = new Sequelize("stockportfolio", "root", "password", {
  host: "localhost",
  dialect: "postgres",
  operatorsAliases: false,
  port: 5439,
  ssl: false,
  timezone: "-04:00",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
