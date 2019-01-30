import React, { Component } from 'react';

import YouTubeAuth from './auth/YouTubeAuth';
import YouTubeData from './data/YouTubeData';

var Auth;
var Data;

class Social extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      authorised: false
    }
  }

  Authorise = () => {
    this.setState({ authorised: !this.state.authorised })
  }

  render() {

    if (this.props.user.jwt === undefined) {
      Auth = "^ Please login above ^";
      Data = "";
    } else {
      if (this.props.target === "YouTube") {
        Auth = <YouTubeAuth user={this.props.user} authorised={this.state.authorised} Authorise={this.Authorise}/>;
        Data = <YouTubeData user={this.props.user}/>;
      } else {
        Auth = "DEV ISSUE: Please supply a configured target";
      }
    }
    if (this.state.authorised === false) {
      Data = "";
    }

    return(
      <div className="Social">
        <h2>{this.props.target}</h2>
        {Data}
        {Auth}
      </div>
    );

  }

}

export default Social;
