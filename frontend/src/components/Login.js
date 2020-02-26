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
      password: "",
      invalid: false
    };
  }
  onSubmit = e => {
    e.preventDefault();
    axios
      .put("https://floating-bastion-36036.herokuapp.com/api/auth/login", {
        ...this.state
      })
      .then(res => res.data)
      .then(user => {
        this.setState({ invalid: false });
        this.props.history.replace(`/home/${user.email}`);
      })
      .catch(e => {
        this.setState({ invalid: true });
        console.log(e);
      });
  };
  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    console.log(this.state.invalid);
    return (
      <div className="login-page">
        <h1>STOCK PORTFOLIO</h1>
        {this.state.invalid ? (
          <h5
            style={{
              padding: "15px",
              backgroundColor: "#ed8282",
              color: "white",
              opacity: "85%"
            }}
          >
            Invalid Username or Login
          </h5>
        ) : (
          <div />
        )}
        <div className="form" id="lform">
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
            <button>Login</button>
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
