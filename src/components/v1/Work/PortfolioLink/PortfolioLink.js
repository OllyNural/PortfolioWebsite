import React from 'react'
import { Link } from 'react-router';

import './PortfolioLink.css'

export default class PortfolioLink extends React.Component {
    render() {
        return (
            <div className="v1-portfolio-item">
                <span className="v1-portfolio-item-title"> <Link to={"/v1/project/"+this.props.name}>{this.props.title}</Link></span>
                <span className="v1-portfolio-item-secText"> {this.props.secText} </span>
            </div>
        )
    }
}