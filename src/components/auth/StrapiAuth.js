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
      accessPasswordInput: ""
    }
  }

  ForgotPassword = () => {
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

  Register = () => {

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
        this.props.UpdateUser(response.data.user.id, response.data.user.username, response.data.jwt)
        this.props.toggleActive()
      })
      .catch(error => {
        // Handle error.
        alert('An error occurred.', error);
      });
  }

  Login = () => {

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
        this.props.UpdateUser(response.data.user.id, response.data.user.username, response.data.jwt)
        this.props.toggleActive()
      })
      .catch(error => {
        // Handle error.
        alert('An error occurred.', error);
      });
  }

  Logout = () => {
    this.setState({
      usernameInput: "",
      emailInput: "",
      passwordInput: ""
     })
    this.props.UpdateUser(undefined, undefined, undefined);
    this.props.toggleActive()
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    if (!this.props.user.jwt) {
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
          <button className="btn btn-secondary btn-sm" onClick={this.Login}>Login</button>
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
          <button className="btn btn-secondary btn-sm" onClick={this.Register}>Register</button>
          <br />
          <button className="btn btn-secondary btn-sm" onClick={this.ForgotPassword}>Forgot password?</button>
        </div>
      )
    } else {
      return(
        <div>
          <button className="btn btn-secondary" onClick={this.Logout}>LOGOUT</button>
        </div>
      )
    }
  }
}

export default StrapiAuth;
