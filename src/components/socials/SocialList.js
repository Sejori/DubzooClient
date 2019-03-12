//                        SOCIAL BLOCK
//
// Loads correct components into block based off target defined in App.js

import React, { Component } from 'react';

import Social from './Social';

class SocialList extends Component {
  constructor(props) {
    super(props)
    // artist social accounts and data exist in artist prop from App.js
  }

  render() {
    switch (this.props.user.jwt) {
      case undefined:
        return(
          <div>
            <div>
              <p>Please login or register to manage your artist's socials.</p>
            </div>
          </div>
        )

      default:
        return(
          <div>
            <p>Social lists will appear here</p>
          </div>
        )
    }
  }
}

export default SocialList;
