import React, { Component } from 'react';

import './style.css';

class App extends Component {
    render() {
        return (
            <div className="v2-page-container">
                <div className="v2-home-containers v2-home-left-container">
                    Hello left
                </div>
                <div className="v2-home-containers v2-home-right-container">
                    Hello right
                </div>
            </div>
        );
    }
}

export default App;