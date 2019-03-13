//                USERS ARTIST CALLED FROM ARTISTLIST
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react';

class Artist extends Component {
  constructor(props) {
    super(props)

    this.state = { style: "" }
  }


  // THIS IS USED FOR HIGHLIGHTING SELECTED ARTIST
  componentDidUpdate = (prevProps) => {
    if (prevProps!== this.props) {
      if (this.props.highlighted.indexOf(1) === this.props.index) {
        console.log("Highlighting artist. Artist index: " + this.props.index + " highlighted index: " + this.props.highlighted.indexOf(1))
        this.setState({ style: <style>{'{ background-color: skyblue; }'}</style> })
      } else {
        this.setState({ style: "" })
      }
    }
  }

  render() {
    return(
      // add click event to call SelectArtist function in ArtistList
      <div className={this.props.class}>
        {this.state.style}
        <h4 onClick={this.props.SelectArtist}>{this.props.artist.artistName}</h4>
        <button onClick={this.props.EditArtist}>Edit</button>
        <button onClick={this.props.DeleteArtist}>Delete</button>
      </div>
    )
  }
}

export default Artist;
