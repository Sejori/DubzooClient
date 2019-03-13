//                LISTS USERS ARTISTS
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react'
import Artist from './Artist'
import keys from '../../config/keys'

class ArtistList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      artists: [],
      highlighted: [],
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

    // call artist component for each artist
    // let artists = array artist
    let artistBlocks = artists.map( (item, index) =>
      <Artist
        highlighted={this.state.highlighted}
        artist={ item }
        SelectArtist={ () => this.SelectArtist(item._id) }
        EditArtist={ () => this.EditArtist(item._id) }
        DeleteArtist={ () => this.DeleteArtist(item._id) }
        key={ item._id }
        index={index} />
    )
    artistBlocks.push(<button onClick={this.NewArtist} key={artistBlocks.length}>Add Artist</button>)
    this.setState({ artists: artistBlocks })
  }

  SelectArtist = (artistID) => {
    console.log("Select artist called for artist ID: ", artistID)
    this.props.SelectArtist(artistID)

    // find array item matching artistID key then creare highlighted array
    let index = this.state.artists.findIndex(x => x.key === artistID)
    let arr = []
    arr.length = this.state.artists.length
    arr.fill(0)
    arr[index] = 1
    this.setState({ highlighted: arr })
  }

  EditArtist = (artistID) => {
    console.log("Edit artist called for artist ID: ", artistID)
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
      case undefined: return( <></> )

      default:
        return(
          <div className="artists">
            <h4>Your artists</h4>
            <div className="artist-list">
              {this.state.artists}
            </div>
            <div className="artist-editor">
            </div>
          </div>
        )
    }
  }

}

export default ArtistList;
