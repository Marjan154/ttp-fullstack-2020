import React, { Component } from "react";
import styles from "../styles/home.css";
import axios from "axios";
import Modal from "./Modal";
import { Button } from "react-bootstrap";
import { getAllStocks } from "../utils/stockApi.js";
import { getBalance, makeTransaction } from "../utils/transactions";
import MyNav from "./Nav";
import Footer from "./Footer";

class MakeTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      balance: 0,
      searchbarVal: "",
      bestMatches: [],
      stockInfo: {},
      balance: 0
    };
  }

  async componentDidMount() {
    let balance = await getBalance(this.state.email);
    this.setState({ balance: Number(balance).toFixed(2) });
  }

  stylesInput = {
    width: "80%",
    boxSizing: "border-box",
    border: "2px solid #ccc",
    borderRadius: "4px",
    fontSize: "30px",
    backgroundColor: "white",
    backgroundPosition: "10px 10px",
    backgroundRepeat: " no-repeat",
    padding: "12px 20px 12px 40px"
  };
  stylesButton = {
    backgroundColor: "#1e1e6e",
    inline: "block",
    border: "none",
    color: "white",
    padding: "14px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline - block",
    fontSize: "30px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "10px",
    marginLeft: "5px"
  };

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {});
  };

  onSubmit = e => {
    e.preventDefault();
    getAllStocks(this.state.searchbarVal).then(data => {
      this.setState({
        bestMatches: data[0],
        stockInfo: data[1]
      });
    });
  };

  buyForm = (price, symbol) => (
    <div>
      The price is ${price}
      <form
        onSubmit={e => {
          e.preventDefault();
          this.buy(price, e.target.shares_amount.value, symbol);
        }}
      >
        <input
          type="number"
          pattern="[0-9]*"
          min="1"
          required
          placeholder="Number of shares"
          name="shares_amount"
          defaultValue={1}
        />
        <button>Buy</button>
      </form>
    </div>
  );

  buy = async (price, share, symbol) => {
    let shares = parseInt(share);
    let cost = parseFloat(price) * shares;
    console.log(shares, cost, cost * shares);
    if (this.state.balance < cost) {
      console.log("not enough");
    } else {
      await makeTransaction({ shares, cost, symbol, email: this.state.email });
      console.log("enough money");
    }
  };

  refresh = async () => {
    getBalance(this.state.email).then(balance => {
      this.setState({ balance: Number(balance).toFixed(2) });
    });
  };

  displaySearches = (stockArray, stockInfo) => {
    let res =
      stockArray &&
      stockArray.map(stock => {
        return (
          <tr key={stock.symbol}>
            <td> {stock.symbol}</td>
            <td>{stock.securityName}</td>
            <td>{stock.securityType}</td>
            <td> {stock.region} </td>
            <td>{stock.exchange}</td>
            <td>{stockInfo[stock.symbol].price}</td>
            <td>
              <Modal
                form={this.buyForm(stockInfo[stock.symbol].price, stock.symbol)}
                label={"Buy"}
                title={"Buy stock share"}
                refresh={this.refresh}
              />
            </td>
          </tr>
        );
      });
    return res;
  };
  render() {
    let res = this.displaySearches(
      this.state.bestMatches,
      this.state.stockInfo
    );
    return (
      <div>
        {" "}
        <MyNav />
        <div style={{ marginTop: "100px", marginBottom: "50px" }}>
          <h1
            style={{
              fontSize: "5rem",
              margin: "30px",
              color: "#1e1e6e",
              marginTop: "-5vh"
            }}
          >
            Make Transactions
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

          <div style={{ marginBottom: "20px" }}>
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                placeholder="Search stock"
                required
                name="searchbarVal"
                onChange={this.inputHandler}
                style={this.stylesInput}
              />
              <button style={this.stylesButton}>Search</button>
            </form>
          </div>
          <div>
            <div style={{ marginBottom: "50px" }}>
              <table
                className="datatable"
                style={{
                  width: "85vw",
                  boxShadow: "4px 4px 5px grey",
                  margin: "auto",
                  paddingTop: "80px"
                }}
              >
                {res.length ? (
                  <thead className="thead-light">
                    <tr>
                      <th>Symbol</th>
                      <th>Security Name</th>

                      <th>Security Type</th>
                      <th>Region</th>
                      <th>Exchange</th>
                      <th>Price</th>
                      <th>Buy</th>
                    </tr>
                  </thead>
                ) : (
                  <div></div>
                )}
                <tbody>{res}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MakeTransactions;
