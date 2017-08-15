import React, { Component } from 'react';
import { Link } from 'react-router';
import logo from './ON.svg';

import './Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll(e) {
    if (window.top.pageYOffset !== 0) {
      document.querySelector('.header-nav').style.height = '10vh';
      document.querySelector('.app-logo').style.height = '8vh';
      document.querySelector('.logo-container').style.top = '1vh';
    } else {
      document.querySelector('.header-nav').style.height = '15vh';
      document.querySelector('.app-logo').style.height = '10vh';
      document.querySelector('.logo-container').style.top = '2.5vh';
    }
  }
  handleMenuClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    let isMenuOpen = this.state.isOpen ? 'menu-expand' : '';
    let isMenuTextShown = this.state.isOpen ? 'menu-text-open' : '';
    let isMenuButtonColor = this.state.isOpen ? 'menu-button-on' : '';
    return (
      <header>
        <div className="logo-container">
          <Link to="/">
              <img src={logo} className="app-logo" alt="logo" />
          </Link>
        </div>
        <div className="header-nav">
          <nav>
            <ul>
              <li className="center-nav nav-list-item">
                <Link to="/">
                  Home
                </Link>
              </li>
              <li className="center-nav nav-list-item">
                <Link to="/about">
                  About
                </Link>
              </li>
              <li className="center-nav nav-list-item">
                <Link to="/work">
                  Work
                </Link>
              </li>
              <li className="center-nav nav-list-item">
                <Link to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      
        <div className={'mobile-menu-button ' + isMenuButtonColor} onClick={() => this.handleMenuClick()}>
          <i></i>
          <i></i>
          <i></i>
        </div>
      
        <div className={'mobile-menu ' + isMenuOpen}>
          <div className="mobile-menu-text">
            <span className={'menu-text menu-text-home ' + isMenuTextShown} onClick={() => this.handleMenuClick()}>
              <Link to="/">
                Home
              </Link>
            </span>
            <span className={'menu-text menu-text-about ' + isMenuTextShown} onClick={() => this.handleMenuClick()}>
              <Link to="/about">
                About
              </Link>
            </span>
            <span className={'menu-text menu-text-work ' + isMenuTextShown} onClick={() => this.handleMenuClick()}>
              <Link to="/work">
                Work
              </Link>
            </span>
            <span className={'menu-text menu-text-contact ' + isMenuTextShown} onClick={() => this.handleMenuClick()}>
              <Link to="/contact">
                Contact
              </Link>
            </span>
          </div>
        </div>
      
        
      </header>
    );
  }
}



