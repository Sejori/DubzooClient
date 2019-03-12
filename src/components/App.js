//                            APP COMPONENT
//
// Containts user credentials as state and UpdateUser function to be passed to
// components.

import React, { Component } from 'react'
import StrapiAuth from './auth/StrapiAuth'
import SocialList from './socials/SocialList'
import ArtistList from './artists/ArtistList'
import ArtistEdit from'./artists/ArtistEdit'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userID: undefined,
        username: undefined,
        jwt: undefined
      },
      selectedArtist: [],
    }
  }

  UpdateUser = (userID, username, jwt) => {
    let user = { userID, username, jwt }
    this.setState({ user: user })
  }

  SelectArtist = (artistID) => {
    this.setState({ selectedArtist: artistID })
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>DUBZOO</h1>
          <StrapiAuth UpdateUser={this.UpdateUser} user={this.state.user}/>
        </div>

        <div className="app-main">
          <div>
            <ArtistList user={this.state.user} SelectArtist={this.SelectArtist}/>
          </div>

          <div className="social-list">
            <SocialList user={this.state.user} artist={this.state.artist} />
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
