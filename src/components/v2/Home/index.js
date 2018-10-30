import React, { Component } from 'react';
import { Link } from 'react-router';

import './style.css';

class App extends Component {
    render() {
        return (
            <div className='v2-page-container'>
                <div className='v2-home-center-container'>
                    <div className='v2-home-text'>
                        <span className='v2-home-title'>Oliver Nural</span>
                        <span className='v2-home-description'>Javascript Engineer based in London</span>
                    </div>
                    
                    <div className='v2-home-links-container'>
                        <div className="v2-portfolio-link-container v2-portfolio-link-first">
                            <a className='v2-portfolio-link' href='/about'>About</a>
                        </div>
                        <div className="v2-portfolio-link-container v2-portfolio-link-second">
                            <a className='v2-portfolio-link' href='/blog'>Blog</a>
                        </div>
                        <div className="v2-portfolio-link-container v2-portfolio-link-third">
                            {/* <a className='v2-portfolio-link' href='/projects'>Projects</a> */}

                            <Link className='v2-portfolio-link' to="/Projects">Projects</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;