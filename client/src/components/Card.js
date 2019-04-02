import React, { Component } from "react";
import Axios from "axios";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      date: [],
      url: "",
      text: [],
      results: []
      // redirect: false
    };
  }

  // getInfo = (searchTerm) => {
  //   let url = `http://localhost:5000/api/stories`;
  //   if (searchTerm) url = `http://localhost:5000/api/stories/${searchTerm}`;
  //   Axios.get(url).then(res => {
  //     console.log("line 21", res);

  //     this.setState({
  //       results: res.data
  //     });
  //   });
  // };

  // componentDidMount() {
  //   this.getInfo();
  //   /* console.log(this.state.results) */
  // }

  saveArticle = event => {
    event.preventDefault();
    Axios.post(
      (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/add-article" //? not sure whether here or in server
    );
  };

  openArticleTab() {
    let url = "www.google.com"; //this should be result.url
    // let url = this.state.results.map((result, i) => { return url = result.url })
    window.open(url, "_blank");
  }

  render() {
    // console.log(this.state.results)
    return (
      <div className="card-group-local">
        {this.props.mirResult.map((result, i) => {
          /* console.dir(result.title); */

          return result !== null ? (
            <div className="card-local" key={i}>
              <div className="card-title-local">
                <h4>{result.title}</h4>
              </div>
              <span className="card-footer-local">
                <button type="redirect" onClick={this.saveArticle}>
                  Like
                </button>
              </span>
              <span className="card-footer-local">
                <button target="_blank" onClick={this.openArticleTab}>
                  Go To
                </button>
              </span>
            </div>
          ) : null;
        })}
        ;
      </div>
    );
  }
}
