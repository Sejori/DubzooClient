import React, { Component } from 'react';

class YouTubePlot extends Component {
  constructor(props) {
    super(props)

    this.state = { data: null }
  }

  GetData = () => {
    // Get users youtube account from db
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const json = await response.json();

    // get youtube account data from db
    fetch(keys.STRAPI_URI + '/youtubeaccounts/' + json.youtubeaccount._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      }
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
      {this.state.data}
    )
  }
}

export default YouTubePlot;
