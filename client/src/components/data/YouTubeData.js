import React, { Component } from 'react';
import axios from 'axios';

const keys = require('../../config/keys');
var Content;

class YouTubeData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channelName: "",
      data: undefined
    }
  }

  FetchData = async() => {
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

  handleChange = ({ target }) => {
    this.setState({
      channelName: target.value
    });
  }

  render() {

    if (this.props.user === undefined) {
      Content = "";
    } else {
      Content =
        <div className="Data">
          <input
            name="channelName"
            type="text"
            placeholder="YouTube Channel Name"
            value={this.state.channelName}
            onChange={this.handleChange}
          />
          <button onClick={this.FetchData}>Fetch Data</button>
        </div>
    }

    return(
      Content
    );
  }
}

export default YouTubeData;
