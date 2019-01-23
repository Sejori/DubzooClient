import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

const keys = require('../../config/keys');

class YouTubeAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorised: false
    }
  }

  componentDidMount = () => {
    this.CheckCredentials();
  }

  CheckCredentials = () => {

    // Retrieve credentials from database
    fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    .then(response => response.json())
    .then(response => this.IsTokenValid(response))
  }

  IsTokenValid = (response) => {
    if (response.youtubeaccounts[0] === undefined) {
      this.setState({ authorised: false })
    } else {
      if (response.youtubeaccounts[0].tokenObj.access_token !== undefined) {
        this.setState({ authorised: true })
      }
      if (response.youtubeaccounts[0].tokenObj.expires_at < new Date().getTime()) {
        this.setState({ authorised: false })
        alert("Uh-oh. Your access has expired, please sign-in again :)")
      }
    }
  }

  onFailure = (error) => {
    console.log(error);
  };

  googleResponse = (response) => {

    let channelName = response.profileObj.name;
    let profileObj = response.profileObj;
    let tokenObj = response.tokenObj;
    let user = this.props.user.userID;

    // Store retrieved credentials in database
    fetch(keys.STRAPI_URI + '/youtubeaccounts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
      body: JSON.stringify({
        "channelName": channelName,
        "profileObj": profileObj,
        "tokenObj": tokenObj,
        "user": user
      })
    })

    // call check credentials fcn
    this.CheckCredentials();
  }

  render() {
    switch (this.state.authorised) {
      case false:
        return(
          <div>
              <GoogleLogin
                  clientId={keys.GOOGLE_CLIENT_ID}
                  scope={keys.YOUTUBE_AUTH_SCOPE}
                  buttonText="Login"
                  responseType="id_token"
                  prompt="consent"
                  accessType="offline"
                  onSuccess={this.googleResponse}
                  onFailure={this.onFailure}
              />
          </div>
        )

      default:
        return(
          <div>
          <button onClick={this.logout}>Logout</button>
          </div>
        )
    }
  }
}

export default YouTubeAuth;
