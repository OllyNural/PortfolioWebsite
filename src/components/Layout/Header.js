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
    let isMenuTextShown = this.state.isOpen ? 'menu-text-open' : '';
    return (
      <header>
        <div className="logo-container">
          <Link to="/">
              <img src={logo} className="app-logo" alt="logo" />
          </Link>
        </div>
        <div className="header-nav">
          <nav>
            <ul className="nav-ul">
              <li className="nav-list-item">
                <Link to="/">
                  Home
                </Link>
              </li>
              <li className="nav-list-item">
                <Link to="/about">
                  About
                </Link>
              </li>
              <li className="nav-list-item">
                <Link to="/work">
                  Work
                </Link>
              </li>
              <li className="nav-list-item">
                <Link to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      
        <div className={'mobile-menu-button ' + (this.state.isOpen ? 'menu-button-on' : '')} onClick={() => this.handleMenuClick()}>
          <i></i>
          <i></i>
          <i></i>
        </div>
    
        <div className='mobile-menu-container'>
          <div className={'mobile-menu ' + (this.state.isOpen ? 'menu-expand' : '')}>
            <i className={'material-icons menu-text-home ' + isMenuTextShown}>
              <Link to="/">home</Link>
            </i>
            <i className={'material-icons menu-text-about ' + isMenuTextShown}>
              <Link to="/about">info</Link>
            </i>
            <i className={'material-icons menu-text-work ' + isMenuTextShown}>
              <Link to="/work">work</Link>
            </i>
            <i className={'material-icons menu-text-contact ' + isMenuTextShown}>
              <Link to="/contact">email</Link>
            </i>
          </div>
        </div>
        
      
      </header>
    );
  }
}



