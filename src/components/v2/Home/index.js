import React, { Component } from 'react';

import './style.css';

class App extends Component {
    render() {
        return (
            <div className="v2-page-container">
                <div className="v2-home-containers v2-home-menu-container">
                    Hello left
                </div>
                <div className="v2-home-containers v2-home-body-container">
                    Hello right
                </div>
            </div>
        );
    }
}

export default App;