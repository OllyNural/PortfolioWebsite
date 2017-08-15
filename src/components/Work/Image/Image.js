import React from 'react';
import { Link } from 'react-router';

import './Image.css';

export default class Image extends React.Component {
  render() {
    return (
      <div className="portfolio-item">
        <div className="portfolio-item-container">
          <h4><Link to={"project/"+this.props.name}>{this.props.title}</Link></h4>
          <div className="portfolio-image-container">
            <Link to={"/project/"+this.props.name}><img className="portfolio-image" src="http://via.placeholder.com/250x250" alt="lolhi"/></Link>
          </div>
        </div>
      </div>
    )
  }
}