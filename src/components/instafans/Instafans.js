//                SUPERFANS TAB
//
// This is the parent component for all of the superfans functionality in the app
import React, { Component } from 'react'
import axios from 'axios'
import keys from '../../config/keys'

class Instafans extends Component {
  constructor(props) {
    super(props)

    this.state = { responseData: [] }
  }

  getNewInformation = async() => {
    let instagramHandle = this.props.artist.instagramHandle

    let responses = await fetch(keys.SCRAPER_URI + '/instafans?handle=' + instagramHandle)
    let json = await responses.json()
    this.updateInstagramPostData(json)
  }

  updateInstagramPostData = (data) => {

    // CREATE NEW POST DATA AND ASSIGN TO USER
    axios({
      method: 'post',
      url: keys.STRAPI_URI + "/instagramposts",
      data: {
        data: data,
        artist: this.props.artist._id
      },
      headers: {
        Authorization: 'Bearer ' + this.props.user.jwt
      }
    })
    .then(response => {
      // Handle success.
      console.log(
        'Well done, your post data has been successfully added: ',
        response.data
      )
    })

  }

  render() {
    let existingData
    if (this.props.artist.instagramPostData) {
      existingData = this.props.artist.instagramPostData
      console.log("existing data: " + existingData)
    }

    return(
      <div className="instafans">
        <h4 style={{textAlign: "center"}}>The superfans section is currently in development - check back soon to see more!</h4>
        <br />
        <button className="btn btn-primary" onClick={this.getNewInformation}>Get New Instagram Fan Info</button>
        {this.state.responseData}
      </div>
    )
  }
}

export default Instafans
