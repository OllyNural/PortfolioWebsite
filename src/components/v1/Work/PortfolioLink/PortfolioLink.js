import React from 'react'
import { Link } from 'react-router';

import './PortfolioLink.css'

export default class PortfolioLink extends React.Component {
    render() {
        return (
            <div className="portfolio-item">
                <span className="portfolio-item-title"> <Link to={"/v1/project/"+this.props.name}>{this.props.title}</Link></span>
                <span className="portfolio-item-secText"> {this.props.secText} </span>
            </div>
        )
    }
}