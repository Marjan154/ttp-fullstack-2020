import React, { Component } from "react";
import Footer from "./Footer";
import { Link, Redirect } from "react-router-dom";
import styles from "../styles/login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      hidden: true,
      redirect: false
    };
  }
  //   onSubmit = () => {
  //     return <Redirect to="/home" />;
  //   };

  render() {
    return (
      <div className="login-page">
        <h1>STOCK PORTFOLIO</h1>
        <div className="form">
          <form className="login-form" onSubmit={this.onSubmit}>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Link to="/home">
              <button>Login</button>
            </Link>
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
