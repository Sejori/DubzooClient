import React, { Component } from 'react';
import axios from 'axios';

class StrapiAuth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      usernameInput: "",
      emailInput: "",
      passwordInput: ""
    }
  }

  Register = () => {

    if (this.usernameInput || this.passwordInput || this.emailInput === "" ) {
      alert("Please input username, email and password to register!");
      return;
    }
    // Request API.
    axios
      .post('http://localhost:1337/auth/local/register', {
        username: this.state.usernameInput,
        email: this.state.emailInput,
        password: this.state.passwordInput
      })
      .then(response => {
        // Update React State Credentials
        this.props.UpdateUser(response.data.user.id, response.data.user.username, response.data.jwt);
      })
      .catch(error => {
        // Handle error.
        alert('An error occurred.', error);
      });
  }

  Login = () => {

    if (this.usernameInput || this.passwordInput === "" ) {
      alert("Please input username and password to login!");
      return;
    }

    // Request API
    axios
      .post('http://localhost:1337/auth/local', {
          identifier: this.state.usernameInput,
          password: this.state.passwordInput
      })
      .then(response => {
        // Update React State Credentials
        this.props.UpdateUser(response.data.user.id, response.data.user.username, response.data.jwt);
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
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    switch (this.props.user.username) {

      case undefined:
        return(
          <div>
            <input
              name="usernameInput"
              type="text"
              placeholder="Username"
              value={this.state.usernameInput}
              onChange={this.handleChange}
            />
            <input
              name="passwordInput"
              type="password"
              placeholder="Password"
              value={this.state.PasswordInput}
              onChange={this.handleChange}
            />
            <button onClick={this.Login}>Login</button>
            <br />
            <input
              name="emailInput"
              type="text"
              placeholder="Email"
              value={this.state.emailInput}
              onChange={this.handleChange}
            />
            <button onClick={this.Register}>Register</button>
          </div>
        )

      default:
        return(
          <div>
            Hi {this.state.usernameInput}!
            <button onClick={this.Logout}>LOGOUT</button>
          </div>
        )
    }
  }

}

export default StrapiAuth;
