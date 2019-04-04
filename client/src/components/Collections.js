import React, { Component } from "react";
import Axios from "axios";
import Navbar from "./Navbar";
import Service from './service';

import CollectionFolder from "./CollectionFolder";
import Footer from "./Footer";

export default class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [] // not sure how to reference user in DB
    };
    this.myService = new Service()
  }

  componentDidMount() {
    // Axios.get(
    //   (process.env.REACT_APP_API_URL || "http://localhost:5000") +
    //   "/collections/user/collections"
    // )
    console.log("response THIS IS THE SERVICE.GETSTORIES")
    this.myService.isLoggedIn().then(response => {
      console.log(response)
      // this.setState({
      //   collections: response.data
      // });
    })
      .catch(error => console.log(error));
  }

  addCollection = event => {
    event.preventDefault();
    Axios.post(
      (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/collections/add-collection" //? not sure whether here or in server
    );
  };

  render() {
    return (
      <div className="collections">
        <Navbar />
        <div>
          <h1>Collections</h1>\
        </div>
        <CollectionFolder userCollections={this.state.collections} />

        <div className="addCollection">
          <img alt="New Collection" src="images/NewsIcon.png" onClick={this.addCollection} />
        </div>

        <Footer />
      </div>
    );
  }
}
