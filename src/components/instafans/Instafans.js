//                SUPERFANS TAB
//
// This is the parent component for all of the superfans functionality in the app
import React, { Component } from 'react';
import keys from '../../config/keys'

class Instafans extends Component {
  constructor(props) {
    super(props)

    this.state = { responseData: [] }
  }

  getInformation = async() => {
    let instagramHandle = this.props.artist.instagramHandle

    let responses = await fetch(keys.SCRAPER_URI + '/instafans?handle=' + instagramHandle)
    let json = await responses.json()
    console.log(json)
  }

  makeInstagramRequests = async(requests) => {
    var i
    let url = []
    let headers = []
    let responses = []
    let json = []

    for (i=0; i<requests.length; i++) {
      url[i] = requests[i].url
      headers[i] = requests[i].headers
      try {
        responses[i] = await fetch(url[i], { headers: headers[i] })
        json[i] = responses[i].json()
      } catch(error) {
        console.log(error)
      }
    }
    return responses
  }

  render() {

    return(
      <div className="get-fans">
        <h4 style={{textAlign: "center"}}>The superfans section is currently in development - check back soon to see more!</h4>
        <button className="btn btn-primary" onClick={this.getInformation}>Get Instagram Fan Info</button>
        {this.state.responseData}
      </div>
    )
  }
}

export default Instafans
