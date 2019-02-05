import React, { Component } from 'react';
import Social from './Social';
import StrapiAuth from './auth/StrapiAuth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        userID: undefined,
        username: undefined,
        jwt: undefined
      }
    }
  }

  UpdateUser = (userID, username, jwt) => {
    let user = { userID, username, jwt };
    this.setState({ user: user });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>DUBZOO</h1>
          <StrapiAuth UpdateUser={this.UpdateUser} user={this.state.user}/>
        </div>

        <div className="socials">
          <Social user={this.state.user} target="YouTube"/>
          <Social user={this.state.user} target="Soundcloud"/>
        </div>

        <div className="footer">
          <a href="https://www.dubzoo.io/privacy-policy">Privacy Policy</a>
        </div>

      </div>
    );
  }
}

export default App;
