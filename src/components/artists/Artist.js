//                USERS ARTIST CALLED FROM ARTISTLIST
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react';

class Artist extends Component {

  render() {
    let artistNameClass = 'nav-link'

    if (this.props.selectedArtistID === this.props.artist._id) {
      artistNameClass = 'nav-link active'
    }

    return(
      // add click event to call SelectArtist function in ArtistList
      <li className="artist-block nav-item">
        <h4 onClick={this.props.SelectArtist}>
          <div className={artistNameClass}>
            {this.props.artist.artistName}
          </div>
        </h4>
        <button className="btn btn-sm edit-button" onClick={this.props.EditArtist}>Edit</button>
        <button className="btn btn-sm delete-button" onClick={this.props.DeleteArtist}>Delete</button>
      </li>
    )
  }
}

export default Artist;
