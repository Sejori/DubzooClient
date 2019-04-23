//          STRAPI AUTHORISATION AND STORAGE OF CREDENTIALS
//
// Nice simple one (will get more complex if/when we Oauth this though).
// The login function sends the username and password to the Strapi backend
// and changes the authorised state. Logout removes the username from the
// backend and changes authorised state.

import React, { Component } from 'react';
import axios from 'axios';
const keys = require('../../config/keys.js')

class StrapiAuth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      usernameInput: "",
      emailInput: "",
      passwordInput: "",
      accessPasswordInput: "",
      view: "default"
    }
  }

  forgotPassword = () => {
    if ( this.state.emailInput === "" ) {
      alert("Please input email address")
      return
    }
    // Request API.
    axios
      .post(keys.STRAPI_URI + '/auth/forgot-password', {
        email: this.state.emailInput,
        url: keys.STRAPI_URI + '/admin/plugins/users-permissions/auth/reset-password'
      })
      .then(response => {
        // Handle success.
        alert('You have been sent a password reset email.');
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      })
  }

  register = () => {

    if (this.state.usernameInput === "" || this.state.passwordInput === "" || this.state.emailInput === "" ) {
      alert("Please input username, email and password to register!");
      return;
    }
    // Request API.
    axios
      .post(keys.STRAPI_URI + '/auth/local/register', {
        username: this.state.usernameInput,
        email: this.state.emailInput,
        password: this.state.passwordInput
      })
      .then(response => {
        // Update React State Credentials
        // set dubzooJWT in localStorage
        localStorage.setItem('dubzooJWT', response.data.jwt)
        this.props.updateUser(response.data.jwt)
        this.props.toggleActive()
      })
      .catch(error => {
        // Handle error.
        alert('An error occurred.', error);
      });
  }

  login = () => {

    if (this.state.usernameInput === "" || this.state.passwordInput === "" ) {
      alert("Please input username and password to login!");
      return;
    }

    // Request API
    axios
      .post(keys.STRAPI_URI + '/auth/local', {
          identifier: this.state.usernameInput,
          password: this.state.passwordInput
      })
      .then(response => {
        // Update React State Credentials
        // set dubzooJWT in localStorage
        localStorage.setItem('dubzooJWT', response.data.jwt)
        this.props.updateUser(response.data.jwt)
        this.props.toggleActive()
      })
      .catch(error => {
        // Handle error.
        alert('An error occurred.', error);
      });
  }

  logout = () => {
    this.setState({
      usernameInput: "",
      emailInput: "",
      passwordInput: ""
     })
    localStorage.clear()
    this.props.updateUser(undefined)
    this.props.toggleActive()
  }

  changeView = (view) => {
    this.setState({ view: view })
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    if (!this.props.user.jwt) {
      switch (this.state.view) {
        case "login":
          return(
            <div className="form-group">
              <input
                name="usernameInput"
                type="text"
                placeholder="Username"
                value={this.state.usernameInput}
                onChange={this.handleChange}
                size="16"
              />
              <br />
              <input
                name="passwordInput"
                type="password"
                placeholder="Password"
                value={this.state.PasswordInput}
                onChange={this.handleChange}
                size="16"
              />
              <br />
              <button className="btn btn-secondary btn-sm" onClick={this.login}>Login</button>
            </div>
          )
      case "register":
        return(
          <div className="form-group">
            <input
              name="usernameInput"
              type="text"
              placeholder="Username"
              value={this.state.usernameInput}
              onChange={this.handleChange}
              size="16"
            />
            <br />
            <input
              name="passwordInput"
              type="password"
              placeholder="Password"
              value={this.state.PasswordInput}
              onChange={this.handleChange}
              size="16"
            />
            <br />
            <input
              name="emailInput"
              type="text"
              placeholder="Email"
              value={this.state.emailInput}
              onChange={this.handleChange}
              size="16"
            />
            <br />
            <button className="btn btn-secondary btn-sm" onClick={this.register}>Register</button>
            <br />
          </div>
        )
      case "forgot-password":
        return(
          <div className="form-group">
            <input
              name="emailInput"
              type="text"
              placeholder="Email"
              value={this.state.emailInput}
              onChange={this.handleChange}
              size="16"
            />
            <br />
            <button className="btn btn-secondary btn-sm" onClick={this.forgotPassword}>Send password reset email</button>
          </div>
        )
      default:
        return(
          <div className="form-group">
            <button className="btn btn-secondary btn-sm" onClick={() => this.changeView("login")}>Login</button>
            <button className="btn btn-secondary btn-sm" onClick={() => this.changeView("register")}>Register</button>
            <button className="btn btn-secondary btn-sm" onClick={() => this.changeView("forgot-password")}>Forgot password?</button>
          </div>
        )
    }
    } else {
      return(
        <div className="form-group">
          <button className="btn btn-secondary" onClick={this.logout}>LOGOUT</button>
        </div>
      )
    }
  }
}

export default StrapiAuth;
