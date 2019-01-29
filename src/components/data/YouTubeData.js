import React, { Component } from 'react';
import axios from 'axios';

const keys = require('../../config/keys');
var Content;

class YouTubeData extends Component {

  GetDates = () => {
    // getting current date
    var today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    today = mm+'-'+dd+'-'+yyyy;

    mm = mm - 1;
    var monthAgo = mm+'-'+dd+'-'+yyyy;

    return(today, monthAgo);
  }

  FetchData = async() => {

    // get YT credentials from db
    const appResponse = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const appJson = await appResponse.json();

    if (appJson.youtubeaccount == null) {
      alert("Something went wrong!")
    } else {
      if (appJson.youtubeaccount.tokenObj.access_token != null) {
        var accessToken = appJson.youtubeaccount.tokenObj.access_token;
        var channelName = appJson.youtubeaccount.profileObj.name;
      }
      if (appJson.youtubeaccount.tokenObj.expires_at < new Date().getTime()) {
        alert("Uh-oh. Your access has expired, please sign-in again :)")
      }
    }

    // USE A LONG ENDPOINT URI INSTEAD
    // Store retrieved credentials in database
    const youTubeResponse = await fetch(keys.YOUTUBE_ANALYTICS_URI, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": 'true',
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
        "ids": 'channel==' + channelName,
        "accessToken": accessToken,
        "scope": keys.YOUTUBE_SCOPES,
        "endDate": this.GetDates().today,
        "scope": keys.YOUTUBE_SCOPES,
        "startDate": this.GetDates().monthAgo,
        "metrics": 'estimatedMinutesWatched,views,likes,subscribersGained',
        "dimensions": 'hour',
        "sort": 'day'
      }
    })
    const youTubeJson = await youTubeResponse.json();
    console.log(youTubeJson);

    // // GET YT Analytics API
    // axios
    //   .get(keys.YOUTUBE_ANALYTICS_URI, {
    //     access_token: accessToken,
    //     endDate: today,
    //     ids: channelName,
    //     scope: keys.YOUTUBE_SCOPES,
    //     startDate: monthAgo,
    //     metrics: 'estimatedMinutesWatched,views,likes,subscribersGained',
    //     dimensions: 'hour',
    //     sort: 'day'
    //   })
    //   .then(response => {
    //     // Handle success.
    //     console.log('Well done!');
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     // Handle error.
    //     console.log('An error occurred:', error);
    //   });

  }

  render() {

    Content = <button onClick={this.FetchData}>Fetch Data</button>

    return(
      <div className="Data">
        {Content}
      </div>
    );
  }
}

export default YouTubeData;
