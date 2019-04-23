//                            HEADER COMPONENT
//
// Menu for Dubzoo app. Placed in header, shows auth components and links depending on state
import React, { Component } from 'react'
import StrapiAuth from './auth/StrapiAuth'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessPasswordInput: "",
      authorised: false,
      buttonText: "Menu",
      active: false
    }
  }

  toggleActive = () => {
    let buttonText = "Close"
    if (this.state.active) buttonText = "Menu"
    this.setState({
      active: !this.state.active,
      buttonText: buttonText
    })
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {

    var menu
    var menuButton = <button className="btn menu-button" onClick={this.toggleActive}>{this.state.buttonText}</button>

    var barrier = <div>
      <h2>Enter access password</h2>
      <input
        name="accessPasswordInput"
        type="text"
        placeholder=""
        value={this.state.accessPasswordInput}
        onChange={this.handleChange}
        size="25"
      />
      <p>
        Interested in managing your Artists's social with Dubzoo?
        <br/>
        Get in touch at <a href="emailto:hello@dubzoo.io">hello@dubzoo.io</a>
      </p>
    </div>

    if (this.props.user.jwt) {
      barrier = menuButton
    }

    if (this.state.accessPasswordInput === "MusicRoxxx") {
      barrier = menuButton
    }

    if (this.state.active) {
      menu = <StrapiAuth updateUser={this.props.updateUser} user={this.props.user} toggleActive={this.toggleActive}/>
    }

    return (

      <div>
        <div className="header">
          <img className="logo" src="logo.png" alt="dubzoo-logo" height="80"/>
          {barrier}
        </div>
        <div className="menu">
          {menu}
        </div>
      </div>


    )
  }
}

export default Header;
