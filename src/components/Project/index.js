import React, { Component } from 'react';
import { Link } from 'react-router';

import Layout from '../Layout/Layout'
import { Data } from '../Data/Data';
import NotFoundPage from '../NotFound';

import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "test",
    }
  }
  componentDidMount() {
    const url = this.props.routeParams.project;
    let promise = new Promise(function(resolve, reject) {
      let response = Data.find(page => page.name === url);
      resolve(response);
    }).then(project => {
      this.setState({project}, () => {
        console.log("Project loaded: ");
        console.log(project.title);
      });
    });
  }
  render() {
    if (this.state.project !== undefined) {
      return (
        <Layout>
          <div className="page-container">
            <div className="project-container">
              <h1> {this.state.project.title}  </h1>
              <Link target="_blank" to={this.state.project.demo}>Demo</Link>
              <hr/>
            </div>
          </div>
        </Layout>
      )
    } else {
      return (
        <Layout> 
          <NotFoundPage />
        </Layout>
      )
    }
  }
}

export default App;