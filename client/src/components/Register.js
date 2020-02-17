import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import styles from "../styles/login.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/users/create", { ...this.state })
      .then(data => {
        console.log("data", data);
        this.props.history.push(`/home/${data.email}`);
      });
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
              placeholder="name"
              name="name"
              onChange={this.inputHandler}
            />
            <input
              type="text"
              placeholder="email address"
              name="email"
              onChange={this.inputHandler}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.inputHandler}
            />

            <button>create</button>
            <Link to="/">
              <p className="message">Already registered?</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
