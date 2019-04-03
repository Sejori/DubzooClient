//                        SOCIAL BLOCK
//
// Creates a series of social graphs for each social present on selecteArtist

import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import "react-tabs/style/react-tabs.css"
import "../../styles/tabs.css"

import Social from './Social'
import Overview from './Overview'

class SocialList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabIndex: 0
    }
  }

  render() {

    if (!this.props.user.jwt) {
      return(
        <div>
          <div>
            <p>Please login or register to manage your artist's socials.</p>
          </div>
        </div>
      )
    }

    if (this.props.user.jwt) {
      let artist = this.props.artist
      var socials = []
      var socialGraphs = []
      var socialTabs = []

      if (artist.artistName) {
        socialGraphs.push(<TabPanel key="overview"><Overview artist={artist}/></TabPanel>)
        socialTabs.push(<Tab key="overview">Overview</Tab>)
      }

      // if youtube -> create youtube graphs
      if (artist.youtubeHandle) {
        socials.push({
          handle: artist.youtubeHandle,
          data: artist.youtubeData || [],
          social: 'youtube'
        })
      }

      // if soundcloud -> create youtube graphs
      if (artist.soundcloudHandle) {
        socials.push({
          handle: artist.soundcloudHandle,
          data: artist.soundcloudData || [],
          social: 'soundcloud'
        })
      }

      // if spotify -> create youtube graphs
      if (artist.spotifyHandle) {
        socials.push({
          handle: artist.spotifyHandle,
          data: artist.spotifyData || [],
          social: 'spotify'
        })
      }

      // if instagram -> create youtube graphs
      if (artist.instagramHandle) {
        socials.push({
          handle: artist.instagramHandle,
          data: artist.instagramData || [],
          social: 'instagram'
        })
      }

      // if facebook -> create youtube graphs
      if (artist.facebookHandle) {
        socials.push({
          handle: artist.facebookHandle,
          data: artist.facebookData || [],
          social: 'facebook'
        })
      }

      // if twitter -> create youtube graphs
      if (artist.twitterHandle) {
        socials.push({
          handle: artist.twitterHandle,
          data: artist.twitterData || [],
          social: 'twitter'
        })
      }

      // add individual social tabs and graphs to display variables
      socialTabs.push(socials.map( (item, index) => {
        return (<Tab>{item.social}</Tab>)
      }))

      socialGraphs.push(socials.map( (item, index) => {
        if (!item.data.length) return (
          <div>
            <h4 style={{ textAlign: "center" }}>There is currently no data for this social.</h4>
            <br />
            <br />
            <p>Either we are still gathering the data or the handle that you have input cannot be found.</p>
            <p>Make sure you can find the artist at [insert socialplatform].com/[insert artisthandle]</p>
          </div>
        )
        return (
          <TabPanel>
            <Social
              handle={ item.handle }
              data={ item.data }
              social={ item.social }
              key={ item.social }
            />
          </TabPanel>
        )
      }))

      if (!socialGraphs[0]) {
        socialGraphs = <p style={{width: "100%", textAlign: "center"}}>Manage artists above then select to see social stats here.</p>
      }

      return(
        <div className="social-list">
          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabList>
              {socialTabs}
            </TabList>
            {socialGraphs}
          </Tabs>
      </div>
      )
    }
  }
}

export default SocialList;
