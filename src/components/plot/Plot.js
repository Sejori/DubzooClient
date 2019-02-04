import React, { Component } from 'react';
import keys from '../../config/keys.js'

class Plot extends Component {
  constructor(props) {
    super(props)

    this.state = { data: null }
  }

  GetData = async() => {
    // Get users target social account from db
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.user.jwt
      },
    })
    const json = await response.json();
    console.log(json);
    this.PrintData(json);

  }

  PrintData = (json) => {
    if (this.props.target === "YouTube") {
      if (json.youtubeaccount === undefined) {
        alert("You haven't linked a " + this.props.target + " account yet.")
        return;
      } else if (json.youtubeaccount.data === undefined) {
        alert("You haven't retrieved any " + this.props.target + " data yet.")
        return;
      } else {
        this.setState({ data: json.youtubeaccount.data })
      }
    }
  }

  render() {
    return(
      <div>
        {this.state.data}
        <button onClick={this.GetData}>Plot Data</button>
      </div>
    )
  }
}

export default Plot;
