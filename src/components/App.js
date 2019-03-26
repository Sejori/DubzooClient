//                            APP COMPONENT
//
// Containts user credentials as state and UpdateUser function to be passed to
// components.

import React, { Component } from 'react'
import StrapiAuth from './auth/StrapiAuth'
import SocialList from './metrics/SocialList'
import ArtistList from './artists/ArtistList'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userID: undefined,
        username: undefined,
        jwt: undefined
      },
      selectedArtist: {}
    }
  }

  UpdateUser = (userID, username, jwt) => {
    let user = { userID, username, jwt }
    this.setState({ user: user })
  }

  SelectArtist = (artist) => {
    this.setState({ selectedArtist: artist })
  }

  render() {

    var artistList = ""
    if (this.state.user.jwt) artistList = <ArtistList user={this.state.user} UpdateUser={this.UpdateUser} SelectArtist={this.SelectArtist}/>

    return (
      <div>
        <div className="header">
          <h1>DUBZOO</h1>
          <StrapiAuth UpdateUser={this.UpdateUser} user={this.state.user}/>
        </div>

        <div className="app-main">
          <div>
            {artistList}
          </div>

          <div className="social-list">
            <SocialList user={this.state.user} artist={this.state.selectedArtist} />
          </div>
        </div>

        <div className="footer">
          <a href="https://www.dubzoo.io/privacy-policy">Privacy Policy</a>
        </div>
      </div>
    );
  }
}

export default App;
