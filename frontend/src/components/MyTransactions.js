import React, { Component } from "react";
import axios from "axios";
import {
  getAllTransactions,
  getBalance,
  getSpent
} from "../utils/transactions";
import style from "../styles/mytrans.css";
import Nav from "./Nav";

class MyTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      transactions: [],
      display: [],
      loading: true,
      offset: 0,
      limit: 20,
      page: 1
    };
  }
  componentDidMount() {
    this.findTransactions(this.state.offset, this.state.limit);
    getBalance(this.state.email).then(balance => {
      this.setState({
        balance: Number(balance).toFixed(2)
      });
    });
    getSpent(this.state.email).then(spent => {
      this.setState({
        spent: Number(spent).toFixed(2)
      });
    });
  }

  findTransactions = (offset, limit) => {
    getAllTransactions(this.state.email, offset, limit)
      .then(trans => {
        this.setState({ transactions: trans[0] });
      })
      .catch(e => {
        this.setState({
          loading: false
        });
        console.log(e);
      });
  };

  disableButton(buttonid, disabled) {
    document.getElementById(buttonid).disabled = disabled;
  }

  findNext = () => {
    const { limit, offset } = this.state;
    if (this.state.transactions.length >= limit) {
      this.disableButton("next_button", false);
      this.disableButton("back_button", false);
      const newOffset = offset + limit;
      this.setState({ offset: newOffset, page: this.state.page + 1 }, () => {
        this.findTransactions(this.state.offset, this.state.limit);
      });
    } else {
      this.disableButton("next_button", true);
    }
  };

  findPrevious = () => {
    const { limit, offset } = this.state;
    if (offset && offset > 0) {
      this.disableButton("next_button", false);
      const newOffset = offset - limit < 0 ? 0 : offset - limit;
      this.setState({ offset: newOffset, page: this.state.page - 1 }, () => {
        this.findTransactions(this.state.offset, this.state.limit);
      });
    } else {
      this.disableButton("back_button", true);
    }
  };

  displayTrans = transArray => {
    return transArray.length ? (
      transArray.map((trans, i) => {
        return (
          <tr key={i}>
            <td>
              {this.state.offset} {i + 1} {this.state.offset + i + 1}
            </td>
            <td>{trans.date.toString()}</td>
            <td> {trans.symbol}</td>
            <td>{trans.shares}</td>
            <td>${trans.cost}</td>
          </tr>
        );
      })
    ) : (
      <h1>You have no transactions!</h1>
    );
  };
  render() {
    return (
      <div>
        <Nav />
        <div style={{ marginTop: "100px" }}>
          <h1
            style={{
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
          <h1
            style={{
              textAlign: "right",
              padding: "40px",
              color: "#91b0ff",
              marginTop: "-5vh"
            }}
          >
            Your have spent a total of ${this.state.spent}
          </h1>
          {this.state.transactions.length ? (
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
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Symbol/Ticker</th>
                      <th>Number of Shares</th>
                      <th>Cost</th>
                    </tr>

                    {this.state.transactions.map((trans, i) => {
                      return (
                        <tr key={i}>
                          <td>{this.state.offset + i + 1}</td>
                          <td>{trans.date.toString()}</td>
                          <td> {trans.symbol}</td>
                          <td>{trans.shares}</td>
                          <td>${trans.cost}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1>
              {this.state.loading ? "Loading..." : "You have no transactions!"}
            </h1>
          )}
        </div>
        <div className="buttonContainer">
          <button
            className="mybutton"
            onClick={this.findPrevious}
            id="back_button"
          >
            Back
          </button>
          <h5>{1 + Math.ceil(this.state.offset / this.state.limit)}</h5>
          <button className="mybutton" onClick={this.findNext} id="next_button">
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default MyTransactions;
