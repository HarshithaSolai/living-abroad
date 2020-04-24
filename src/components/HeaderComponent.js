import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isNavOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render() {
    return(
      <Navbar dark expand="sm">
        <div className="container">
          <NavbarBrand className="mr-auto text-white"><span className="fa fa-globe fa-lg"></span><strong>  Living Abroad</strong></NavbarBrand>
          <NavbarToggler onClick={this.toggleNav} />
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink className="nav-link"  to='/home' onClick={this.toggleNav}><span className="fa fa-home fa-lg"></span> Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to='/currency' onClick={this.toggleNav} ><span className="fa fa-calculator fa-lg"></span> Currency</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link"  to='/weather' onClick={this.toggleNav} ><span className="fa fa-cloud fa-lg"></span> Weather</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link"  to='/qualityscore' onClick={this.toggleNav} ><span className="fa fa-globe fa-lg"></span> Quality of Life</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link"  to='/lifestyle' onClick={this.toggleNav} ><span className="fa fa-shopping-cart fa-lg"></span> Cost Of Living</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to='/contact' onClick={this.toggleNav} ><span className="fa fa-address-card fa-lg"></span> Contact</NavLink>
            </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;