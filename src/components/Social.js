import React, { Component } from 'react';

import YouTubeAuth from './auth/YouTubeAuth';
import YouTubeData from './data/YouTubeData';
import SoundcloudAuth from './auth/SoundcloudAuth';
import SoundcloudData from './data/SoundcloudData';
import Plot from './plot/Plot.js';

var Auth;
var Data;
var Graph;

class Social extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    }
  }

  render() {

    if (this.props.target === "YouTube") {
      Auth = <YouTubeAuth user={this.props.user}/>;
      Data = <YouTubeData user={this.props.user}/>;
      Graph = <Plot user={this.props.user} target={this.props.target}/>;
    }

    if (this.props.target === "Soundcloud") {
      Auth = <SoundcloudAuth user={this.props.user}/>;
      Data = <SoundcloudData user={this.props.user}/>;
      Graph = <Plot user={this.props.user} target={this.props.target}/>;
    }

    if (this.props.user.jwt === undefined) {
      Auth = "^ Please login above ^";
      Data = "";
      Graph = "";
    }

    return(
      <div className="Social">
        <h2>{this.props.target}</h2>
        <div className="Social-content">
          {Graph}
          {Data}
          {Auth}
        </div>
      </div>
    );

  }
}

export default Social;
