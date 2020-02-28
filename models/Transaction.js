const db = require("./db");
const Sequelize = require("sequelize");

const Transaction = db.define(
  "transactions",
  {
    transid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    symbol: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    shares: {
      type: Sequelize.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    cost: {
      type: Sequelize.FLOAT,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    tableName: "transactions",
    timestamps: false
  }
);

/***/
// Transaction.belongsTo(User, {as: 'user'});
// User.hasMany(Transaction, {as: 'Transaction'});
/***/

// export Transaction modules
module.exports = Transaction;
