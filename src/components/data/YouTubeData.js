import React, { Component } from 'react';
import axios from 'axios';

const keys = require('../../config/keys');

class YouTubeData extends Component {

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
      alert("Something went wrong when fetching your data.")
    } else {
      if (appJson.youtubeaccount.tokenObj.access_token != null) {
        var accessToken = appJson.youtubeaccount.tokenObj.access_token;
      }
      if (appJson.youtubeaccount.tokenObj.expires_at < new Date().getTime()) {
        alert("Something went wrong when fetching your data.")
      }
    }

    // getting current date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();

    date.setDate(date.getDate() - 31);
    let ddPast = date.getDate();
    let mmPast = date.getMonth()+1;
    let yyyyPast = date.getFullYear();

    if (mm.toString().length < 2) mm = '0' + mm;
    if (dd.toString().length < 2) dd = '0' + dd;
    if (mmPast.toString().length < 2) mm = '0' + mmPast;
    if (ddPast.toString().length < 2) dd = '0' + ddPast;

    let today = yyyy+'-'+mm+'-'+dd;
    let monthAgo = yyyyPast+'-'+mmPast+'-'+ddPast;

    // Request data from youtube
    axios.get(keys.YOUTUBE_ANALYTICS_URI,
      {
        headers: {
        //  "Access-Control-Allow-Origin": 'true',
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
        params: {
          "ids": 'channel==MINE',
          "accessToken": accessToken,
          "scope": keys.YOUTUBE_SCOPES,
          "endDate": today,
          "startDate": monthAgo,
          "metrics": 'views,likes,comments,shares,subscribersGained,subscribersLost,averageViewDuration,videosAddedToPlaylists',
          "dimensions": 'day',
          "sort": 'day',
          "key": keys.GOOGLE_API_KEY
        },
      }
    )
    .then(response => {
      let data = this.MakeArray(response);
      this.UpdateData(data);
    })
  }

  MakeArray = (response) => {
    let headers = [];
    let data = response.data.rows;

    response.data.columnHeaders.map((currElement, index) => {
      headers[index] = currElement.name;
      return 'X';
    });

    data.splice(0, 0, headers);
    return(data);
  }

  UpdateData = async(data) => {

    // Get users youtube account from db
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const json = await response.json();

    // send data to youtube account from db
    fetch(keys.STRAPI_URI + '/youtubeaccounts/' + json.youtubeaccount._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
      body: JSON.stringify({
        "data": data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {

    return(
      <div className="YouTubeData">
        <button onClick={this.FetchData}>Fetch Data</button>
      </div>
    );

  }
}

export default YouTubeData;
