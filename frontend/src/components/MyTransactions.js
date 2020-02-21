import React, { Component } from "react";
import axios from "axios";
import { getAllTransactions, getBalance } from "../utils/transactions";
import Nav from "./Nav";

class MyTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      transactions: []
    };
  }
  async componentDidMount() {
    let transactions = await getAllTransactions(this.state.email);
    let balance = await getBalance(this.state.email);
    this.setState({
      transactions: transactions[0],
      balance: Number(balance).toFixed(2)
    });
  }

  displayTrans = transArray => {
    let res =
      transArray &&
      transArray.map(trans => {
        return (
          <tr key={trans.symbol}>
            <td>{trans.date}</td>
            <td> {trans.symbol}</td>
            <td>{trans.shares}</td>
          </tr>
        );
      });
    return res;
  };
  render() {
    let res = this.displayTrans(this.state.transactions);
    return (
      <div style={{ marginTop: "100px" }}>
        {/* <Nav /> */}
        <h1 style={{ fontSize: "5rem", margin: "30px", color: "#1e1e6e" }}>
          My Transactions
        </h1>
        <h1 style={{ textAlign: "right", padding: "40px", color: "#91b0ff" }}>
          Your balance is ${this.state.balance}
        </h1>
        <div>
          <div>
            <table
              className="datatable"
              style={{
                width: "85vw",
                boxShadow: "4px 4px 5px grey",
                margin: "auto",
                paddingTop: "80px"
              }}
            >
              <thead className="thead-light">
                <tr>
                  <th>Date</th>
                  <th>Symbol/Ticker</th>
                  <th>Number of Shares</th>
                </tr>
              </thead>
              <tbody>{res}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default MyTransactions;
