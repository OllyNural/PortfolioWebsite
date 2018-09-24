import React, { Component } from 'react';

import Layout from 'components/v1/Layout/Layout';
import Title from 'components/v1/Layout/Title';
import { Data } from 'projects/ProjectData/Data';

import PortfolioLink from './PortfolioLink/PortfolioLink';

import './style.css';

class Work extends Component {
  getDataTest() {
    const useFakeData = false
    let dataToReturn
    if (useFakeData) {
      dataToReturn = [
        {id: 0, name: 'tictactoe', title: 'Coding an unbeatable TicTacToe opponent', secText: 'Oh, not another tictactoe demo...'},
        {id: 1, name: 'drone', title: 'Autonomous Drones, delievering blood to hospitals', secText: 'Saving lives one syntax error at a time'}
      ]
    } else {
      dataToReturn = Data
    }
    return dataToReturn
  }
  render() {
    const allPortfolioItems = [];
    this.getDataTest().forEach(element => {
      allPortfolioItems.push(<PortfolioLink
                              key={element.id} title={element.title}
                              name={element.name}
                              secText={element.secText}
      />)
    })
    return (
        <Layout>
          <div className="v1-page-container">
            <div className="v1-work-container">
              <Title title="Work Portfolio" />
              <div className="v1-portfolio-container">
                {allPortfolioItems}
              </div>
            </div>
          </div>
        </Layout>
    );
  }
}

export default Work;