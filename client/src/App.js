import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Redirect, Link, withRouter } from "react-router-dom";
import logo from "./logo.svg";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home/:email" component={Home} />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
