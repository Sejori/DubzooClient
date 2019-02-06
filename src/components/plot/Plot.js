//                PLOTS DATA FROM USER'S SOCIAL ACCOUNTS IN DB
//
//  GetData gets user info from STRAPI
//  PrintData uses target in props to specify what data to show and assigns
// the data to state.
// Render is just showing state + button for now.

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
    this.PrintData(json);
  }

  PrintData = (json) => {
    let social = this.props.target.toLowerCase() + 'account';

    if (json[social] === undefined) {
      alert("You haven't linked a " + this.props.target + " account yet.")
      return;
    } else if (json[social].data === undefined) {
      alert("You haven't retrieved any " + this.props.target + " data yet.")
      return;
    } else {
      this.setState({ data: json[social].data })
    }
  }

  render() {
    return(
      <div>
        <div>
          {this.state.data}
        </div>
        <button onClick={this.GetData}>Plot Data</button>
      </div>
    )
  }
}

export default Plot;
