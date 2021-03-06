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
      userID: "",
      artists: [],
      editingArtist: "",
      editingArtistName: "",
      editingYoutubeHandle: "",
      editingSoundcloudHandle: "",
      editingInstagramHandle: "",
      editingSpotifyHandle: "",
      editingTwitterHandle: "",
      editingFacebookHandle: "",
      selectedArtistID: ""
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
      editingArtist: await artist._id,
      editingArtistName: await artist.artistName,
      editingYoutubeHandle: await artist.youtubeHandle,
      editingSoundcloudHandle: await artist.soundcloudHandle,
      editingInstagramHandle: await artist.instagramHandle,
      editingSpotifyHandle: await artist.spotifyHandle,
      editingTwitterHandle: await artist.twitterHandle,
      editingFacebookHandle: await artist.facebookHandle,
    })
  }

  FetchArtists = async() => {
    try{
      // fetch user object from strapi which contains all assigned artists
      const response = await fetch(keys.STRAPI_URI + '/users/me', {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + this.props.user.jwt
        }
      })
      let me = await response.json()
      this.setState({artists: await me.artists})

      // get userID as we don't yet have it from login
      this.setState({ userID: await me._id })
    } catch (error) {console.log(error)}
  }

  SelectArtist = (artist) => {
    this.setState({selectedArtistID: artist._id})
    this.props.SelectArtist(artist)
  }

  EditArtist = (artistID) => {
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
          'Well done, your artist has been successfully updated: ',
          response.data
        )

        // call the update function to get artist data
        fetch(keys.SCRAPER_URI + '/update?artistID=' + response.data._id)

        // refresh artists
        this.FetchArtists()

        alert('Artist has been updated.\n\nNOTE: Please wait a minute then refresh page to see new data. If no data appears for a social after a few minutes, it is likely that you entered the information incorrectly.')
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
          user: this.state.userID
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
        )

        // call the update function to get artist data
        fetch(keys.SCRAPER_URI + '/update?artistID=' + response.data._id)

        // refresh artists
        this.FetchArtists()
        alert('Artist has been added.\n\nNOTE: Please wait a minute then refresh page to see new data. If no data appears for a social after a few minutes, it is likely that you entered the information incorrectly.')
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
    }

    // Close edit box
    this.setState({
      editingArtist: "",
      editingArtistName: "",
      editingYoutubeHandle: "",
      editingSoundcloudHandle: "",
      editingInstagramHandle: "",
      editingSpotifyHandle: "",
      editingTwitterHandle: "",
      editingFacebookHandle: "",
    })
  }

  CancelEdit = () => {
    this.setState({
      editingArtist: "",
      editingArtistName: "",
      editingYoutubeHandle: "",
      editingSoundcloudHandle: "",
      editingInstagramHandle: "",
      editingSpotifyHandle: "",
      editingTwitterHandle: "",
      editingFacebookHandle: "",
    })
  }

  DeleteArtist = (artistID) => {
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
    })
  }

  HandleEditChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    if (!this.props.user.jwt) {
      return <div></div>
    }

    if (!this.state.artists[0]) this.FetchArtists()

    let artistEditor
    let editingTitle
    if (this.state.editingArtist !== "") {
      if (this.state.editingArtist === "new") {
        editingTitle = <h4>New Artist</h4>
      } else {
        editingTitle = <h4>Editing {this.state.editingArtistName}</h4>
      }

      artistEditor =
        <div className='artist-editor'>
          {editingTitle}
          <p>Make sure to enter artist names in lower case and exactly as they appear if [social].com/ entry type is shown.</p>
          <p>New artist data is fetched daily.</p>
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
            <p>youtube.com/user/</p>&nbsp;
            <input
              name="editingYoutubeHandle"
              type="text"
              placeholder="artist-YT-handle"
              value={this.state.editingYoutubeHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>soundcloud.com/</p>&nbsp;
            <input
              name="editingSoundcloudHandle"
              type="text"
              placeholder="artist-SC-handle"
              value={this.state.editingSoundcloudHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>instagram.com/</p>&nbsp;
            <input
              name="editingInstagramHandle"
              type="text"
              placeholder="artist-IG-handle"
              value={this.state.editingInstagramHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>Spotify Artist Name:</p>&nbsp;
            <input
              name="editingSpotifyHandle"
              type="text"
              placeholder="Spotify artist name"
              value={this.state.editingSpotifyHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>twitter.com/</p>&nbsp;
            <input
              name="editingTwitterHandle"
              type="text"
              placeholder="artist-Twitter-handle"
              value={this.state.editingTwitterHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <p>facebook.com/</p>&nbsp;
            <input
              name="editingFacebookHandle"
              type="text"
              placeholder="Facebook-page-name"
              value={this.state.editingFacebookHandle}
              onChange={this.HandleEditChange}
            />
          </div>
          <div className="artist-edit-row">
            <button className="btn" onClick={this.CancelEdit}>Close</button>
            <button className="btn submit-button" onClick={this.SubmitEdit}>Submit</button>
          </div>
        </div>
    }

    // call artist component for each artist
    // let artists = array artist
    let artistBlocks = this.state.artists.map( (item, index) =>
      <Artist
        artist={ item }
        SelectArtist={ () => this.SelectArtist(item) }
        selectedArtistID={ this.state.selectedArtistID }
        EditArtist={ () => this.EditArtist(item._id) }
        DeleteArtist={ () => this.DeleteArtist(item._id) }
        key={ item._id }
        index={ index } />
    )
    artistBlocks.push(<li key="newArtist"><button className="btn btn-sm new-artist-button" onClick={this.NewArtist}>Add Artist</button></li>)

    return(
      <div className="artists">
        <ul className="nav nav-pills artist-list">
          {artistBlocks}
        </ul>
        <div className="container">
          {artistEditor}
        </div>
      </div>
    )
  }
}

export default ArtistList
