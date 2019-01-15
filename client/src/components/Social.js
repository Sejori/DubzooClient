import React, { Component } from 'react';
import YouTubeAuth from './auth/YouTubeAuth';

class Social extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userID: [],
        name: [],
        email: [],
        accessToken: []
      },
      data: []
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

  // FetchData = async () => {
  //
  // }

  render() {
    switch(this.props.target) {
      case null:
        return(
          <div className="Social">
            <h2>BUG: Please supply a Social target.</h2>
          </div>
        );

      case "YouTube":
        return(
          <div className="Social">
            <h2>{this.props.target}</h2>
            <YouTubeAuth UpdateUser={this.UpdateUser}/>
          </div>
        );

      default:
        return(
          <div className="Social">
            <h2>BUG: This Social target does not exist.</h2>
          </div>
        );
    }
  }
}

export default Social;
