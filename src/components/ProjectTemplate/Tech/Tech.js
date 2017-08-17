import React from 'react';

import './Tech.css';

export default class Tech extends React.Component {
  render() {
    let allTech = [];
    this.props.tech.forEach(tech => {
      allTech.push(<li key={tech.techName}><a href={tech.techLink} target="-blank" rel="noopener noreferrer"><span className="title-name">{tech.techName}</span></a></li>);
    })
    return (
      <div className="tech-info">
        
        <ul>
          {allTech}
        </ul>
      </div>
    )
  }
}