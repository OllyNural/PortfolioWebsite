import React from 'react';

import './Button.css';

export default class Button extends React.Component {
  render() {
    let checkLinkDisabled = this.props.link ? '' : 'v1-disabled'
    return (
      <a href={this.props.link} target="_blank" className="v1-project-link-container">
        <div className={'v1-project-link ' + checkLinkDisabled}>
          {this.props.text}
        </div>
      </a>
    )
  }
}