//           INSTAGRAM AUTHORISATION AND STORAGE OF CREDENTIALS
//
//

import React, { Component } from 'react';

const keys = require('../../config/keys');

class InstagramAuth extends Component {
  constructor(props) {
    super(props)

    this.state = { authorised: false }
  }

  Authorise = () => {
    this.setState({ authorised: !this.state.authorised })
  }

  componentDidMount = () => {
    this.CheckCredentials();
  }

  CheckCredentials = async() => {
    // Retrieve credentials from database
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const json = await response.json();
    this.IsTokenValid(json)
  }

  IsTokenValid = (response) => {

    if (response.instagramaccount == null) {
      return;
    } else {
      if (response.instagramaccount.tokenObj.access_token !== null) {
        if (response.instagramaccount.tokenObj.expires_at < new Date().getTime()) {
          this.Authorise();
          this.Logout();
          alert("Uh-oh. Your Instagram access has expired, please sign-in again :)")
        } else {
          this.Authorise();
        }
      }
    }
  }

  Login = () => {
    // open Oauth pop-up
    let authPopup = window.open(keys.INSTAGRAM_URI + '/oauth/authorize/?client_id=' + keys.INSTAGRAM_CLIENT_ID + '&redirect_uri=' + keys.HOST_URI + '&response_type=token', "authPopup", 'width=800,height=600')
    authPopup.focus()
    let popupURI = '';

    authPopup.onbeforeunload = function(popupURI) {
      popupURI = authPopup.location.href;
      return(popupURI)
    };

    console.log(popupURI)

  }

  Logout = async() => {
    // Retrieve credentials from database
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const json = await response.json();

    fetch(keys.STRAPI_URI + '/instagramaccounts/' + json.instagramaccount._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    this.Authorise();
  }

  render() {
    switch (this.state.authorised) {
      case false:
        return(
          <div className="InstagramAuth">
            <button onClick={this.Login}>Login</button>
          </div>
        )

      default:
        return(
          <div>
            <button onClick={this.Logout}>Logout</button>
          </div>
        )
    }
  }
}

export default InstagramAuth;
