import React, { Component } from 'react';

import Layout from 'components/v1/Layout/Layout'
import NotFoundPage from 'components/v1/NotFound';
import Title from 'components/v1/Layout/Title';

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
      project = require(`projects/ProjectData/${url}`);
      project = project[`${url}`];
    } catch (e) {
      project = undefined;
    }
    this.setState({project})
  }
  render() {
    if (this.state.project !== undefined) {
      return (
        <Layout>
          <div className="v1-page-container">
            <div className="v1-project-container">
              <Title title={this.state.project.title} />
              <div className="v1-project-information">
                <div className="v1-project-background">
                  <h3>Background</h3>
                  <Background sentences={this.state.project.background} />
                  <h3>How it works</h3>
                  <HowItWorks sentences={this.state.project.howItWorks} />
                </div>
                <div className="v1-project-links">
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