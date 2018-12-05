import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return

      case false:
        return <a href="/auth/google">Log in with Google</a>

      default:
        return <a href="/auth/logout">Log out</a>
    }
  }

  render() {
    console.log(this.props.auth)
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/dashboard' : '/' }>
            DUBZOO!
          </Link>
          <ul className="right">
            <li>
              {this.renderContent()}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
