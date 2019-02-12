//                          SOUNDCLOUD SCRAPER
//
// FetchData function gets soundcloud account id from strapi backend then
// scrapes the Soundlcoud page for that profile. The MakeArray function then
// adds new data to existing data in the db UpdateData sends it back to Strapi.

import React, { Component } from 'react';

const keys = require('../../config/keys');

class SoundcloudData extends Component {

  FetchData = async() => {
    // get soundcloud credentials from db
    const appResponse = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const appJson = await appResponse.json();
    if (appJson.soundcloudaccount === null) {
      alert("Something went wrong fetching your data.")
    } else {
      if (appJson.soundcloudaccount.tokenObj.access_token !== null) {
        if (appJson.soundcloudaccount.tokenObj.expires_at < new Date().getTime()) {
          alert("Something went wrong fetching your data.")
        }
      }
    }

    // Do soundcloud GET for users profile page
    const socialResponse = await fetch('https://cors-anywhere.herokuapp.com/' + keys.SOUNDCLOUD_URI + '/' + appJson.soundcloudaccount.channelName)
    const socialHTML = await socialResponse.text();

    // Scrape followers number
    let followersStartIndex = socialHTML.search('soundcloud:follower_count') + 36;
    let followersEndIndex = socialHTML.search('<link rel="canonical"') - 5;
    let followers = socialHTML.substring(followersStartIndex, followersEndIndex);

    // Get date
    // getting current date
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();

    if (mm.toString().length < 2) mm = '0' + mm;
    if (dd.toString().length < 2) dd = '0' + dd;

    date = yyyy+'-'+mm+'-'+dd;

    let entry = [
      date,
      followers
    ]
    this.UpdateData(entry);

  }

  // Function makes sure data is an array, then removes and compares last entry date to new entry date.
  // If they are not equal it put the last entry back and then adds new entry. If they are equal it
  // leaves the last entry out and puts the new entry in (replacing follower count for that date).
  MakeArray = (entry, data) => {
    if (data === "") {
      data = [
        [
          "day",
          "followers"
        ]
      ];
    }
    let lastEntry = data.pop()
    if (lastEntry[1] !== entry[1]) {
      data.push(lastEntry);
    }
    data.push(entry);
    console.log(data)
    return(data);
  }

  UpdateData = async(entry) => {

    // Retrieve credentials from database
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    let json = await response.json();
    console.log(json)

    var data;
    if (json.soundcloudaccount.data === null) {
      data = entry;
    } else {
      data = this.MakeArray(entry, json.soundcloudaccount.data);
    }

    // send data to soundcloud account from db
    fetch(keys.STRAPI_URI + '/soundcloudaccounts/' + json.soundcloudaccount._id, {
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
      <div className="SoundcloudData">
        <button onClick={this.FetchData}>Fetch Data</button>
      </div>
    );
  }
}

export default SoundcloudData;
