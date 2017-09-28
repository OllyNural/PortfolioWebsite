import React from 'react';
import { Link } from 'react-router';

import './Image.css';

export default class Image extends React.Component {
  render() {
    
    // Generic require statement to dynamically require the right image
    const imageSrcToUse = require('../../ProjectData/Images/' + this.props.name + '.png');
    return (
      <div className="portfolio-item">
        <div className="portfolio-item-container">
          <h3><Link to={"project/"+this.props.name}>{this.props.title}</Link></h3>
          <div className="portfolio-image-container">
            <Link to={"/project/"+this.props.name}><img className="portfolio-image" src={imageSrcToUse} alt="lolhi"/></Link>
          </div>
        </div>
      </div>
    )
  }
}