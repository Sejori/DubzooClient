//            YOUTUBE AUTHORISATION AND STORAGE OF CREDENTIALS
//
// This component first checks to see if the Dubzoo user has YouTube
// credentials stored. If so it changes the authorised state. If not authorised
// the google login button is visible (only auth needed for scraping).
//
// The google login component comes from react-google-login and handles the
// Oauth flow. The googleResponse function then sends the credentials to the
// Strapi backend and changes the authorised state.
// Logout removes the credentials from the backend and changes authorised state.

import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

const keys = require('../../config/keys');

class YouTubeAuth extends Component {
  constructor(props) {
    super(props)

    this.state = { authorised: false }
  }

  Authorise = () => {
    this.setState({ authorised: !this.state.authorised })
  }

  componentDidMount = () => {
    this.checkCredentials();
  }

  checkCredentials = async() => {
    // Retrieve credentials from database
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const json = await response.json();
    this.isTokenValid(json)
  }

  isTokenValid = (response) => {
    if (response.youtubeaccount === null) {
      return;
    } else {
      if (response.youtubeaccount.tokenObj.access_token !== null) {
        if (response.youtubeaccount.tokenObj.expires_at < new Date().getTime()) {
          this.logout();
          alert("Uh-oh. Your YouTube access has expired, please sign-in again :)")
        } else {
          this.Authorise();
        }
      }
    }
  }

  logout = async() => {
    // Retrieve credentials from database
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const json = await response.json();

    fetch(keys.STRAPI_URI + '/youtubeaccounts/' + json.youtubeaccount._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    this.Authorise();
  }

  googleResponse = async(response) => {

    let channelName = response.profileObj.name;
    let profileObj = response.profileObj;
    let tokenObj = response.tokenObj;
    let user = this.props.user.userID;

    // Store retrieved credentials in database
    await fetch(keys.STRAPI_URI + '/youtubeaccounts', {
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
    this.checkCredentials();
  }

  onFailure = (error) => {
    console.log(error);
  };

  render() {
    switch (this.state.authorised) {
      case false:
        return(
          <div className="YouTubeAuth">
              <GoogleLogin
                  clientId={keys.GOOGLE_CLIENT_ID}
                  scope={keys.YOUTUBE_SCOPES}
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
