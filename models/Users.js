const db = require("./db");
const Sequelize = require("sequelize");

const Users = db.define(
  "users",
  {
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      primaryKey: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: true,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    },
    balance: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    tableName: "users",
    timestamps: false
  }
);

module.exports = Users;
