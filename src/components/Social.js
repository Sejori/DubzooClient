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
      socialUser: undefined,
      socialData: undefined
    }
  }

  // called from auth child
  UpdateUser = (userID, name, email, accessToken) => {

    let socialUser = {
      userID: userID,
      name: name,
      email: email,
      accessToken: accessToken
    }

    this.setState({ socialUser: socialUser });

  }

  // called from data child
  UpdateData = (arg1, arg2) => {

    let socialData = {
      arg1: arg1,
      arg2: arg2
    }

    this.setState({ socailData: socialData });
  }

  componentDidUpdate = (prevProps) => {
    // Typical usage (don't forget to compare props):
    if (this.props.user.jwt !== prevProps.user.jwt) {
     this.setState({ loggedIn: !this.state.loggedIn });
    }
  }

  render() {

    if (this.state.loggedIn === false) {
      Auth = "^ Please login above ^";
      Data = "";
    } else {
      if (this.props.target === "YouTube") {
        Auth = <YouTubeAuth user={this.props.user} UpdateUser={this.UpdateUser}/>;
        Data = <YouTubeData user={this.props.user} socialUser={this.state.socialUser} UpdateData={this.UpdateData}/>;
      } else {
        Auth = "DEV ISSUE: Please supply a configured target";
      }
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
