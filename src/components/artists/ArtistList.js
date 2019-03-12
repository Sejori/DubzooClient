//                LISTS USERS ARTISTS
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react'
import Artist from './Artist'
import ArtistEdit from './ArtistEdit'
import keys from '../../config/keys'

class ArtistList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      artists: [],
      editingArtist: null
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    // fetch user artists on update (this will trigger when user prop changes... I think)
    if (this.props.user.jwt && (prevProps !== this.props)) {
      this.FetchArtists()
    }
  }

  FetchArtists = async() => {
    // fetch user object from strapi which contains all assigned artists
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + this.props.user.jwt
      }
    })
    const me = await response.json()
    const artists = await me.artists
    this.setState({ artists: artists })
  }

  SelectArtist = (artistID) => {
    console.log("Select artist called for artist ID: ", artistID)
    this.props.SelectArtist(artistID)
  }

  EditArtist = (artistID) => {
    console.log("Edit artist called for artist ID: ", artistID)
    this.setState({ editingArtist: artistID })
  }

  DeleteArtist = (artistID) => {
    console.log("Delete artist called for artist ID: ", artistID)
  }

  NewArtist = (artistID) => {
    console.log("New artist called.")
    this.setState({ editingArtist: "new" })
  }

  render() {
    switch (this.props.user.jwt) {

      case undefined:
        return(
          <div></div>
        )

      default:
        // call artist component for each artist
        // let artists = array artist
        let artistBlocks = this.state.artists.map(
          (item, index) => <Artist
            artist={ item }
            SelectArtist={ () => this.SelectArtist(item._id) }
            EditArtist={ () => this.EditArtist(item._id) }
            DeleteArtist={ () => this.DeleteArtist(item._id) }
            key={ item._id }/>
        );
        artistBlocks.push(<button onClick={this.NewArtist} key={artistBlocks.length}>Add Artist</button>)

        return(
          <div className="artists">
            <h4>Your artists</h4>
            <div className="artist-list">
              {artistBlocks}
            </div>
            <div className="artist-editor">
              <ArtistEdit artistID={this.state.editingArtist}/>
            </div>
          </div>
        )
    }
  }

}

export default ArtistList;
