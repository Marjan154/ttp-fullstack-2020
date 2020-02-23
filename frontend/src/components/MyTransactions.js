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
    console.log(this.props.match.params.email);
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
      transArray.map((trans, i) => {
        return (
          <tr key={trans.symbol}>
            <td>{i + 1}</td>
            <td>{trans.date.toString()}</td>
            <td> {trans.symbol}</td>
            <td>{trans.shares}</td>
            <td>{trans.cost}</td>
          </tr>
        );
      });
    return res;
  };
  render() {
    let res = this.displayTrans(this.state.transactions);
    return (
      <div>
        <Nav />
        <div style={{ marginTop: "100px" }}>
          <h1
            style={{
              fontSize: "5rem",
              margin: "30px",
              color: "#1e1e6e",
              marginTop: "-5vh"
            }}
          >
            My Transactions
          </h1>
          <h1
            style={{
              textAlign: "right",
              padding: "40px",
              color: "#91b0ff",
              marginTop: "-5vh"
            }}
          >
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
                    <th>#</th>
                    <th>Date</th>
                    <th>Symbol/Ticker</th>
                    <th>Number of Shares</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>{res}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MyTransactions;
