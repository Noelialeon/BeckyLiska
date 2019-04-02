import React, { Component } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Card from "./Card";

export default class InUserFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []

      // redirect: false
    };
  }

  getInfo() {
    let collection =
      (process.env.REACT_APP_API_URL || "http://localhost:5000") +
      `/collections/user/collections`;
    axios.get(collection).then(res => {
      this.setState({
        results: res.data
      });
    });
  };

  componentDidMount() {
    this.getInfo();
  }

  render() {
    return (
      <div>
        <Navbar />

        <Card mirResult={this.state.results} />

        <Footer />
      </div>
    );
    // <div className="folderGroup">
    //         {this.state.collections.map((collection, i) => {
    //           console.log("coleeeeeectionsdata", collection)

    //           return (
    //             <div className="singleFolder" key={i}>
    //               {collection.name}
    //             </div>
    //           )
    //         })}
    //         ;
    //         </div> {/* this is like a button */}
    //     </div>
  }
}
