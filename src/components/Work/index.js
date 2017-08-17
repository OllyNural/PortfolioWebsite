import React, { Component } from 'react';

import Layout from '../Layout/Layout';
import Title from '../Layout/Title';
import Image from './Image/Image';
import { Data } from '../ProjectList/Data';

import './style.css';

class Work extends Component {
  getData() {
    const useFakeData = false;
    if (useFakeData) {
      return [
        {id: 0, name: 'tictactoe', title: 'Coding an unbeatable TicTacToe opponent', demo: 'tictactoe/demo'},
        {id: 1, name: 'tictactoe', title: 'Broken link test', demo: 'tictactoe/demo'},
        {id: 2, name: 'tictactoe', title: 'Coding an unbeatable TicTacToe opponent', demo: 'tictactoe/demo'},
        {id: 3, name: 'tictactoe', title: 'Coding an unbeatable TicTacToe opponent', demo: 'tictactoe/demo'},
        {id: 4, name: 'tictactoe', title: 'Coding an unbeatable TicTacToe opponent', demo: 'tictactoe/demo'}
      ];
    } else {
      return Data;
    }
  }
  render() {
    const allPortfolioImages = [];
    this.getData().forEach(element => {
      allPortfolioImages.push(<Image 
                              key={element.id} title={element.title} 
                              name={element.name}
                              demo={element.demo} />);
    });
    return (
        <Layout>
          <div className="page-container">
            <div className="work-container">
              <Title title="Work Portfolio" />
              <div className="portfolio-container">
                  { allPortfolioImages }
              </div>
            </div>
          </div>
        </Layout>
    );
  }
}

export default Work;