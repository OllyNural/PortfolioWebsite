import React, { Component } from 'react';

import Layout from '../Layout/Layout'
import NotFoundPage from '../NotFound';
import Title from '../Layout/Title';
import Button from './Button/Button';
import Background from './Background/Background';
import HowItWorks from './HowItWorks/HowItWorks';

import './style.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: undefined,
    }
  }
  componentDidMount() {
    // Do a quick lookup to get our project page
    // If it's nothing then return 404 else return page
    const url = this.props.routeParams.project;
    let project;
    try {
      project = require(`../ProjectData/${url}`);
      project = project[`${url}`];
    } catch (e) {
      project = undefined;
    }
    this.setState({project})
  }
  render() {
    if (this.state.project !== undefined) {
      const projectName = this.state.project.name;
      const imageSrcToUse = require('../ProjectData/Images/' + this.state.project.src);
      return (
        <Layout>
          <div className="page-container">
            <div className="project-container">
              <Title title={this.state.project.title} />
              <div className="project-information">
                <div className="project-background">
                  <h3>Background</h3>
                  <Background sentences={this.state.project.background} />
                  <h3>How it works</h3>
                  <HowItWorks sentences={this.state.project.howItWorks} />
                </div>
                <div className="project-links">
        {/*<div className="project-image-container">
                    <img className="portfolio-image" src={imageSrcToUse} alt={this.state.project.name} />
                  </div> */}
                  <Button link={this.state.project.demo} text="Demo"/>
                  <Button link={this.state.project.code} text="Code"/>
                  <Button link={this.state.project.blog} text="Blog"/>
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