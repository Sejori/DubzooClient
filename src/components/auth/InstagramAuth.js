//           INSTAGRAM AUTHORISATION AND STORAGE OF CREDENTIALS
//
//

import React, { Component } from 'react';

const keys = require('../../config/keys');

var accountId;

class InstagramAuth extends Component {
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

    // CHANGE!

    // if (response.youtubeaccount === null) {
    //   return;
    // } else {
    //   accountId = response.youtubeaccount._id;
    //   if (response.youtubeaccount.tokenObj.access_token !== null) {
    //     if (response.youtubeaccount.tokenObj.expires_at < new Date().getTime()) {
    //       this.logout();
    //       this.Authorise();
    //       alert("Uh-oh. Your YouTube access has expired, please sign-in again :)")
    //     } else {
    //       this.Authorise();
    //     }
    //   }
    // }
  }

  logout = () => {
    // Retrieve credentials from database
    fetch(keys.STRAPI_URI + '/instagramaccounts/' + accountId, {
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
            // put login button here
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

export default InstagramAuth;
