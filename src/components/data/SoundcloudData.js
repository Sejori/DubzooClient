import React, { Component } from 'react';

const keys = require('../../config/keys');

class SoundcloudData extends Component {

  FetchData = async() => {
    // Retrieve soundcloud html file
    const response = await fetch("https://cors-anywhere.herokuapp.com/" + keys.SOUNDCLOUD_URI + '/' + this.state.artistInput)
    const html = response.text();
    console.log(html)
  }

  render() {

    return(
      <div>
        <button onClick={this.FetchData}>Fetch Data</button>
      </div>
    )
  }
}

export default SoundcloudData;
