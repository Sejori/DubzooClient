//          SOUNDCLOUD AUTHORISATION AND STORAGE OF CREDENTIALS
//
// This component first checks to see if the Dubzoo user has Soundcloud
// credentials stored. If so it changes the authorised state. If not authorised
// there is an input field for username (only auth needed for scraping).
//
// The login function sends this username to the Strapi backend to create a new
// Soundcloudaccount entry in the db and changes the authorised state. Logout
// removes the username from the backend and changes authorised state.

import React, { Component } from 'react';

const keys = require('../../config/keys');

class SoundcloudAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artistInput: "",
      authorised: false
    }
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

    if (json.soundcloudaccount !== null) {
      this.Authorise();
    }
  }

  Login = async() => {

    let channelName = this.state.artistInput;
    let user = this.props.user.userID;

    // Store retrieved credentials in database
    await fetch(keys.STRAPI_URI + '/soundcloudaccounts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
      body: JSON.stringify({
        "channelName": channelName,
        "user": user
      })
    })

    this.Authorise();
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

    fetch(keys.STRAPI_URI + '/soundcloudaccounts/' + json.soundcloudaccount._id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    this.Authorise();
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    switch (this.state.authorised) {
      case false:
        return(
          <div className="SoundcloudAuth">
            <input
              name="artistInput"
              type="text"
              placeholder="Soundcloud Username"
              value={this.state.artistInput}
              onChange={this.handleChange}
            />
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

export default SoundcloudAuth;
