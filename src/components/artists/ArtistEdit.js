//                LISTS USERS ARTISTS
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react';
import keys from '../../config/keys'

class ArtistEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      artistName: "",
      youtubeHandle: "",
      soundcloudHandle: "",
      instagramHandle: "",
      spotifyHandle: ""
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.artistID !== prevProps.artistID) {
      console.log("ArtistEdit has recognised artistID prop change")
      if (this.props.artistID !== "new") this.FetchArtist()
      this.render()
    }
  }

  FetchArtist = async(artistID) => {
    const response = await fetch(keys.STRAPI_URI + "/artists/" + this.props.artistID, {
      headers: {
        Authorization: "Bearer " + this.props.user.jwt
      }
    })
    let artist = await response.json()
    this.setState({
      artistName: await artist.artistName,
      youtubeHandle: await artist.youtubeHandle,
      soundcloudHandle: await artist.soundcloudHandle,
      instagramHandle: await artist.instagramHandle,
      spotifyHandle: await artist.spotifyHandle
    })

    console.log(this.state)
  }

  Submit = async() => {
    if (this.props.artistID !== "new") {
      // UPDATE ARTIST DB ENTRY
      let response = await fetch(keys.STRAPI_URI + "/artists/" + this.props.artistID, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + this.props.user.jwt
        },
        artistName: this.state.artistName,
        youtubeHandle: this.state.youtubeHandle,
        soundcloudHandle: this.state.soundcloudHandle,
        instagramHandle: this.state.instagramHandle,
        spotifyHandle: this.state.spotifyHandle
      })
      console.log(await response)
    } else {
      // CREATE NEW ARTIST AND ASSIGN TO USER
      let response = await fetch(keys.STRAPI_URI + "/artists", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.props.user.jwt
        },
        artistName: this.state.artistName,
        youtubeHandle: this.state.youtubeHandle,
        soundcloudHandle: this.state.soundcloudHandle,
        instagramHandle: this.state.instagramHandle,
        spotifyHandle: this.state.spotifyHandle
      })
      console.log(await response)
    }
    // Tell app to reset editingArtist state
    this.props.editingArtist()
  }

  Cancel = () => {
    // Tell app to reset editingArtist state
    this.props.EditArtist()
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {

    if (this.props.artistID) {
      return(
        <div>
          <div className="artist-edit-row">
            <p>Artist Name:</p>&nbsp;
            <input
              name="artistName"
              type="text"
              placeholder="artist name"
              value={this.state.artistName}
              onChange={this.handleChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>YouTube Account:</p>&nbsp;
            <input
              name="youtubeHandle"
              type="text"
              placeholder="YouTube account name"
              value={this.state.youtubeHandle}
              onChange={this.handleChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Soundcloud Account:</p>&nbsp;
            <input
              name="soundcloudHandle"
              type="text"
              placeholder="SoundCloud account name"
              value={this.state.soundcloudHandle}
              onChange={this.handleChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Instagram Account:</p>&nbsp;
            <input
              name="instagramHandle"
              type="text"
              placeholder="Instagram account name"
              value={this.state.artistName}
              onChange={this.handleChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Spotify Account:</p>&nbsp;
            <input
              name="spotifyHandle"
              type="text"
              placeholder="Spotify account name"
              value={this.state.spotifyHandle}
              onChange={this.handleChange}
            />
          </div>
          <div className="artist-edit-row">
            <button onClick={this.Submit}>Submit</button>
            <button onClick={this.Cancel}>Cancel</button>
          </div>
        </div>
      )
    } else {
      return("")
    }

  }
}

export default ArtistEdit;
