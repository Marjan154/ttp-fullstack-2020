const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { db, Users } = require("./models");
var cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// middleware that should allow open access for requests to routes
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// middleware that should allow open access for requests to routes

// Session middleware
app.use(
  session({
    secret: "hidden",
    resave: false,
    saveUninitialized: false
  })
);

// consumes 'req.session' so that passport can know what on the Session
app.use(passport.initialize());

// this will invoke our registered 'deserializedUser' method
// and attempt to put our user on 'req.user'
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password", session: true },
    function(username, password, done) {
      Users.findOne({
        where: {
          email: username
        }
      })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (user.password !== password) {
            return done(null, false, { message: "Incorrect password." });
          } else {
            console.log("user is validated!");
            return done(null, user);
          }
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

// creates cookie
// after finding or creating user, it is serialized on session
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// after serializing a user, serialize user on session
// reads cookie
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(email);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(express.static(path.join(__dirname, "frontend", "build")));

//Database stuff
app.use("/api", require("./api"));

//React app link
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database!:", err);
  });

const port = 5000;

// const root = path.join(__dirname, "build");
// console.log(root);
// app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

app.listen(port, () => console.log(`app is listening on ${port}`));
