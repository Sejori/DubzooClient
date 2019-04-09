//                            APP COMPONENT
//
// Containts user credentials as state and UpdateUser function to be passed to
// components.

import React, { Component } from 'react'
import Header from './Header'
import SocialList from './metrics/SocialList'
import ArtistList from './artists/ArtistList'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        jwt: undefined
      },
      selectedArtist: {},
      tabIndex: 0
    }
  }

  // use componentDidMount to check local storage for JWT
  componentDidMount = () => {
    // get DubzooJWT from localStorage
    if (!localStorage.getItem('dubzooJWT')) return
    this.updateUser(localStorage.getItem('dubzooJWT'))
  }

  updateUser = (jwt) => {
    let user = { jwt: jwt }
    this.setState({ user: user })
  }

  SelectArtist = (artist) => {
    this.setState({ selectedArtist: artist })
  }

  render() {

    let containerContent = ""
    let appContent = <div style={{textAlign: 'center'}}>
      <h1>Welcome to Dubzoo.</h1>
      <h2>A tool designed to help musicians succeed.</h2>
      <br />
      <p>Lucky enough to have been granted access?</p>
      <p>Type in the password then login or register from the menu to get started!</p>
    </div>

    if (this.state.user.jwt) {
      appContent = <ArtistList user={this.state.user} updateUser={this.updateUser} SelectArtist={this.SelectArtist} artist={this.state.selectedArtist}/>

      if (this.state.selectedArtist.artistName) {
        containerContent = <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            <Tab>Metrics</Tab>
            <Tab>Superfans</Tab>
          </TabList>
          <TabPanel key="Metrics"><SocialList user={this.state.user} artist={this.state.selectedArtist} /></TabPanel>
          <TabPanel key="Superfans"><h4 style={{textAlign: 'center'}}>The goals section is currently in development <span aria-labelledby="jsx-a11y/accessible-emoji" role="img">🤓</span></h4></TabPanel>
        </Tabs>
      } else {
        containerContent = <p>Create or select an artist to see their metrics.</p>
      }
    }

    return (
      <div className="wrapper">
        <Header updateUser={this.updateUser} user={this.state.user}/>

        <div className="app-main">
          <div>
            {appContent}
          </div>

          <div className="container">
            {containerContent}
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
