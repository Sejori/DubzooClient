import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const keys = require('../../config/keys');

class YouTubeAuth extends Component {
  constructor(props) {
      super(props);

      // only userID needed in this component to check whether logged in or not.
      this.state = {
        socialUserID: '',
      };
  }

  logout = () => {
      this.setState({ socialUserID: '' })
  };

  onFailure = (error) => {
    console.log(error);
  };

  googleResponse = (response) => {

    this.setState({ socailUserID: response.googleId })

    // pass credentials to UpdateUser function prop from parent component
    this.props.UpdateUser(
      response.googleId,
      response.profileObj.name,
      response.profileObj.email,
      response.tokenObj.access_token
    );

    // PUT Social acount to Strapi user in db /${this.props.user.jwt}
    console.log(this.props.user.username, this.props.user.jwt)
    axios
      .put(`http://localhost:1337/users/${this.props.user.username}`, {
        headers: {
          Authorization: `Bearer ${this.props.user.jwt}`
        },
        YouTubeUserID: response.googleId,
        YouTubeName: response.profileObj.name,
        YouTubeAccessToken: response.tokenObj.access_token
      })
      .then(response => {
        // Handle success.
        console.log(
          'Well done, your post has been successfully updated: ',
          response.data
        );
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });

  }

  render() {
    switch (this.state.socialUserID) {
      case '':
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
