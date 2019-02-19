//                          TWITTER SCRAPER
//
// FetchData function gets Twitter account id from strapi backend then
// scrapes the Twitter page for that profile. The MakeArray function then
// adds new data to existing data in the db UpdateData sends it back to Strapi.

import React, { Component } from 'react';

const keys = require('../../config/keys');

class TwitterData extends Component {

  FetchData = async() => {

    // get twitter credentials from db
    const appResponse = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const appJson = await appResponse.json();
    if (appJson.twitteraccount === null) {
      alert("Please login to your Twitter account first.")
      return;
    }

    // GET Twitter user page
    const socialResponse = await fetch('https://cors-anywhere.herokuapp.com/' + keys.TWITTER_URI + '/' + appJson.twitteraccount.channelName)
    const socialHTML = await socialResponse.text();

    // find index positions of tags surrounding data. NOTE: data order = tweets, following, followers, likes
    let tweetsStartIndex = socialHTML.search('<span class="u-hiddenVisually">Tweets, current page.</span>') + 115;
    let followingStartIndex = socialHTML.search('<span class="u-hiddenVisually">Following</span>') + 100;
    let followersStartIndex = socialHTML.search('<span class="u-hiddenVisually">Followers</span>') + 100;
    let likesStartIndex = socialHTML.search('<span class="u-hiddenVisually">Likes</span>') + 96;
    let re = / data-is-compact=/g;
    let dataEndIndices = [];
    let match = null;
    while (( match = re.exec(socialHTML)) != null) {
      dataEndIndices.push(match.index)
    }

    let tweetCount = socialHTML.substring(tweetsStartIndex, dataEndIndices[0])
    let followingCount = socialHTML.substring(followingStartIndex, dataEndIndices[1])
    let followerCount = socialHTML.substring(followersStartIndex, dataEndIndices[2])
    let likeCount = socialHTML.substring(likesStartIndex, dataEndIndices[3])
    console.log(tweetCount, followingCount, followerCount, likeCount)

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
      tweetCount,
      followingCount,
      followerCount,
      likeCount
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
          "tweets",
          "following",
          "followers",
          "likes"
        ]
      ];
    }
    let lastEntry = data.pop()
    if (lastEntry[0] !== entry[0]) {
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
    if (json.twitteraccount.data === null) {
      data = entry;
    } else {
      data = this.MakeArray(entry, json.twitteraccount.data);
    }

    // send data to twitter account from db
    fetch(keys.STRAPI_URI + '/twitteraccounts/' + json.twitteraccount._id, {
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
      <div className="TwitterData">
        <button onClick={this.FetchData}>Fetch Data</button>
      </div>
    );
  }
}

export default TwitterData;
