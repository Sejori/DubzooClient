//                USERS ARTIST CALLED FROM ARTISTLIST
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react';

class Artist extends Component {

  render() {

    let selectedArtist = this.props.selectedArtist
    let artistNameClass = 'nav-link'

    if (this.props.selectedArtistID === this.props.artist._id) {
      artistNameClass = 'nav-link active'
    }

    return(
      // add click event to call SelectArtist function in ArtistList
      <li className="artist-block nav-item">
        <h4 onClick={this.props.SelectArtist}>
          <a className={artistNameClass}>
            {this.props.artist.artistName}
          </a>
        </h4>
        <button className="btn btn-warning" onClick={this.props.EditArtist}>Edit</button>
        <button className="btn btn-danger" onClick={this.props.DeleteArtist}>Delete</button>
      </li>
    )
  }
}

export default Artist;
