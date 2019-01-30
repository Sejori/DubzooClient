import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

const keys = require('../../config/keys');

class YouTubeAuth extends Component {

  componentDidMount = () => {
    this.checkCredentials();
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.authorised !== prevProps.authorised) {
      this.render();
    }
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
    if (response.youtubeaccount == null) {
      return;
    } else {
      if (response.youtubeaccount.tokenObj.access_token != null) {
        this.setYouTubeAccountId(response);
        this.props.Authorise();
      }
      if (response.youtubeaccount.tokenObj.expires_at < new Date().getTime()) {
        this.logout();
        alert("Uh-oh. Your access has expired, please sign-in again :)")
      }
    }
  }

  setYouTubeAccountId = (response) => {
    if (response.youtubeaccount != null) {
      this.setState({ youtubeaccountId: response.youtubeaccount._id })
    }
  }

  logout = () => {
    // Retrieve credentials from database
    fetch(keys.STRAPI_URI + '/youtubeaccounts/' + this.state.youtubeaccountId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    this.props.Authorise();
  }

  onFailure = (error) => {
    console.log(error);
  };

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

  render() {
    switch (this.props.authorised) {
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
