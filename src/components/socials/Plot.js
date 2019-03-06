//                PLOTS DATA FROM USER'S SOCIAL ACCOUNTS IN DB
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react';

class Plot extends Component {

  render() {
    return(
      <div>
        <div>
          {this.props.data}
        </div>
      </div>
    )
  }
}

export default Plot;
