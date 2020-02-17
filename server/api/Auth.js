const router = require("express").Router();
const { Users } = require("../models");
const passport = require("passport");
module.exports = router;

router.put("/login", async (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", async function(err, user) {
    if (err) {
      console.log(err);
      return res.status(401).json(err);
    }
    if (user) {
      req.login(user, err => (err ? next(err) : res.json(user)));
    } else {
      const err = new Error("Incorrect email or password!");
      res.status(401).json(err);
      err.status = 401;
      throw err;
    }
  })(req, res, next);
});

// router.put("/login", (req, res, next) => {
//   passport.authenticate("local", function(err, user, info) {
// if (err) {
//   return res.status(401).json(err);
// }
// if (user) {
//   console.log("working");
// } else {
//   console.log("not working");
//   res.status(401).json(info);
// }
//   })(req, res, next);
// });

router.delete("/logout", (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(err => {
      if (err) {
        return next(err);
      } else {
        return res.json("logout successful");
      }
    });
  }
});
