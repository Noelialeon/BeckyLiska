import React, { Component } from 'react';

export default class CollectionFolder extends Component {

  render() {
    console.log("COLEEEEECTION", this.props.userCollections)

    return (
      <div className="folder-group">
        {/* {this.props.userCollections.map((collection, i) => {
          console.log("coleeeeeectionsdata", collection)
          return (
            <div>
              <div className="singleFolder" key={i}>
                {collection.name}
              </div>
              <p>I am a Folder - Click me to get inside</p>
            </div>
          )
        })
        } */}
      </div>
    )
  };
};