import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, NavbarBrand, NavbarItem, NavbarBurger, NavbarMenu, NavbarEnd } from 'bloomer';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    }
  }


  renderLoginContent() {
    switch (this.props.auth) {
      case null:
        return

      case false:
        return <a href="/auth/google">Log in with Google</a>

      default:
        return <a href="/auth/logout">Log out</a>
    }
  }

  onClickNav = () => {
    if (this.state.isActive) {
      this.setState({ isActive: false })
    } else {
      this.setState({ isActive: true })
    }
  }

  render() {
    return (
      <Container>
        <Navbar style={{ margin: '5px' }}>
          <NavbarBrand>
            <NavbarItem>
              <Link to={this.props.auth ? '/dashboard' : '/' }>
                DUBZOO
              </Link>
            </NavbarItem>
            <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
          </NavbarBrand>
          <NavbarMenu isActive={this.state.isActive} onClick={this.onClickNav}>
            <NavbarEnd>
              <NavbarItem>{this.renderLoginContent()}</NavbarItem>
            </NavbarEnd>
          </NavbarMenu>
        </Navbar>
      </Container>
    )
  }
}

export default Header;
