import React from 'react';

import './Background.css';

export default class Background extends React.Component {
  render() {
    let sentencesToRender = [];
    this.props.sentences.forEach(sentence => {
      sentencesToRender.push(<p dangerouslySetInnerHTML={{__html: sentence}} key={sentence}></p>)
    });
    return (
      <div className="background-info">
        {sentencesToRender}
      </div>
    )
  }
}