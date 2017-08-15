import React, { Component } from 'react';

import Layout from '../Layout/Layout'

import './style.css';

class App extends Component {
  render() {
    return (
        <Layout keyId="homekey">
          <div className="page-container">
            <p>After achieving a First Class Honours in Computer Science, with a year in Industry at PA Consulting, I am starting a graduate role as a Product Developer at AND Digital. </p>

            <p>During my year I worked in Agile teams, developing Web apps in both Java and Javascript, versioned my work with Git and learnt a great deal of interpersonal skills along the way.</p>

            <p>In my spare time I volunteer at a local Church coffee shop, and enjoy playing Saxophone and Piano. And when I'm not doing any of the above, i'm working on my own side projects (including this website), or playing atmospheric and envoloping video games.</p>
          </div>
        </Layout>
    );
  }
}

export default App;