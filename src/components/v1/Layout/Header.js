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
  handleScroll() {
    if (window.top.pageYOffset !== 0) {
      document.querySelector('.v1-header').style.height = '10vh';
      document.querySelector('.v1-app-logo').style.height = '8vh';
      document.querySelector('.v1-logo-container').style.top = '1vh';
    } else {
      document.querySelector('.v1-header').style.height = '15vh';
      document.querySelector('.v1-app-logo').style.height = '10vh';
      document.querySelector('.v1-logo-container').style.top = '2.5vh';
    }
  }
  handleMenuClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    let isMenuTextShown = this.state.isOpen ? 'v1-menu-text-open' : '';
    return (
      <header className="v1-header">
        <div className="v1-logo-container">
          <Link to="/v1">
              <img src={logo} className="v1-app-logo" alt="logo" />
          </Link>
        </div>
        <div className="v1-header-nav">
          <nav>
            <ul className="v1-nav-ul">
              <li className="v1-nav-list-item">
                <Link to="/v1">
                  Home
                </Link>
              </li>
              <li className="v1-nav-list-item">
                <Link to="/v1/about">
                  About
                </Link>
              </li>
              <li className="v1-nav-list-item">
                <Link to="/v1/work">
                  Work
                </Link>
              </li>
              <li className="v1-nav-list-item">
                <Link to="/v1/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      
        <div className={'v1-mobile-menu-button ' + (this.state.isOpen ? 'v1-menu-button-on' : '')} onClick={() => this.handleMenuClick()}>
          <i></i>
          <i></i>
          <i></i>
        </div>
    
        <div className='v1-mobile-menu-container'>
          <div className={'v1-mobile-menu ' + (this.state.isOpen ? 'v1-menu-expand' : '')}>
            <i className={'v1-material-icons menu-text-home ' + isMenuTextShown}>
              <Link to="/">home</Link>
            </i>
            <i className={'v1-material-icons v1-menu-text-about ' + isMenuTextShown}>
              <Link to="/about">info</Link>
            </i>
            <i className={'v1-material-icons v1-menu-text-work ' + isMenuTextShown}>
              <Link to="/work">work</Link>
            </i>
            <i className={'v1-material-icons v1-menu-text-contact ' + isMenuTextShown}>
              <Link to="/contact">email</Link>
            </i>
          </div>
        </div>
      </header>
    );
  }
}



