import React, { Component } from "react";
// import { MDBCol, MDBIcon } from "mdbreact";
import Footer from "./Footer";
// import { Link } from "react-router-dom";

import LandingPage from "./auth/LandingPage";
import Home from "./Home";

import Service from './service'
// import { Redirect } from "react-router-dom";
// // import onSubmit from "../components/Search";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loggedInUser: {}
      // redirect: false
    };
  }
  fetchUser = (user) => {
    this.setState({ loggedInUser: user })
  }

  render() {
    return (
      <div>
        {/* {this.state.loggedInUser && <Home user={this.loggedInUser} />}
      {!this.state.loggedInUser && <LandingPage loggedInUser={this.fetchUser} />} */}
        <Footer />
      </div>
    );
  }
}
export default Main;
