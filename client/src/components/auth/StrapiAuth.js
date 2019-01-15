import React, { Component } from 'react';
import axios from 'axios';

class StrapiAuth extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      jwt: "",
      usernameInput: "",
      emailInput: "",
      passwordInput: ""
    }
  }

  // PUT AXIOS AUTH FUNCTIONS HERE
  async getData(){
   const res = await axios('/data');
   return await res.json();
}

  Register = () => {

    if (this.usernameInput || this.passwordInput || this.emailInput === undefined ) {
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
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);

        // Update React State Credentials
        this.setState({
          username: response.data.user.username,
          jwt: response.data.jwt
        })

      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
  }

  Login = () => {

    if (this.usernameInput || this.passwordInput === undefined ) {
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
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);

        // Update React State Credentials
        this.setState({
          username: response.data.user.username,
          jwt: response.data.jwt
        })
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
  }

  Logout = () => {
    console.log("logout");
    this.setState({ username: "" })
    this.setState({ jwt: "" })
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    switch (this.state.username) {

      case "":
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
            Hi {this.state.username}!
            <button onClick={this.Logout}>LOGOUT</button>
          </div>
        )
    }
  }

}

export default StrapiAuth;
