import React, { Component } from "react";
import Footer from "./Footer";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import styles from "../styles/login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmit = e => {
    e.preventDefault();
    axios
      .put("https://floating-bastion-36036.herokuapp.com/api/auth/login", {
        ...this.state
      })
      .then(res => res.data)
      .then(user => this.props.history.replace(`/home/${user.email}`));
  };
  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="login-page">
        <h1>STOCK PORTFOLIO</h1>
        <div className="form">
          <form className="login-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              onChange={this.inputHandler}
            />
            <input
              type="password"
              required
              placeholder="Password"
              name="password"
              onChange={this.inputHandler}
            />
            {/* <Link to="/home"> */}
            <button>Login</button>
            {/* </Link> */}
            <Link to="/register">
              <p className="message">Not registered?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
