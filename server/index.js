const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { db, User } = require("./models");
var cors = require("cors");
const session = require("express-session");
const passport = require("passport");

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

// creates cookie
// after finding or creating user, it is serialized on session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// after serializing a user, serialize user on session
// reads cookie
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
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
app.listen(port, () => console.log(`app is listening on ${port}`));
