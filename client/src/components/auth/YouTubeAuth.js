import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

const keys = require('../../config/keys');

class YouTubeAuth extends Component {
  constructor(props) {
      super(props);

      // only userID needed in this component to check whether logged in or not.
      this.state = {
        userID: '',
      };
  }

  logout = () => {
      this.setState({ userID: '' })
  };

  onFailure = (error) => {
    console.log(error);
  };

  googleResponse = (response) => {

    this.setState({ userID: response.googleId })
    // pass credentials to UpdateUser function prop from parent component
    this.props.UpdateUser(
      response.googleId,
      response.profileObj.name,
      response.profileObj.email,
      response.tokenObj.access_token
    );
  };

  render() {
    switch (this.state.userID) {
      case '':
        return(
          <div>
              <GoogleLogin
                  clientId={keys.GOOGLE_CLIENT_ID}
                  buttonText="Login"
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
