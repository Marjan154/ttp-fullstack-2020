const Sequelize = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize(
  process.env.DATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    operatorsAliases: false,
    port: 5432,
    ssl: true,
    timezone: "-04:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
