const router = require("express").Router();
const { Users } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//make sure to export the router
module.exports = router;

router.get("/", async (req, res, next) => {
  Users.findAll({ limit: 200 })
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.get("/find", async (req, res, next) => {
  console.log(req.query.email);
  Users.findAndCountAll({
    where: {
      email: req.query.email
    }
  })
    .then(userResponse => {
      console.log(userResponse);
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.post("/create", async (req, res, next) => {
  const { name, password, email } = req.body;
  console.log(req.body);

  try {
    const created = await Users.create({
      name,
      password,
      email
    });
    console.log(`created ${created.email}!`);
    res.status(201).send({
      name,
      password,
      email
    });
  } catch (err) {
    res.status(400).send(error);
    console.error(err);
  }
});
