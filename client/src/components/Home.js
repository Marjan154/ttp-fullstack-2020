import React, { Component } from "react";
import styles from "../styles/home.css";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      totalCash: 5000,
      searchbarVal: "",
      bestMatches: []
    };
  }

  componentDidMount() {}
  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };
  getAllStocks = searchval => {
    const key = "3U80U5NMFKZXQKS7";
    let url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchval}&apikey=${key}`;
    axios
      .get(url)
      .then(data =>
        this.setState({ bestMatches: data.data.bestMatches }, () =>
          console.log(data.data.bestMatches)
        )
      );
  };
  onSubmit = e => {
    e.preventDefault();
    this.getAllStocks(this.state.searchbarVal);
  };

  displaySearches = stockArray => {
    let res =
      stockArray &&
      stockArray.map(stock => {
        return (
          <tr key={stock["1. symbol"]}>
            <td> {stock["1. symbol"]}</td>
            <td>{stock["2. name"]}</td>
            <td>{stock["3. type"]}</td>
            <td> {stock["4. region"]} </td>
            <td>{stock["5. marketOpen"]}</td>
            <td>{stock["6. marketClose"]}</td>
            <td> {stock["7. timezone"]} </td>
            <td>{stock["8. currency"]}</td>
            <td>{stock["9. matchScore"]}</td>
          </tr>
          // <div>
          //   {stock["1. symbol"]},{stock["2. name"]},{stock["3. type"]},
          //   {stock["4. region"]},{stock["5. marketOpen"]},
          //   {stock["6. marketClose"]},{stock["7. timezone"]},
          //   {stock["8. currency"]},{stock["9. matchScore"]}
          // </div>
        );
      });
    return res;
  };
  render() {
    let res = this.displaySearches(this.state.bestMatches);
    return (
      <div>
        <div>
          <h1>Welcome {this.state.email}</h1>
          <h1>Profile (${this.state.totalCash})</h1>
          <button>Buy Stock</button>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Search stock"
              name="searchbarVal"
              onChange={this.inputHandler}
            />
            <button>Search</button>
          </form>
        </div>

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
                  <th>Symbol</th>
                  <th>Name</th>

                  <th>Type</th>
                  <th>Region</th>
                  <th>Market Open</th>

                  <th>Market Close</th>
                  <th>Timezone</th>
                  <th>Currency</th>

                  <th>MatchScore</th>
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

export default Home;
