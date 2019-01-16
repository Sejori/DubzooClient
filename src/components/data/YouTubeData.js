import React, { Component } from 'react';
import axios from 'axios';

const keys = require('../../config/keys');
var Content;

class YouTubeData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channelName: "",

    }
  }

  componentDidUpdate = (prevProps) => {
    // Typical usage (don't forget to compare props):
    if (this.props.socialUser !== prevProps.socialUser) {
     this.setState({ socialUser: this.props.socialUser });
    }
  }

  FetchData = async() => {

    // PUT DB QUERY TO GET SOCIAL ACCOUNT DETAILS HERE
    alert("you got here");

    // getting current date
    var today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    today = mm+'-'+dd+'-'+yyyy;

    yyyy = yyyy - 1;
    var yearAgo = mm+'-'+dd+'-'+yyyy;

    // GET YT Analytics API
    axios
      .get(keys.YOUTUBE_ANALYTICS_URI, {
        access_token: this.props.user.accessToken,
        endDate: today,
        ids: this.state.channelName,
        scope: keys.YOUTUBE_SCOPES,
        startDate: yearAgo,
        metrics: 'estimatedMinutesWatched,views,likes,subscribersGained',
        dimensions: 'hour',
        sort: 'day'
      })
      .then(response => {
        // Handle success.
        console.log('Well done!');
        console.log(response);
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });

  }

  render() {

    if (this.state.socialUser === undefined) {
      Content = "";
    } else {
      Content = <button onClick={this.FetchData}>Fetch Data</button>
    }

    return(
      <div className="Data">
        {Content}
      </div>
    );
  }
}

export default YouTubeData;
