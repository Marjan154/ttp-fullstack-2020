import React, { Component } from "react";
import styles from "../styles/home.css";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { email: this.props.match.params.email };
  }

  componentDidMount() {}
  render() {
    return <div>Home Page</div>;
  }
}

export default Home;
