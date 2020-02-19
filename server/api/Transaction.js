const express = require("express");
// const morgan = require("morgan");
const parser = require("body-parser");
const router = express.Router();
const { Transaction, Users } = require("../models");
const Sequelize = require("sequelize");
module.exports = router;

// router.use(morgan("dev"));
router.use(parser.json());
router.use(
  parser.urlencoded({
    extended: true
  })
);
// TRANSACTION METHODS

//GET ALL TRANSACTIONS
router.get("/transactions", (req, res) => {
  Transaction.findAll()
    .then(transactionResponse => {
      res.status(200).json(transactionResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

//ADD TRANSACTION
router.post("/transactions", async function(req, res) {
  const { symbol, shares, email, cost } = req.body;
  const date = Date.now();
  console.log("INFOOO", symbol, shares, email, cost);
  try {
    let user = await Users.findOne({ where: { email } });
    try {
      await Transaction.create({
        symbol,
        email,
        shares,
        date
      });
      console.log("created transaction");
      res.status(201).send({
        symbol,
        shares
      });
    } catch (err) {
      console.error(err);
    }
    try {
      await user
        .updateAttributes({ balance: user.balance - parseInt(cost) })
        .then(() => console.log("user balance updated", user.balance));
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/groupbysymbol/", async (req, res, next) => {
  const { email, symbol } = req.query;
  const query = req.query.symbol ? { email, symbol } : { email };
  Transaction.findAll({
    where: query,
    attributes: [
      "symbol",
      [Sequelize.fn("sum", Sequelize.col("shares")), "shares"]
    ],
    order: [["symbol", "DESC"]],
    group: ["symbol"]
  })
    .then(userResponse => {
      console.log("symbol" + userResponse);
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router
  .route("/transactions/:id")
  // GET SPECIFIC transactions for a user (where userid has been appended to "http://localhost:3000/routers/transactions/" in thunk axios request in ./reducer/index)
  .get(function(req, res) {
    Transaction.findAll({ where: { email: req.params.email } })
      .then(transactionResponse => {
        res.status(200).json(transactionResponse);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  })
  //DELETE TRANSACTION
  .delete(async function(req, res, next) {
    Transaction.destroy({
      where: { id: req.params.id }
    })
      .catch(error => {
        response.status(400).send(error);
      })
      .next();
  });
