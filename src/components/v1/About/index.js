import React, { Component } from 'react';

import Layout from 'components/v1/Layout/Layout';
import Title from 'components/v1/Layout/Title';

import './style.css';

class App extends Component {
  render() {
    return (
        <Layout>
          <div className="page-container">
            <div className="about-container">
              <Title title="About Me" />
              <div className="about-introduction">
                <p>After achieving a First Class Honours in Computer Science, with a year in Industry at <a href="http://www.paconsulting.com/" target="_blank" rel="noopener noreferrer"><span className="title-name">PA Consulting</span></a>, I am starting a graduate role as a Product Developer at <a href="https://and.digital/" target="_blank" rel="noopener noreferrer"><span className="title-name">AND Digital</span></a>. </p>

                <p>During my year I worked in Agile teams, developing Web apps in both Java and Javascript, versioned my work with Git and learnt a great deal of interpersonal skills along the way.</p>

                <p>In my spare time I volunteer at a local Church coffee shop, and enjoy playing Saxophone and Piano. And when I'm not doing any of the above, I'm working on my own <a href="https://github.com/OllyNural" target="github"><span className="title-name">side projects</span></a> (including this website), or playing atmospheric and envoloping video games.</p>
              </div>
            </div>
          </div>
        </Layout>
    );
  }
}

export default App;