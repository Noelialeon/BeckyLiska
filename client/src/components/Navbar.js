import React, { Component } from "react";
import { Link } from "react-router-dom";
import Service from './service'


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: {}
    };

    this.myService = new Service()

  }

  logout = () => {
    this.myService.logout().then(response => {
      console.log(response)
      // this.setState({
      //   collections: response.data
      // });
    })
      .catch(error => console.log(error));
  }

  render() {

    return (
      <nav className="nav-wrapper white darken-3" >
        <Link to="/Home" className="brand-logo" />
        <img
          className="logo"
          src="../images/logo_transparent.png"
          alt="meaningful text"
        />
        <div className="NavBar">
          <ul>
            <Link to="/">Home</Link>
            <Link to="/Collections">Collections</Link>
            <Link to="/">
              <button onClick={(() => this.logoutUser())}>Logout</button></Link>
          </ul>
        </div>
      </nav>
    );
  }
};

export default Navbar;
