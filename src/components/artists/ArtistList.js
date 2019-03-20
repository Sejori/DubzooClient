//                LISTS USERS ARTISTS
//
// Render is just showing data passed as prop for now.

import React, { Component } from 'react'
import axios from 'axios'
import Artist from './Artist'
import keys from '../../config/keys'

class ArtistList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      artists: undefined,
      editingArtist: null,
      editingArtistName: "",
      editingYoutubeHandle: "",
      editingSoundcloudHandle: "",
      editingInstagramHandle: "",
      editingSpotifyHandle: "",
      editingTwitterHandle: "",
      editingFacebookHandle: "",
      editingID: ""
    }

    if (this.state.artists == null) {
      this.FetchArtists()
    }
  }

  FetchArtist = async(artistID) => {
    const response = await fetch(keys.STRAPI_URI + "/artists/" + artistID, {
      headers: {
        Authorization: "Bearer " + this.props.user.jwt
      }
    })
    let artist = await response.json()
    this.setState({
      editingArtistName: await artist.artistName,
      editingYoutubeHandle: await artist.youtubeHandle,
      editingSoundcloudHandle: await artist.soundcloudHandle,
      editingInstagramHandle: await artist.instagramHandle,
      editingSpotifyHandle: await artist.spotifyHandle,
      editingTwitterHandle: await artist.twitterHandle,
      editingFacebookHandle: await artist.facebookHandle,
      editingID: await artist._id
    })
  }

  FetchArtists = async() => {
    console.log("FetchArtists called")
    // fetch user object from strapi which contains all assigned artists
    const response = await fetch(keys.STRAPI_URI + '/users/me', {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + this.props.user.jwt
      }
    })
    let me = await response.json()
    let artists = await me.artists

    // get userID as we don't yet have it from login
    let userID = await me._id
    this.props.UpdateUser(userID, this.props.user.name, this.props.user.jwt)

    // call artist component for each artist
    // let artists = array artist
    let artistBlocks = artists.map( (item, index) =>
      <Artist
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
  }

  EditArtist = (artistID) => {
    console.log("Edit artist called for artist ID: ", artistID)
    this.setState({ editingArtist: artistID })
    if (artistID !== "new") {
      this.FetchArtist(artistID)
    }
  }

  SubmitEdit = async() => {
    if (this.state.editingArtist !== "new") {

      // UPDATE ARTIST DB ENTRY
      axios({
        method: 'put', //you can set what request you want to be
        url: keys.STRAPI_URI + "/artists/" + this.state.editingArtist,
        data: {
          artistName: this.state.editingArtistName,
          youtubeHandle: this.state.editingYoutubeHandle,
          soundcloudHandle: this.state.editingSoundcloudHandle,
          instagramHandle: this.state.editingInstagramHandle,
          spotifyHandle: this.state.editingSpotifyHandle,
          twitterHandle: this.state.editingTwitterHandle,
          facebookHandle: this.state.editingFacebookHandle
        },
        headers: {
          Authorization: 'Bearer ' + this.props.user.jwt
        }
      })
      .then(response => {
        // Handle success.
        console.log(
          'Well done, your artist has been successfully created: ',
          response.data
        );
        // refresh artists
        this.FetchArtists()
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
    } else {
      // CREATE NEW ARTIST AND ASSIGN TO USER
      axios({
        method: 'post', //you can set what request you want to be
        url: keys.STRAPI_URI + "/artists",
        data: {
          artistName: this.state.editingArtistName,
          youtubeHandle: this.state.editingYoutubeHandle,
          soundcloudHandle: this.state.editingSoundcloudHandle,
          instagramHandle: this.state.editingInstagramHandle,
          spotifyHandle: this.state.editingSpotifyHandle,
          twitterHandle: this.state.editingTwitterHandle,
          facebookHandle: this.state.editingFacebookHandle,
          user: this.props.user.userID
        },
        headers: {
          Authorization: 'Bearer ' + this.props.user.jwt
        }
      })
      .then(response => {
        // Handle success.
        console.log(
          'Well done, your artist has been successfully created: ',
          response.data
        );
        // refresh artists
        this.FetchArtists()
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
    }

    // Close edit box
    this.setState({
      editingArtist: null,
      editingArtistName: "",
      editingYoutubeHandle: "",
      editingSoundcloudHandle: "",
      editingInstagramHandle: "",
      editingSpotifyHandle: "",
      editingTwitterHandle: "",
      editingFacebookHandle: "",
      editingID: ""
    })
  }

  CancelEdit = () => {
    this.setState({
      editingArtist: null,
      editingArtistName: "",
      editingYoutubeHandle: "",
      editingSoundcloudHandle: "",
      editingInstagramHandle: "",
      editingSpotifyHandle: "",
      editingTwitterHandle: "",
      editingFacebookHandle: "",
      editingID: ""
    })
  }

  DeleteArtist = (artistID) => {
    console.log("Delete artist called for artist ID: ", artistID)
    // create alert for are you sure
    var r = window.confirm("Are you sure? You will lose all data for this artist.")
    if (r === true) {
      axios({
        method: 'delete', //you can set what request you want to be
        url: keys.STRAPI_URI + "/artists/" + artistID,
        headers: {
          Authorization: 'Bearer ' + this.props.user.jwt
        }
      })
      .then(response => {
        // Handle success.
        console.log(
          'Well done, your artist has been successfully created: ',
          response.data
        );
        // refresh artists
        this.FetchArtists()
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      })
    } else {
      return;
    }
  }

  NewArtist = (artistID) => {
    console.log("New artist called.")
    this.setState({
      editingArtist: "new",
      editingArtistName: "",
      editingYoutubeHandle: "",
      editingSoundcloudHandle: "",
      editingInstagramHandle: "",
      editingSpotifyHandle: "",
      editingTwitterHandle: "",
      editingFacebookHandle: "",
      editingID: ""
    })
  }

  HandleEditChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    let artistEditor
    let editingTitle
    if (this.state.editingArtist != null) {
      if (this.state.editingArtist === "new") {
        editingTitle = <h4>New Artist</h4>
      } else {
        editingTitle = <h4>Editing {this.state.editingArtistName}</h4>
      }

      artistEditor =
        <div>
          {editingTitle}
          <div className="artist-edit-row">
            <p>Artist Name:</p>&nbsp;
            <input
              name="editingArtistName"
              type="text"
              placeholder="artist name"
              value={this.state.editingArtistName}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>YouTube Account:</p>&nbsp;
            <input
              name="editingYoutubeHandle"
              type="text"
              placeholder="YouTube account name"
              value={this.state.editingYoutubeHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Soundcloud Account:</p>&nbsp;
            <input
              name="editingSoundcloudHandle"
              type="text"
              placeholder="SoundCloud account name"
              value={this.state.editingSoundcloudHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Instagram Account:</p>&nbsp;
            <input
              name="editingInstagramHandle"
              type="text"
              placeholder="Instagram account name"
              value={this.state.editingInstagramHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Spotify Account:</p>&nbsp;
            <input
              name="editingSpotifyHandle"
              type="text"
              placeholder="Spotify account name"
              value={this.state.editingSpotifyHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Twitter Account:</p>&nbsp;
            <input
              name="editingTwitterHandle"
              type="text"
              placeholder="Twitter account name"
              value={this.state.editingTwitterHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Facebook Account:</p>&nbsp;
            <input
              name="editingFacebookHandle"
              type="text"
              placeholder="Facebook account name"
              value={this.state.editingFacebookHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <button onClick={this.CancelEdit}>Cancel</button>
            <button onClick={this.SubmitEdit}>Submit</button>
          </div>
        </div>
    }

    return(
      <div className="artists">
        <h4>Your artists</h4>
        <div className="artist-list">
          {this.state.artists}
        </div>
        <div className="artist-editor">
          {artistEditor}
        </div>
      </div>
    )
  }
}

export default ArtistList;
