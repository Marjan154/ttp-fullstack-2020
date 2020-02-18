const db = require("./db");
const Sequelize = require("sequelize");

const Transaction = db.define("transactions", {
  date: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  symbol: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  region: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  marketOpen: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  marketClose: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  currency: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  matchscore: {
    type: Sequelize.STRING,
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

  // accessor
  // mutator
});

/***/
// Transaction.belongsTo(User, {as: 'user'});
// User.hasMany(Transaction, {as: 'Transaction'});
/***/

// export Transaction modules
module.exports = Transaction;
