import React, { Component } from "react";
import Signup from "./Signup";
import Login from "./Login";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <Signup history={this.props.history} loggedInUser={this.props.loggedInUser} />
        <Login history={this.props.history} loggedInUser={this.props.loggedInUser} />
      </div>
    )
  }
}

export default LandingPage;