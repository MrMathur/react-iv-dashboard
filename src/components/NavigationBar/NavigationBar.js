import React, { Component } from 'react';
import { Navbar, Nav, Header } from 'rsuite';
import MenuIcon from '@rsuite/icons/Menu';
import './style.css';
import DataMenu from '../DataMenu/DataMenu';

export default class NavigationBar extends Component {

  constructor(props) {
    super();

    this.toggleMenu = props.clickFunction;
  }

  toggleMenu = () => {
    console.log('yep');
  }

  render() {
    return (
      <Header>
        <Navbar>
            <Nav>
              <Nav.Item className='menu-nav' onClick={this.toggleMenu}><MenuIcon className='menu-icon' /></Nav.Item>
              <Nav.Item href='/'><div className='logo-text'>QualVis</div></Nav.Item>
            </Nav>
        </Navbar>
      </Header>
    )
  }
}
