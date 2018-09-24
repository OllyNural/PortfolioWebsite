import React from 'react';

import './HowItWorks.css';

export default class HowItWorks extends React.Component {
  render() {
    let sentencesToRender = [];
    this.props.sentences.forEach(sentence => {
      sentencesToRender.push(<p dangerouslySetInnerHTML={{__html: sentence}} key={sentence}></p>)
    });
    return (
      <div className="how-it-works">
        {sentencesToRender}
      </div>
    )
  }
}