import React, { Component } from "react";
import styles from "../styles/home.css";
import axios from "axios";
import MyNav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { getBalance, getSpent, getCount } from "../utils/transactions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      balance: 0,
      searchbarVal: "",
      bestMatches: []
    };
  }

  async componentDidMount() {
    console.log(this.props.match.params.email);
    let balance = await getBalance(this.state.email);
    let count = await getCount(this.state.email);
    let spent = await getSpent(this.state.email);
    this.setState({ balance: Number(balance).toFixed(2), count, spent });
  }

  render() {
    const { email } = this.state;
    const d = new Date(Date.now());
    return (
      <div>
        <MyNav />
        <div>
          {/* <MyNav /> */}
          <div className="banner">
            {/* <h1>Welcome {this.state.email}</h1>
          <h1>Profile (${this.state.totalCash})</h1> */}
            <div className="grid-container">
              <h1 id="homeTitle">Welcome {email} !</h1>

              <h1
                style={{
                  color: "white",
                  width: "100vw",
                  marginTop: "-5vh"
                }}
              >
                Today is {d.toDateString()}.
                <br />
                Your'e balance is ${this.state.balance}. What would you like to
                do today?
              </h1>

              <div className="stats">
                <Link
                  to={`/profile/${email}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="stat">
                    <div>
                      <img
                        src={require("../images/user.png")}
                        style={{ padding: "20px" }}
                        className="p-icon"
                      ></img>
                      <h3>View Profile</h3>
                      <h4 style={{ color: "#1e1e6e" }}>
                        Your balance is ${this.state.balance}
                      </h4>
                    </div>
                  </div>
                </Link>

                <Link
                  to={`/transactions/${email}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="stat">
                    <div>
                      <img
                        src={require("../images/transaction.png")}
                        style={{ padding: "20px" }}
                        className="p-icon"
                      ></img>
                      <h3>View Transactions</h3>
                      <h4 style={{ color: "#1e1e6e" }}>
                        {this.state.count
                          ? `You have made ${this.state.count} puchases`
                          : "Your purchase history"}
                      </h4>
                    </div>
                  </div>
                </Link>

                <Link to={`/buy/${email}`} style={{ textDecoration: "none" }}>
                  <div className="stat">
                    <div>
                      <img
                        src={require("../images/payment-method.png")}
                        style={{ padding: "20px" }}
                        className="p-icon"
                      ></img>
                      <h3>Buy Stocks</h3>
                      <h4 style={{ color: "#1e1e6e" }}>
                        {this.state.spent
                          ? `You have spent $${this.state.spent} on stocks`
                          : "Invest today"}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
