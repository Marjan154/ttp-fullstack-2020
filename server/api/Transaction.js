const express = require("express");
const morgan = require("morgan");
const parser = require("body-parser");
const router = express.Router();
const { Transaction } = require("./db");
module.exports = router;

router.use(morgan("dev"));
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
  const {
    symbol,
    name,
    type,
    region,
    marketOpen,
    marketClose,
    timeZone,
    currenct,
    matchScore
  } = req.body;
  Transaction.create({
    symbol,
    name,
    type,
    region,
    marketOpen,
    marketClose,
    timeZone,
    currenct,
    matchScore
  }).catch(error => {
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
