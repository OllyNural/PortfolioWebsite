import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header';
import Footer from './Footer';

import './Layout.css';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    }
  }
  componentDidMount() {
    this.setState({ mounted: true });
  }
  render() {
    let child;
    if (this.state.mounted) {
      child = (<div key="key"> {this.props.children} </div>);
    }
    return (
      <div className="app-container">
        <Header />
        <ReactCSSTransitionGroup transitionName="page" transitionEnterTimeout={1000} transitionLeaveTimeout={100000}>
          {child}
        </ReactCSSTransitionGroup>
        <Footer />
      </div>
    );
  }
}
