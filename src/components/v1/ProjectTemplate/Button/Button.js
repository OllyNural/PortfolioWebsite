import React from 'react';

import './Button.css';

export default class Button extends React.Component {
  render() {
    let checkLinkDisabled = this.props.link ? '' : 'disabled'
    return (
      <a href={this.props.link} target="_blank" className="project-link-container">
        <div className={'project-link ' + checkLinkDisabled}>
          {this.props.text}
        </div>
      </a>
    )
  }
}