//                USERS ARTIST CALLED FROM ARTISTLIST
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react';

class Artist extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      // add click event to call SelectArtist function in ArtistList
      <div className="artist-block">
        <h4 onClick={this.props.SelectArtist}>{this.props.artist.artistName}</h4>
        <button onClick={this.props.EditArtist}>Edit</button>
        <button onClick={this.props.DeleteArtist}>Delete</button>
      </div>
    )
  }
}

export default Artist;
