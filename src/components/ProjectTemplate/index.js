import React, { Component } from 'react';

import Layout from '../Layout/Layout'
import NotFoundPage from '../NotFound';
import Title from '../Layout/Title';
import Button from './Button/Button';
import Background from './Background/Background';
import Tech from './Tech/Tech';

import './style.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "test",
    }
  }
  componentDidMount() {
    const url = this.props.routeParams.project;
    let project = require(`../ProjectList/${url}`);
    project = project[`${url}`];
    this.setState({project})
  }
  render() {
    if (this.state.project !== undefined) {
      return (
        <Layout>
          <div className="page-container">
            <div className="project-container">
              <Title title={this.state.project.title} />
              <div className="project-information">
                <div className="project-background">
                  <h3>Background</h3>
                  <Background sentences={this.state.project.background} />
                </div>
                <div className="project-links">
                  <Button link={this.state.project.demo} text="Demo"/>
                  <Button link={this.state.project.code} text="Code"/>
                  <Button link={this.state.project.blog} text="Blog"/>
                </div>
                <div className="project-tech">
                  <h3>Tech used</h3>
                  <Tech tech={this.state.project.tech} />
                </div>
              </div>
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