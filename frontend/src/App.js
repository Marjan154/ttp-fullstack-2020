import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Redirect, Link, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./components/Home";
import MakeTransactions from "./components/MakeTransactions";
import MyTransactions from "./components/MyTransactions";
import Profile from "./components/Profile";
import MyNav from "./components/Nav";
import { Navbar, Nav } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Router>
        <MyNav />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home/:email" component={Home} />
          <Route exact path="/buy/:email" component={MakeTransactions} />
          <Route exact path="/transactions/:email" component={MyTransactions} />
          <Route exact path="/profile/:email" component={Profile} />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
