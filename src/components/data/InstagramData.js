//                          INSTAGRAM API CALLER
//
// FetchData function gets IG account id from strapi backend then
// does API calls for user info. The MakeArray function then
// adds new data to existing data in the db UpdateData sends it back to Strapi.

import React, { Component } from 'react';

const keys = require('../../config/keys');

class InstagramData extends Component {

  FetchData = async() => {

    // get instagram credentials from db
    const appResponse = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const appJson = await appResponse.json();
    if (appJson.instagramaccount === null) {
      alert("Please login to your Instagram account first.")
      return;
    } else {
      if (appJson.instagramaccount.tokenObj.access_token !== null) {
        if (appJson.instagramaccount.tokenObj.expires_at < new Date().getTime()) {
          alert("Something went wrong fetching your data.")
        }
      }
    }

    // Instagram API GET user
    const userResponse = await fetch('https://cors-anywhere.herokuapp.com/' + keys.INSTAGRAM_USER_URI + appJson.instagramaccount.tokenObj.access_token)
    const userJSON = await userResponse.json();

    // store metrics
    // let socialID = socialJSON.data.id;
    let mediaCount = userJSON.data.counts.media;
    let followCount = userJSON.data.counts.follows;
    let followerCount = userJSON.data.counts.followed_by;

    // Instagram API GET recent media
    const mediaResponse = await fetch('https://cors-anywhere.herokuapp.com/' + keys.INSTAGRAM_MEDIA_URI + appJson.instagramaccount.tokenObj.access_token)
    const mediaJSON = await mediaResponse.json();

    console.log(mediaJSON)

    //store metrics

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
      mediaCount,
      followCount,
      followerCount,
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
          "date",
          "media",
          "follows",
          "followers"
        ]
      ];
    }
    let lastEntry = data.pop()
    if (lastEntry[0] !== entry[0]) {
      data.push(lastEntry);
    }
    data.push(entry);
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

    var data;
    if (json.instagramaccount.data === null) {
      data = entry;
    } else {
      data = this.MakeArray(entry, json.instagramaccount.data);
    }

    // send data to instagram account from db
    fetch(keys.STRAPI_URI + '/instagramaccounts/' + json.instagramaccount._id, {
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
      <div className="InstagramData">
        <button onClick={this.FetchData}>Fetch Data</button>
      </div>
    );
  }
}

export default InstagramData;
