//                        SOCIAL BLOCK
//
// Loads correct components into block based off target defined in App.js

import React, { Component } from 'react';

import Plot from './Plot.js';

class Social extends Component {

  constructor(props) {
    super(props)

    this.state = { data: "" }


    if (this.props.target === "YouTube") {
      // perform get youtube data function here
    }

    if (this.props.target === "Soundcloud") {
      // perform get Soundcloud data function here
    }

    if (this.props.target === "Instagram") {
      // perform get Instagram data function here
    }

    if (this.props.target === "Twitter") {
      // perform get Twitter data function here
    }
  }

  render() {
    return(
      <div className="Social">
        <h2>{this.props.target}</h2>
        <div className="Social-content">
          <Plot data={this.state.data} />
        </div>
      </div>
    )
  }
}

export default Social;
