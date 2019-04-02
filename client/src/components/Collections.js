import React, { Component } from "react";
import Axios from "axios";
import Navbar from "./Navbar";

import CollectionFolder from "./CollectionFolder";
import Footer from "./Footer";

export default class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [] // not sure how to reference user in DB
    };
  }

  componentDidMount() {
    Axios.get(
      (process.env.REACT_APP_API_URL || "http://localhost:5000") +
      "/user/collections"
    )
      .then(response => {
        console.log("response", response)
        this.setState({
          collections: response.data
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="collections">
        <Navbar />
        <div>
          <h1>Collections</h1>\
        </div>
        <CollectionFolder userCollections={this.state.collections} />

        <Footer />
      </div>
    );
  }
}
