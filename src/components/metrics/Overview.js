//                OVER COMPONENT FOR ARTIST STATS
//
// shows cards of total followers and followers from each platform

import React, { Component } from 'react';
import Card from './Card'

class Overview extends Component {

  render() {
    if (!this.props.artist.artistName) {
      return(
        <h2>Select an artist above to see their metrics.</h2>
      )
    }

    var cards = []
    let artist = this.props.artist
    var totalCurrent = []
    var totalPrevious = []
    var previous_value

    if (artist.youtubeHandle) {
      if (artist.youtubeData[artist.youtubeData.length-2]) {
        previous_value = artist.youtubeData[artist.youtubeData.length-2].subscribers
      }
      cards.push({
        "platform": "YouTube",
        "colour": "#FF0000",
        "handle": artist.youtubeHandle,
        "metric": "Subscribers",
        "current_value": artist.youtubeData[artist.youtubeData.length-1].subscribers,
        "previous_value": previous_value
      })
      totalCurrent.push(artist.youtubeData[artist.youtubeData.length-1].subscribers)
      totalPrevious.push(previous_value)
    }

    if (artist.soundcloudHandle) {
      if (artist.soundcloudData[artist.soundcloudData.length-2]) {
        previous_value = artist.soundcloudData[artist.soundcloudData.length-2].follower_count
      }
      cards.push({
        "platform": "Soundcloud",
        "colour": "#ff7700",
        "handle": artist.soundcloudHandle,
        "metric": "Followers",
        "current_value": artist.soundcloudData[artist.soundcloudData.length-1].follower_count,
        "previous_value": previous_value
      })
      totalCurrent.push(artist.soundcloudData[artist.soundcloudData.length-1].follower_count)
      totalPrevious.push(previous_value)
    }

    if (artist.instagramHandle) {
      if (artist.instagramData[artist.instagramData.length-2]) {
        previous_value = artist.instagramData[artist.instagramData.length-2].followers
      }
      cards.push({
        "platform": "Instagram",
        "colour": "#C13584",
        "handle": artist.instagramHandle,
        "metric": "Followers",
        "current_value": artist.instagramData[artist.instagramData.length-1].followers,
        "previous_value": previous_value
      })
      totalCurrent.push(artist.instagramData[artist.instagramData.length-1].followers)
      totalPrevious.push(previous_value)
    }

    if (artist.spotifyHandle) {
      if (artist.spotifyData[artist.spotifyData.length-2]) {
        previous_value = artist.spotifyData[artist.spotifyData.length-2].followers
      }
      cards.push({
        "platform": "Spotify",
        "colour": "#1DB954",
        "handle": artist.spotifyHandle,
        "metric": "Followers",
        "current_value": artist.spotifyData[artist.spotifyData.length-1].followers,
        "previous_value": previous_value
      })
      totalCurrent.push(artist.spotifyData[artist.spotifyData.length-1].followers)
      totalPrevious.push(previous_value)
    }

    if (artist.facebookHandle) {
      if (artist.facebookData[artist.facebookData.length-2]) {
        previous_value = artist.facebookData[artist.facebookData.length-2].like_count
      }
      cards.push({
        "platform": "Facebook",
        "colour": "#4267b2",
        "handle": artist.facebookHandle,
        "metric": "Followers",
        "current_value": artist.facebookData[artist.facebookData.length-1].like_count,
        "previous_value": previous_value
      })
      totalCurrent.push(artist.facebookData[artist.facebookData.length-1].like_count)
      totalPrevious.push(previous_value)
    }

    if (artist.twitterHandle) {
      if (artist.twitterData[artist.twitterData.length-2]) {
        previous_value = artist.twitterData[artist.twitterData.length-2].followers
      }
      cards.push({
        "platform": "Twitter",
        "colour": "#38A1F3",
        "handle": artist.twitterHandle,
        "metric": "Followers",
        "current_value": artist.twitterData[artist.twitterData.length-1].followers,
        "previous_value": previous_value
      })
      totalCurrent.push(artist.twitterData[artist.twitterData.length-1].followers)
      totalPrevious.push(previous_value)
    }

    return(
      <div className="overview">
        <div className="overview-total">
          <Card
            platform={"Total"}
            color={"#ffffff"}
            handle={artist.artistName}
            metric={"Followers"}
            current_value={totalCurrent.reduce(function(total,num) {return Number(total) + Number(num)})}
            previous_value={totalPrevious.reduce(function(total,num) {return Number(total) + Number(num)})}
          />
        </div>
        <div className="row">
          {cards.map(item => (
            <Card
              platform={ item.platform }
              colour={ item.colour}
              handle={ item.handle }
              metric={ item.metric }
              current_value={item.current_value}
              previous_value={item.previous_value}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default Overview
