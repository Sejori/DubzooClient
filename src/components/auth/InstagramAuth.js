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
    let authURI = keys.INSTAGRAM_URI + '/oauth/authorize/?client_id=' + keys.INSTAGRAM_CLIENT_ID + '&redirect_uri=' + keys.HOST_URI + '&response_type=token';
    let popupURI = "";
    let authPopup = window.open(authURI, "authPopup", 'width=800,height=600')

    // wait for redirect from auth popup
    var checkInterval = setInterval(() => {
      popupURI = authPopup.location.href;

      if (popupURI.substr(0,6) === window.location.href.substr(0,6)) {
        clearInterval(checkInterval);

        // retrieving access token from URI + building tokenObj
        let accessTokenIndex = popupURI.search("=");
        let access_token = popupURI.slice(accessTokenIndex + 1);
        let expires_at = new Date().getTime() + 3600000;
        let tokenObj = {
          "access_token": access_token,
          "expires_at": expires_at
        }

        // POST ACCESS TOKEN TO DB
        fetch(keys.STRAPI_URI + '/instagramaccounts', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.props.user.jwt
          },
          body: JSON.stringify({
            "tokenObj": tokenObj,
            "user": this.props.user.userID
          })
        })
        authPopup.close();
        this.Authorise();
      }
    }, 500);

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
