//                        SOCIAL BLOCK
//
// Creates a series of social graphs for each social present on selecteArtist

import React, { Component } from 'react';

import Social from './Social';

class SocialList extends Component {

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.artist !== this.props.artist) {
  //     this.render()
  //   }
  // }

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
      var socials = []
      let artist = this.props.artist

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


      let socialGraphs = socials.map( (item, index) => {

        if (!item.data.length) return

        return (
          <Social
            handle={ item.handle }
            data={ item.data }
            social={ item.social }
            key={ index }
          />
        )
      })

      return(
        <div>
          {socialGraphs}
        </div>
      )
    }
  }
}

export default SocialList;
