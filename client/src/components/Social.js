import React, { Component } from 'react';
import YouTubeAuth from './auth/YouTubeAuth';
import YouTubeData from './data/YouTubeData';

var Auth;
var Data;

class Social extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      data: undefined
    }
  }

  // called from auth child
  UpdateUser = (userID, name, email, accessToken) => {

    let user = {
      userID: userID,
      name: name,
      email: email,
      accessToken: accessToken
    }

    this.setState({ user: user });
  }

  // called from data child
  UpdateData = (arg1, arg2) => {

    let data = {
      arg1: arg1,
      arg2: arg2
    }

    this.setState({ data: data });
  }

  render() {

    if (this.props.target === "YouTube") {
      Auth = <YouTubeAuth UpdateUser={this.UpdateUser}/>;
      Data = <YouTubeData user={this.state.user} UpdateData={this.UpdateData}/>;
    } else {
      Auth = "Please supply a configured target";
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
